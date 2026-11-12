#!/usr/bin/env python3
"""
Static newsletter article generator.

Reads ../newsletter-data.js and writes one fully server-rendered HTML page per
article to ../newsletter/<id>.html (content, title, canonical, Open Graph and
Article/Breadcrumb JSON-LD are all in the HTML, so crawlers do not need JS).

Run after adding or editing an article in newsletter-data.js:

    python tools/build-articles.py

Optional per-article fields in newsletter-data.js (fall back to title/summary):
    seoTitle:        <title> tag text (without the site suffix)
    metaDescription: meta description, ~150-160 characters
    modified:        "YYYY-MM-DD" last-updated date (defaults to date)
"""
import html
import json
import re
import struct
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = "https://tacticityadvisors.com/"
SITE = "Tacticity Advisors"
OUT_DIR = ROOT / "newsletter"


def parse_articles(js: str):
    """Pull article objects out of the newsletterArticles array."""
    start = js.index("const newsletterArticles")
    body = js[start:]
    chunks = re.split(r"\n  \{\n(?=\s+id:)", body)[1:]
    articles = []
    for chunk in chunks:
        m = re.search(r"\n\s*content:\s*`", chunk)
        head, rest = chunk[: m.start()], chunk[m.end():]
        end = rest.rindex("`")
        content = rest[:end]
        art = {"content": content.strip()}
        for key in ("id", "title", "image", "imagePosition", "date", "summary",
                    "seoTitle", "metaDescription", "modified"):
            fm = re.search(r'\b%s:\s*"((?:[^"\\]|\\.)*)"' % key, head)
            if fm:
                art[key] = json.loads('"%s"' % fm.group(1))
        articles.append(art)
    return articles


def jpeg_size(path: Path):
    """Return (width, height) of a JPEG without third-party libs, else None."""
    try:
        data = path.read_bytes()
        i = 2
        while i < len(data):
            if data[i] != 0xFF:
                i += 1
                continue
            marker = data[i + 1]
            if 0xC0 <= marker <= 0xCF and marker not in (0xC4, 0xC8, 0xCC):
                h, w = struct.unpack(">HH", data[i + 5:i + 9])
                return w, h
            i += 2 + struct.unpack(">H", data[i + 2:i + 4])[0]
    except Exception:
        pass
    return None


def trim(text: str, limit: int = 158) -> str:
    text = " ".join(text.split())
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0].rstrip(",;:-")
    return cut + "\u2026"


def display_date(iso: str) -> str:
    d = datetime.strptime(iso, "%Y-%m-%d")
    return f"{d.strftime('%B')} {d.day}, {d.year}"


def prefix_relative(markup: str) -> str:
    """Pages live in /newsletter/, so site-relative href/src need '../'."""
    def fix(m):
        attr, val = m.group(1), m.group(2)
        if re.match(r"(https?:|//|#|mailto:|tel:|/|data:|\{\{)", val):
            return m.group(0)
        return f'{attr}="../{val}"'
    return re.sub(r'\b(href|src)="([^"]*)"', fix, markup)


