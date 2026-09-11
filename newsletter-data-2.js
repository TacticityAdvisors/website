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
   - content: the full article body, written as HTML
   ============================================================ */

const newsletterArticles = [

  {
    id: "fda-small-business-determination-guide",
    title: "FDA Small Business Determination (SBD): A Practical Guide for First-Time 510(k) Applicants",
    image: "assets/newsletter/fda-small-business-determination-guide.jpg",
    date: "2026-09-11",
    summary: "FDA's Small Business Determination program can cut 510(k) user fees by roughly 75%, but qualifying isn't automatic. This guide walks India-based first-time applicants through Form FDA 3602N, the National Taxing Authority certification requirement, realistic timelines, and a practical pre-submission checklist.",
    content: `
<div class="article-callout">
  <span class="article-callout-label">Key Distinction</span>
  <p>SBD is a company-level financial/user-fee determination. It does not determine device classification, 510(k) eligibility, substantial equivalence, or FDA clearance.</p>
</div>

<h2><span class="num">01</span> What is Small Business Determination?</h2>
<p>FDA's Small Business Determination (SBD) Program gives qualifying medical-device companies access to substantially reduced user fees for applicable FDA submissions.</p>
<p>For <strong>FY2027</strong>, an eligible small business would pay <strong>$7,163</strong> instead of <strong>$28,653</strong> for a 510(k), a potential saving of <strong>$21,490</strong>, or approximately <strong>75%</strong>. For a De Novo request, the fee would be $47,755 instead of $191,020.</p>
<p>For startups and growing medtech companies, these savings can make a meaningful difference to the cost of entering the U.S. market. However, the reduced fee is not automatic. Companies must establish their small-business qualification by submitting Form <strong>FDA 3602N</strong> (Small Business Determination Request), which captures the company's financial information, applicable affiliates, and, for eligible foreign businesses, <strong>National Taxing Authority (NTA) certification</strong>. For an India-based medical-device company, understanding Form FDA 3602N early is particularly important because obtaining the required tax-authority certification may add time to the overall process.</p>

<h3>Timing Matters</h3>
<p>SBD should be treated as an early regulatory-planning activity, not something to address immediately before submitting the 510(k) or De Novo request.</p>
<p>FDA recommends submitting evidence of small-business qualification at <strong>least 60 days</strong> before the applicable user fee is due. As a practical planning approach, an India-based company should consider starting the process approximately <strong>3 months</strong> before the planned submission.</p>

<h2><span class="num">02</span> Which SBD Benefit May Apply?</h2>
<p>Eligibility depends on the specific benefit requested. Do not treat the financial thresholds as interchangeable.</p>
<div class="article-table-wrap">
<table>
  <tr><th>Financial Threshold</th><th>Eligibility &amp; Benefit</th><th>Example &amp; Requirements</th></tr>
  <tr>
    <td>&le; $100 million</td>
    <td>Gross receipts/sales &le; $100M, including applicable affiliates. Eligible U.S. and foreign businesses may qualify for reduced FDA medical-device user fees.</td>
    <td>A company with $75M in gross receipts may qualify for the small-business 510(k) fee: $7,163 vs. $28,653 for FY2027. SBD reduces fees, not FDA's regulatory requirements.</td>
  </tr>
  <tr>
    <td>&le; $30 million</td>
    <td>Gross receipts/sales &le; $30M, including applicable affiliates. May qualify for a one-time fee waiver for the first eligible PMA, BLA, PDP, or PMR.</td>
    <td>A company with $20M in gross receipts may qualify for reduced fees and a one-time waiver. The waiver does not apply to 510(k).</td>
  </tr>
  <tr>
    <td>&le; $1 million</td>
    <td>Gross receipts/sales &le; $1M, including applicable affiliates. May qualify for an annual establishment registration fee waiver.</td>
    <td>A startup with $800K in gross receipts may qualify, subject to financial-hardship requirements.</td>
  </tr>
</table>
</div>

<div class="article-callout">
  <span class="article-callout-label">Key Note</span>
  <p>The two fees occur at different points in the FDA pathway. The user fee is tied to the premarket submission, while the establishment registration fee is an annual fee associated with registering the facility. Meeting the criteria for one does not automatically qualify a company for the other.</p>
</div>

<h2><span class="num">03</span> What Does Form FDA 3602N Require?</h2>
<p>For an India-based company, the form is easiest to understand in three parts.</p>

<h3>Section I &mdash; Business Information</h3>
<ul>
  <li>Legal business name</li>
  <li>Business address</li>
  <li>Taxpayer identification information</li>
  <li>Entity/business information</li>
  <li>Required certification and signature</li>
</ul>

<h3>Section II &mdash; Financial Information</h3>
<ul>
  <li>Gross receipts or sales for the most recent tax year</li>
  <li>Applicable affiliates</li>
  <li>Required taxpayer information</li>
  <li>Financial information converted to U.S. dollars where required</li>
</ul>

<h3>Section III &mdash; National Taxing Authority Certification</h3>
<ul>
  <li>Foreign business completes Lines 1&ndash;6</li>
  <li>National Taxing Authority completes Lines 7&ndash;12</li>
  <li>Financial and tax information is certified</li>
  <li>A separate certified Section III is required for each applicable foreign affiliate</li>
</ul>

<div class="article-callout">
  <span class="article-callout-label">Key Point &mdash; SBD Is Not the Only Route to a User-Fee Exemption</span>
  <p>Devices intended solely for <a href="https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/medical-device-user-fees" target="_blank" rel="noopener">pediatric use</a> may qualify for applicable FDA user-fee exemptions, independent of the SBD financial thresholds.</p>
</div>

<h2><span class="num">04</span> India Reality Check: How Do You Actually Get Section III Certified?</h2>
<p>FDA requires NTA certification for a foreign business, but the FDA form does not prescribe a specific Indian officer or office. That is why the India-side coordination can feel less straightforward than the FDA portion.</p>

<h3>What should an Indian startup actually do?</h3>
<div class="article-table-wrap">
<table>
  <tr><th>Action</th><th>What to Do</th></tr>
  <tr><td>1. Start with your CA/tax professional</td><td>If your company already has one handling income-tax filings, start there.</td></tr>
  <tr><td>2. Explain the requirement</td><td>You need NTA certification of Form FDA 3602N Section III for an FDA SBD request.</td></tr>
  <tr><td>3. Identify the process</td><td>Ask for help identifying the appropriate Indian tax-authority contact/process for your records and jurisdiction.</td></tr>
  <tr><td>4. Prepare documentation</td><td>Have the relevant tax and financial information ready.</td></tr>
  <tr><td>5. Complete Lines 1&ndash;6</td><td>The foreign business completes its portion of Section III.</td></tr>
  <tr><td>6. Obtain certification</td><td>The NTA completes and certifies Lines 7&ndash;12.</td></tr>
  <tr><td>7. Submit to FDA</td><td>Submit the completed SBD request through the CDRH Portal.</td></tr>
</table>
</div>

<div class="article-callout">
  <span class="article-callout-label">Planning Estimate &mdash; Not an FDA Deadline</span>
  <p>For practical planning, allow approximately 3&ndash;4 weeks for India-side tax-authority coordination and certification. Actual timing can vary with the authority, documentation, and responsiveness. FDA does not prescribe a 3&ndash;4 week Indian certification timeline.</p>
</div>

<div class="article-callout">
  <span class="article-callout-label">Do I Need a CA?</span>
  <p>No. FDA does not require you to hire a CA. However, your existing CA/tax professional can be useful because they already understand your tax records and may help identify and coordinate the appropriate tax-authority process.</p>
</div>

<h2><span class="num">05</span> What Costs Should You Expect?</h2>
<div class="article-table-wrap">
<table>
  <tr><th>Area</th><th>Details</th></tr>
  <tr><td>FDA</td><td>No fee to submit an SBD request</td></tr>
  <tr><td>CA / tax professional</td><td>Professional fees, if used</td></tr>
  <tr><td>Translation</td><td>Where applicable</td></tr>
  <tr><td>Documentation / administration</td><td>Costs associated with obtaining supporting documentation</td></tr>
</table>
</div>

<div class="article-callout">
  <span class="article-callout-label">Keep the Distinction Clear</span>
  <p>Professional and administrative costs may apply, but unofficial payments or inducements are not an FDA requirement or a required SBD cost. Government fees and professional fees should be handled through legitimate, documented channels.</p>
</div>

<h2><span class="num">06</span> Who Is Responsible for What?</h2>
<div class="article-table-wrap">
<table>
  <tr><th>Responsibility</th><th>Typical Owner</th></tr>
  <tr><td>SBD eligibility assessment</td><td>Company / regulatory team</td></tr>
  <tr><td>Financial information</td><td>Finance / CA</td></tr>
  <tr><td>Affiliate information</td><td>Company / Finance</td></tr>
  <tr><td>NTA coordination</td><td>CA / tax professional, where used</td></tr>
  <tr><td>Section III certification</td><td>National Taxing Authority</td></tr>
  <tr><td>SBD submission</td><td>Company / authorized representative</td></tr>
  <tr><td>SBD determination</td><td>FDA</td></tr>
</table>
</div>

<h2><span class="num">07</span> When Should You Start?</h2>
<p>If an Indian MedTech company plans to claim the reduced small-business fee for its 510(k), it should start the Small Business Determination (SBD) process well in advance, aligning the Small Business Request (SBR) submission period and SBD effective period with the intended FDA submission.</p>
<p>Run the SBD workstream in parallel with regulatory strategy, predicate selection, testing, and evidence planning.</p>

<h2><span class="num">08</span> Founder FAQ</h2>

<div class="article-faq-item">
  <p class="article-faq-q">Is SBD the same as 510(k) eligibility?</p>
  <p class="article-faq-a">No. Small Business Determination (SBD) is a company-level financial/user-fee determination, while 510(k) eligibility and substantial equivalence are device-level regulatory questions.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Can a foreign or Indian medical-device company apply for SBD?</p>
  <p class="article-faq-a">Yes. Foreign businesses can apply if they meet FDA's applicable requirements, including National Taxing Authority (NTA) certification where required.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">What is Form FDA 3602N used for?</p>
  <p class="article-faq-a">Form FDA 3602N is the form used to request an FDA Small Business Determination for medical-device user-fee purposes.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">What financial information does the FDA require?</p>
  <p class="article-faq-a">The company must provide gross receipts or sales for the most recent tax year, along with information on applicable affiliates as required for the eligibility calculation.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Do affiliates count toward SBD eligibility?</p>
  <p class="article-faq-a">Yes. Applicable affiliates must be included when determining the company's gross receipts or sales for SBD eligibility.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Who completes and certifies Section III of Form FDA 3602N?</p>
  <p class="article-faq-a">The foreign business completes its portion, while the National Taxing Authority completes and certifies the applicable authority section.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Where do I submit the Small Business Request?</p>
  <p class="article-faq-a">The Small Business Request (SBR) is submitted electronically through the CDRH Portal.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">What happens after I submit the SBR?</p>
  <p class="article-faq-a">FDA reviews the request and, if the company qualifies, issues a Small Business Decision number. This supports the company's use of the applicable reduced or waived user fee.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Does SBD reduce FDA's regulatory requirements?</p>
  <p class="article-faq-a">No. SBD affects user-fee eligibility only. It does not reduce requirements for device safety, performance, testing, documentation, or demonstrating substantial equivalence.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Can I submit my 510(k) first and obtain SBD later?</p>
  <p class="article-faq-a">Companies planning to use the reduced fee should obtain the applicable Small Business Decision number before relying on that reduced fee. Waiting until after submission can create unnecessary fee and timing risks.</p>
</div>

<h2><span class="num">09</span> Quick Checklist for an India-Based First-Time 510(k) Applicant</h2>
<ul class="article-checklist">
  <li>Confirm the SBD benefit you are seeking</li>
  <li>Check the applicable financial threshold</li>
  <li>Review applicable affiliates and gather the most recent tax-year financial information</li>
  <li>Complete Form FDA 3602N &mdash; Sections I &amp; II</li>
  <li>Complete the company portion of Section III</li>
  <li>Submit form for NTA certification</li>
  <li>Submit the SBD request through the CDRH Portal</li>
</ul>

<h2><span class="num">10</span> Key Takeaway</h2>
<div class="article-callout">
  <span class="article-callout-label">The Practical Rule</span>
  <p>For an India-based medical-device company, SBD is a financial/user-fee determination, not a device approval. The critical additional step is coordinating National Taxing Authority certification of Section III. Start early, involve your tax professional where useful, and obtain the FDA Small Business Decision before relying on the reduced 510(k) fee.</p>
</div>

<h2><span class="num">11</span> Sources</h2>
<ul class="article-sources">
  <li><a href="https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/reduced-or-waived-medical-device-user-fees-small-business-determination-sbd-program" target="_blank" rel="noopener">FDA Small Business Determination (SBD) Program</a></li>
  <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/medical-device-user-fee-small-business-qualification-and-determination" target="_blank" rel="noopener">Guidance Document</a></li>
  <li><a href="https://www.fda.gov/industry/fda-user-fee-programs/medical-device-user-fee-amendments-mdufa-fees" target="_blank" rel="noopener">User Fee Amendments (MDUFA)</a></li>
  <li><a href="https://www.fda.gov/media/187962/download" target="_blank" rel="noopener">Form FDA 3602N</a></li>
</ul>

<div class="article-closing">
  Regulatory Strategy is Product Strategy.
  <span class="tagline">Better Evidence. Safer Devices. A Healthier Tomorrow.</span>
</div>

    `
  }

];
