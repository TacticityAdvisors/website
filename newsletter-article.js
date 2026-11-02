/* ============================================================
   Tacticity Advisors — Newsletter Article Renderer
   Reads ?id=<slug> from the URL, finds the matching article in
   newsletterArticles (from newsletter-data.js), and renders it.
   Nothing here needs to change when a new article is added.
   ============================================================ */

(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const titleEl = document.getElementById('article-title');
  const dateEl = document.getElementById('article-date');
  const imageEl = document.getElementById('article-image');
  const bodyEl = document.getElementById('article-body');
  const pageTitleEl = document.getElementById('page-title');
  const labelEl = document.getElementById('article-label');

  const formatDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const article = (typeof newsletterArticles !== 'undefined')
    ? newsletterArticles.find(a => a.id === id)
    : null;

  if (!article) {
    labelEl.textContent = 'Newsletter';
    titleEl.textContent = 'Article Not Found';
    dateEl.textContent = '';
    bodyEl.innerHTML = '<p class="article-not-found">This article could not be found. It may have been moved or removed. <a href="newsletter.html">Return to the newsletter</a>.</p>';
    return;
  }

  document.title = article.title + ' - Tacticity Advisors';
  if (pageTitleEl) pageTitleEl.textContent = article.title + ' - Tacticity Advisors';
  labelEl.textContent = 'Newsletter';
  titleEl.textContent = article.title;
  dateEl.textContent = formatDate(article.date);

  if (article.image) {
    imageEl.src = article.image;
    imageEl.alt = article.title;
    imageEl.style.objectFit = article.imageFit || 'cover';
    imageEl.style.display = 'block';
  }

  bodyEl.innerHTML = article.content;

  // SEO: per-article head tags (canonical, social cards, Article schema)
  const origin = 'https://tacticityadvisors.com/';
  const pageUrl = origin + 'newsletter-article.html?id=' + encodeURIComponent(article.id);
  const fullTitle = article.title + ' - Tacticity Advisors';
  const imageUrl = article.image
    ? (/^https?:/.test(article.image) ? article.image : origin + article.image)
    : origin + 'assets/images/og-image.jpg';
  const setMeta = (sel, attr, value) => {
    let el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement(sel.startsWith('link') ? 'link' : 'meta');
      const m = sel.match(/\[(\w+)="([^"]+)"\]/);
      if (m) el.setAttribute(m[1], m[2]);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  setMeta('link[rel="canonical"]', 'href', pageUrl);
  if (article.summary) setMeta('meta[name="description"]', 'content', article.summary);
  setMeta('meta[property="og:type"]', 'content', 'article');
  setMeta('meta[property="og:url"]', 'content', pageUrl);
  setMeta('meta[property="og:title"]', 'content', fullTitle);
  setMeta('meta[property="og:image"]', 'content', imageUrl);
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', fullTitle);
  setMeta('meta[name="twitter:image"]', 'content', imageUrl);
  if (article.summary) {
    setMeta('meta[property="og:description"]', 'content', article.summary);
    setMeta('meta[name="twitter:description"]', 'content', article.summary);
  }

  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary || '',
    image: imageUrl,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: pageUrl,
    author: { '@type': 'Person', name: 'Tanmay Jain, PhD' },
    publisher: {
      '@type': 'Organization',
      name: 'Tacticity Advisors',
      logo: { '@type': 'ImageObject', url: origin + 'assets/logo.svg' }
    }
  });
  document.head.appendChild(ld);
})();