def build():
    js = (ROOT / "newsletter-data.js").read_text(encoding="utf-8")
    articles = parse_articles(js)
    if not articles:
        sys.exit("No articles parsed from newsletter-data.js")

    template = (ROOT / "tools" / "article-template.html").read_text(encoding="utf-8")
    template = prefix_relative(template)
    OUT_DIR.mkdir(exist_ok=True)

    wanted = set()
    for a in articles:
        slug = a["id"]
        wanted.add(f"{slug}.html")
        url = f"{ORIGIN}newsletter/{slug}.html"
        title = f"{a.get('seoTitle', a['title'])} | {SITE}"
        desc = a.get("metaDescription") or trim(a.get("summary", ""))
        modified = a.get("modified", a["date"])

        image = a.get("image", "")
        if image and not re.match(r"https?:", image):
            image_url = ORIGIN + image
            img_path = ROOT / image
            size = jpeg_size(img_path) if img_path.suffix.lower() in (".jpg", ".jpeg") else None
            local_src = "../" + image
        else:
            image_url = image or ORIGIN + "assets/images/og-image.jpg"
            size, local_src = None, image_url
        dims = f' width="{size[0]}" height="{size[1]}"' if size else ""
        pos = f' object-position:{a["imagePosition"]};' if a.get("imagePosition") else ""
        image_block = (
            f'    <img id="article-image" class="article-header-image" src="{html.escape(local_src)}" '
            f'alt="{html.escape(a["title"])}"{dims} fetchpriority="high" style="object-fit:cover;{pos}">'
            if image else ""
        )

        body = a["content"]
        # old JS-rendered links -> new static URLs (same folder)
        body = re.sub(r'newsletter-article\.html\?id=([a-z0-9-]+)', r"\1.html", body)

        jsonld = [
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "@id": url + "#article",
                "headline": a["title"],
                "description": desc,
                "image": image_url,
                "datePublished": a["date"],
                "dateModified": modified,
                "inLanguage": "en",
                "mainEntityOfPage": {"@type": "WebPage", "@id": url},
                "author": {"@type": "Person", "name": "Tanmay Jain, PhD",
                           "url": ORIGIN + "team.html"},
                "publisher": {"@type": "Organization", "name": SITE,
                              "logo": {"@type": "ImageObject", "url": ORIGIN + "assets/logo.svg"}},
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN},
                    {"@type": "ListItem", "position": 2, "name": "Newsletter", "item": ORIGIN + "newsletter.html"},
                    {"@type": "ListItem", "position": 3, "name": a["title"], "item": url},
                ],
            },
        ]
        ld = json.dumps(jsonld, indent=2, ensure_ascii=False).replace("</", "<\\/")

        out = template
        subs = {
            "{{TITLE}}": html.escape(title),
            "{{DESC}}": html.escape(desc),
            "{{URL}}": url,
            "{{IMAGE_URL}}": image_url,
            "{{H1}}": html.escape(a["title"]),
            "{{DATE_ISO}}": a["date"],
            "{{DATE_DISPLAY}}": display_date(a["date"]),
            "{{JSONLD}}": ld,
            "{{IMAGE_BLOCK}}": image_block,
            "{{BODY}}": body,
        }
        for k, v in subs.items():
            out = out.replace(k, v)
        (OUT_DIR / f"{slug}.html").write_text(out, encoding="utf-8", newline="\n")
        print(f"  wrote newsletter/{slug}.html")

    # static, crawlable article links on the listing page (same markup newsletter.js renders)
    listing = ROOT / "newsletter.html"
    page = listing.read_text(encoding="utf-8")
    cards = "\n".join(
        f'    <a href="newsletter/{a["id"]}.html" class="newsletter-card">\n'
        f'      <div class="newsletter-card-body">\n'
        f'        <p class="newsletter-card-date">{display_date(a["date"])}</p>\n'
        f'        <h3 class="newsletter-card-title">{html.escape(a["title"])}</h3>\n'
        f'      </div>\n'
        f'    </a>'
        for a in sorted(articles, key=lambda x: x["date"], reverse=True)
    )
    new_page, n = re.subn(
        r"(<!-- ARTICLES:START[^>]*-->\n).*?(<!-- ARTICLES:END -->)",
        lambda m: m.group(1) + cards + "\n" + m.group(2),
        page, flags=re.S)
    if n:
        listing.write_text(new_page, encoding="utf-8", newline="\n")
        print("  refreshed article links in newsletter.html")

    # remove pages for articles that no longer exist in the data file
    for f in OUT_DIR.glob("*.html"):
        if f.name not in wanted:
            f.unlink()
            print(f"  removed stale newsletter/{f.name}")
    print(f"Built {len(articles)} article page(s).")


if __name__ == "__main__":
    build()
