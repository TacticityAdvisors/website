/* ============================================================
   Tacticity Advisors — Newsletter Data
   ============================================================
   HOW TO ADD A NEW ARTICLE:
   Add one new object to the top of the "newsletterArticles" array
   below. That's it — both newsletter.html (the listing) and
   newsletter-article.html (the full article view) read from this
   same array automatically. No other file needs to change.

   FIELDS:
   - id:      a unique, URL-safe slug (lowercase, hyphens only)
   - title:   the article title
   - image:   path to a representative image (place image files in
              the assets/newsletter/ folder), or a full image URL
   - date:    "YYYY-MM-DD" — used for display and sort order
   - summary: 1–3 sentence summary shown on the listing page
   - content: the full article body, written as HTML paragraphs
              e.g. "<p>First paragraph...</p><p>Second...</p>"
   ============================================================ */

const newsletterArticles = [

  {
    id: "sample-article",
    title: "This Is a Sample Article — Replace or Delete Me",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    date: "2026-09-11",
    summary: "This is a placeholder entry showing how a newsletter article card and its full article page will look and behave. Paste a real article's title, image, summary, and content here to replace it.",
    content: `
      <p>This is placeholder body content for the sample newsletter article. It demonstrates how a full article page renders once a real article is pasted into the <code>newsletterArticles</code> array in <code>newsletter-data.js</code>.</p>
      <p>Each paragraph in a real article should be wrapped in its own <code>&lt;p&gt;</code> tag, exactly like this one. Headings, bold text, and links can be included using standard HTML as needed.</p>
      <p>Once a real article replaces this sample, delete this entire object from the array, or simply add new articles above it and remove it whenever convenient.</p>
    `
  }

];
