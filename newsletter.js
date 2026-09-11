/* ============================================================
   Tacticity Advisors — Newsletter Listing Renderer
   Reads the newsletterArticles array (from newsletter-data.js)
   and builds one card per article. Nothing here needs to change
   when a new article is added — only newsletter-data.js does.
   ============================================================ */

(function () {
  const grid = document.getElementById('newsletter-grid');
  if (!grid || typeof newsletterArticles === 'undefined') return;

  if (!newsletterArticles.length) {
    grid.innerHTML = '<p class="newsletter-empty">New articles are on the way — check back soon.</p>';
    return;
  }

  const sorted = [...newsletterArticles].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  grid.innerHTML = sorted.map(article => `
    <article class="newsletter-card">
      <img class="newsletter-card-image" src="${article.image}" alt="${article.title}" loading="lazy">
      <div class="newsletter-card-body">
        <p class="newsletter-card-date">${formatDate(article.date)}</p>
        <h3 class="newsletter-card-title">${article.title}</h3>
        <p class="newsletter-card-summary">${article.summary}</p>
        <a href="newsletter-article.html?id=${encodeURIComponent(article.id)}" class="btn btn-primary newsletter-card-btn">Read Full Article</a>
      </div>
    </article>
  `).join('');
})();
