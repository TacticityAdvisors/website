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
    imageEl.style.display = 'block';
  }

  bodyEl.innerHTML = article.content;
})();
