/* ============================================================
   CAREERS — renders openings from careers-data.js, opens the
   application dialog, validates it and posts it to Formspree.
   ============================================================ */
(function () {
  var MAX_RESUME_MB = 5;
  var ALLOWED_EXT = /\.(pdf|docx?)$/i;

  var openings = (window.CAREERS_OPENINGS || []).filter(function (j) { return j && j.open !== false; });
  var endpoint = window.CAREERS_FORM_ENDPOINT || '';

  var list = document.getElementById('crList');
  var empty = document.getElementById('crEmpty');
  var count = document.getElementById('crCount');
  var dialog = document.getElementById('crDialog');
  var form = document.getElementById('careerForm');
  if (!list || !dialog || !form) return;

  var titleEl = document.getElementById('crDialogTitle');
  var positionInput = document.getElementById('crPosition');
  var subjectInput = document.getElementById('crSubject');
  var errorBox = document.getElementById('crError');
  var successBox = document.getElementById('crSuccess');
  var submitBtn = form.querySelector('.form-submit');
  var fileInput = document.getElementById('crResume');
  var fileName = document.getElementById('crFileName');
  var lastTrigger = null;

  /* ---------- helpers ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  var chevron = '<svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function applyButton(job) {
    var b = el('button', 'btn btn-primary form-submit cr-apply', 'Apply');
    b.type = 'button';
    b.setAttribute('aria-label', 'Apply for ' + job.title);
    b.addEventListener('click', function () { openForm(job, b); });
    return b;
  }

  /* ---------- render openings ---------- */
  if (!openings.length) {
    empty.hidden = false;
    count.textContent = '';
  } else {
    count.textContent = openings.length + (openings.length === 1 ? ' open role' : ' open roles');
  }

  openings.forEach(function (job) {
    var li = el('li', 'cr-job');
    li.id = job.id;

    var top = el('div', 'cr-job-top');
    var info = el('div', 'cr-job-info');
    info.appendChild(el('h3', 'cr-job-title', job.title));

    var meta = el('ul', 'cr-meta');
    meta.setAttribute('role', 'list');
    [job.team, job.type, job.location, job.experience, job.stipend && ('Stipend ' + job.stipend), job.posted && ('Posted ' + formatDate(job.posted))]
      .filter(Boolean).forEach(function (m) { meta.appendChild(el('li', null, m)); });
    info.appendChild(meta);
    if (job.summary) info.appendChild(el('p', 'cr-summary', job.summary));

    var actions = el('div', 'cr-actions');
    actions.appendChild(applyButton(job));
    var toggle = el('button', 'cr-toggle');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', job.id + '-desc');
    toggle.innerHTML = '<span>View description</span>' + chevron;
    actions.appendChild(toggle);

    top.appendChild(info);
    top.appendChild(actions);
    li.appendChild(top);

    var desc = el('div', 'cr-desc');
    desc.id = job.id + '-desc';
    desc.hidden = true;
    (job.sections || []).forEach(function (s) {
      if (s.heading) desc.appendChild(el('h4', null, s.heading));
      if (s.text) desc.appendChild(el('p', null, s.text));
      if (s.points && s.points.length) {
        var ul = el('ul');
        s.points.forEach(function (p) { ul.appendChild(el('li', null, p)); });
        desc.appendChild(ul);
      }
    });
    desc.appendChild(applyButton(job));
    li.appendChild(desc);

    toggle.addEventListener('click', function () {
      var open = desc.hidden;
      desc.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.firstChild.textContent = open ? 'Hide description' : 'View description';
    });

    list.appendChild(li);
  });

  /* Structured data so roles can appear in Google's job search */
  if (openings.length) {
    var ld = openings.map(function (job) {
      var body = (job.sections || []).map(function (s) {
        return (s.heading ? '<p><strong>' + s.heading + '</strong></p>' : '') +
          (s.text ? '<p>' + s.text + '</p>' : '') +
          (s.points ? '<ul>' + s.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' : '');
      }).join('');
      return {
        '@context': 'https://schema.org', '@type': 'JobPosting',
        title: job.title, description: body || job.summary || job.title,
        datePosted: job.posted,
        employmentType: /intern/i.test(job.type || '') ? 'INTERN' : /part/i.test(job.type || '') ? 'PART_TIME' : 'FULL_TIME',
        hiringOrganization: { '@type': 'Organization', name: 'Tacticity Advisors', sameAs: 'https://tacticityadvisors.com', logo: 'https://tacticityadvisors.com/assets/logo.svg' },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', streetAddress: 'Office 308, V18 Building, Balewadi High St, Baner', addressLocality: 'Pune', addressRegion: 'Maharashtra', postalCode: '411045', addressCountry: 'IN' } },
        url: 'https://tacticityadvisors.com/careers.html#' + job.id
      };
    });
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(ld.length === 1 ? ld[0] : ld);
    document.head.appendChild(s);
  }

  /* ---------- dialog ---------- */
  function resetForm() {
    form.reset();
    form.hidden = false;
    successBox.hidden = true;
    errorBox.hidden = true;
    fileName.textContent = 'No file chosen';
    form.querySelectorAll('.has-error').forEach(function (f) { f.classList.remove('has-error'); });
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit application';
  }

  // If the candidate comes back with the browser's Back button, re-enable the form
  window.addEventListener('pageshow', function () {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit application';
  });

  function openForm(job, trigger) {
    lastTrigger = trigger || null;
    resetForm();
    var label = document.getElementById('crDialogLabel');
    var intro = dialog.querySelector('.cr-dialog-intro');
    if (label) label.textContent = 'Apply for';
    if (intro) intro.hidden = false;
    titleEl.textContent = job.title;
    positionInput.value = job.title;
    subjectInput.value = 'Application – ' + job.title;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.classList.add('cr-locked');
    setTimeout(function () { document.getElementById('crName').focus(); }, 30);
  }

  function closeForm() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }
  dialog.addEventListener('close', function () {
    document.body.classList.remove('cr-locked');
    if (lastTrigger) lastTrigger.focus();
  });
  document.getElementById('crClose').addEventListener('click', closeForm);
  // click on the dimmed backdrop closes the dialog
  dialog.addEventListener('click', function (e) { if (e.target === dialog) closeForm(); });

  fileInput.addEventListener('change', function () {
    var f = fileInput.files && fileInput.files[0];
    fileName.textContent = f ? f.name : 'No file chosen';
    fileInput.closest('.form-field').classList.remove('has-error');
  });
  form.addEventListener('input', function (e) {
    var field = e.target.closest('.form-field');
    if (field) field.classList.remove('has-error');
  });

  /* ---------- validation ---------- */
  function validate() {
    var problems = [];
    var firstBad = null;
    function bad(input, msg) {
      input.closest('.form-field').classList.add('has-error');
      problems.push(msg);
      if (!firstBad) firstBad = input;
    }
    form.querySelectorAll('.has-error').forEach(function (f) { f.classList.remove('has-error'); });

    [['crName', 'your full name'], ['crResidence', 'your place of residence'], ['crEmail', 'your email address'],
     ['crPhone', 'your phone number'], ['crCollege', 'your college'], ['crCgpa', 'your CGPA']]
      .forEach(function (pair) {
        var input = document.getElementById(pair[0]);
        if (!input.value.trim()) bad(input, 'Please enter ' + pair[1] + '.');
      });

    var email = document.getElementById('crEmail');
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) bad(email, 'Please enter a valid email address.');

    var cgpa = document.getElementById('crCgpa');
    if (cgpa.value.trim() && !/\d/.test(cgpa.value)) bad(cgpa, 'Please enter your CGPA as a number, e.g. 8.4.');

    var f = fileInput.files && fileInput.files[0];
    if (!f) bad(fileInput, 'Please attach your resume.');
    else if (!ALLOWED_EXT.test(f.name)) bad(fileInput, 'Your resume must be a PDF or Word file.');
    else if (f.size > MAX_RESUME_MB * 1024 * 1024) bad(fileInput, 'Your resume must be ' + MAX_RESUME_MB + ' MB or smaller.');

    if (problems.length) {
      errorBox.textContent = problems.join(' ');
      errorBox.hidden = false;
      firstBad.focus();
      return false;
    }
    return true;
  }

  /* ---------- submit ---------- */
  function showError(msg) {
    errorBox.textContent = msg + ' If it keeps happening, email your resume to contact@tacticityadvisors.com.';
    errorBox.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit application';
  }

  /* FormSubmit only accepts file attachments through a normal form post
     (not a background fetch), so once the form is valid we let the
     browser submit it. FormSubmit emails the application, resume
     attached, to the careers inbox, then sends the
     candidate back here to careers.html?applied=1. */
  form.addEventListener('submit', function (e) {
    errorBox.hidden = true;
    if (!validate()) { e.preventDefault(); return; }

    if (endpoint) form.action = endpoint;
    if (/^https?:$/.test(location.protocol)) {
      document.getElementById('crNext').value = location.origin + location.pathname + '?applied=1';
    }
    if (typeof gtag === 'function') gtag('event', 'job_application', { position: positionInput.value });

    // stop double clicks, without disabling the button before the browser submits
    setTimeout(function () {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }, 0);
  });

  // Back from FormSubmit after a successful application
  if (new URLSearchParams(location.search).get('applied') === '1') {
    var doneLabel = document.getElementById('crDialogLabel');
    var doneIntro = dialog.querySelector('.cr-dialog-intro');
    if (doneLabel) doneLabel.textContent = 'Thank you';
    if (doneIntro) doneIntro.hidden = true;
    titleEl.textContent = 'Application sent';
    form.hidden = true;
    successBox.hidden = false;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.classList.add('cr-locked');
    // tidy the address bar so a refresh doesn't show this again
    if (history.replaceState) history.replaceState(null, '', location.pathname);
  }

  /* ---------- deep links ----------
     careers.html#<id>          scrolls to the role and opens its description
     careers.html?apply=<id>    opens the application form for that role   */
  var params = new URLSearchParams(location.search);
  var applyId = params.get('apply');
  var hashId = location.hash.slice(1);
  var target = openings.filter(function (j) { return j.id === (applyId || hashId); })[0];
  if (target) {
    var item = document.getElementById(target.id);
    var t = item && item.querySelector('.cr-toggle');
    if (t && t.getAttribute('aria-expanded') === 'false') t.click();
    if (applyId) openForm(target, item && item.querySelector('.cr-apply'));
    else if (item) setTimeout(function () { item.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
  }
})();
