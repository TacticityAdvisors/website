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
    id: "your-first-market-fda-vs-eu-mdr",
    title: "Your First Market: Why the U.S. Can Be a Practical Starting Point for MedTech",
    image: "assets/newsletter/your-first-market-fda-vs-eu-mdr.jpg",
    date: "2026-09-29",
    summary: "Choosing a first regulatory market is a product-development decision, not just a paperwork choice. This FDA-forward guide compares the 510(k) pathway with EU MDR and lays out a practical framework for deciding which market to enter first — and how to build evidence once that transfers to the second.",
    content: `
<p style="font-style:italic;color:var(--ink-65);margin-top:-0.6rem;margin-bottom:1.8rem;">FDA 510(k) vs. EU MDR: A Practical, FDA-Forward Guide for Medical Device Founders</p>

<p>Choosing a first regulatory market is not simply a choice between &ldquo;FDA&rdquo; and &ldquo;CE.&rdquo; It is a product-development decision. The first market can influence intended use, predicate strategy, clinical evidence, testing, software and cybersecurity documentation, quality-system planning, regulatory spend and the timing of commercial milestones.</p>
<p>This article uses the FDA 510(k) pathway as the primary planning lens and then compares the EU MDR pathway as a second-market option. The objective is not to declare one market universally better. It is to show why a U.S.-first strategy can be particularly practical for a startup when the device and business model fit the FDA pathway.</p>

<h2><span class="num">01</span> Start With the U.S. Regulatory Question</h2>
<p>For a device that is eligible for a 510(k), FDA asks whether the new device is substantially equivalent to a legally marketed predicate device. The comparison can involve intended use and technological characteristics, together with performance and other information needed to address safety and effectiveness. FDA also has other premarket pathways, such as De Novo and PMA, so &ldquo;U.S. first&rdquo; does not automatically mean &ldquo;510(k).&rdquo;</p>

<div class="article-callout">
  <span class="article-callout-label">Founder Lens</span>
  <p>Before comparing countries, answer three U.S. questions: What is the device classification? Is there a credible predicate? What evidence will be needed to demonstrate substantial equivalence? If those answers are strong, the U.S. pathway may become a very workable first-market strategy.</p>
</div>

<h2><span class="num">02</span> Why FDA 510(k) Can Be Attractive as the First Market</h2>
<p>A 510(k) can be especially practical for a startup when the device has a strong predicate strategy and the company wants an early U.S. regulatory milestone. The key advantage is not that FDA removes evidence requirements; it is that the regulatory question can be structured around a known comparator and a defined premarket submission process.</p>

<h3>A credible predicate can shape the entire development plan</h3>
<ul>
  <li>Identify candidate predicates early, not after testing is complete.</li>
  <li>Compare intended use, indications, technological characteristics and relevant performance considerations.</li>
  <li>Identify differences and determine what evidence is needed to address their effect on safety and effectiveness.</li>
  <li>Use the predicate analysis to influence bench testing, biocompatibility, software, cybersecurity, labeling and, where appropriate, clinical planning.</li>
</ul>

<h3>FDA Pre-Submission: an important planning tool</h3>
<p>FDA&rsquo;s Q-Submission Program provides several mechanisms for interaction between submitters and FDA. A Pre-Submission can provide FDA feedback before an intended premarket submission, including a planned 510(k), on specific questions such as biocompatibility, bench testing or cybersecurity. FDA states that a Pre-Sub is not a pre-review of the future submission and does not guarantee a favourable future decision.</p>

<h3>eSTAR makes the U.S. submission workflow more structured</h3>
<p>FDA requires most 510(k) submissions to be prepared and submitted electronically using eSTAR, unless an applicable exemption applies. eSTAR is a guided submission tool intended to improve completeness and consistency. For a startup, this means the submission should be built with the FDA electronic structure in mind from the beginning, not assembled as a final formatting exercise.</p>

<h2><span class="num">03</span> The FDA 510(k) Development-to-Submission Flow</h2>
<h3>Review clock vs. real project time</h3>
<p>FDA states that the goal for a 510(k) MDUFA decision is <strong>90 FDA Days</strong>. FDA Days are calculated from receipt to the MDUFA decision while excluding time the submission is on hold for an Additional Information request. For planning, founders should therefore separate the FDA review clock from the much larger development timeline: device design, verification/validation, clinical work where needed, regulatory writing, internal review and responses to FDA.</p>

<div class="article-table-wrap">
<table>
  <tr><th>Step</th><th>What Happens</th></tr>
  <tr><td>1. Define</td><td>Intended use &middot; indications &middot; users &middot; technological characteristics</td></tr>
  <tr><td>2. Classify</td><td>Confirm U.S. classification and identify the applicable premarket pathway</td></tr>
  <tr><td>3. Find the predicate</td><td>Search FDA-cleared devices and confirm the predicate is legally marketed and appropriate</td></tr>
  <tr><td>4. Map differences</td><td>Compare intended use and technology; identify safety/effectiveness questions</td></tr>
  <tr><td>5. Build evidence</td><td>Bench &middot; biocompatibility &middot; sterilization &middot; EMC &middot; software &middot; cybersecurity &middot; clinical evidence, as applicable</td></tr>
  <tr><td>6. Consider Pre-Sub</td><td>Use a focused FDA Pre-Sub when targeted feedback would materially guide development or submission preparation</td></tr>
  <tr><td>7. Prepare eSTAR</td><td>Build a complete, internally consistent 510(k) package</td></tr>
  <tr><td>8. Submit + respond</td><td>Submit through the FDA process and manage any requests for additional information</td></tr>
  <tr><td>9. FDA decision</td><td>FDA&rsquo;s MDUFA decision goal for a 510(k) is 90 FDA Days; the total project timeline is broader</td></tr>
</table>
</div>

<h2><span class="num">04</span> Where EU MDR Fits and Why It May Be the Second Market</h2>
<p>The EU MDR uses a different regulatory architecture. The manufacturer must demonstrate conformity with applicable General Safety and Performance Requirements and follow the relevant conformity-assessment route. Depending on the device and route, third-party assessment by a Notified Body may be required. Clinical evaluation and sufficient clinical evidence are part of the MDR framework, with the level of evidence appropriate to the device and intended purpose.</p>

<h3>The Notified Body is a planning dependency when required</h3>
<p>The European Commission describes Notified Bodies as organizations designated to assess conformity of certain products before market placement when third-party intervention is required. MDCG guidance also encourages structured dialogue between manufacturers and Notified Bodies, but the relationship is constrained by independence and impartiality rules; certain pre-application assessment activities that would amount to consultancy are not permitted.</p>

<div class="article-callout">
  <span class="article-callout-label">Practical Comparison</span>
  <p>The point is not that EU MDR has &ldquo;no discussion&rdquo; with manufacturers. It does have structured dialogue. The difference is that FDA&rsquo;s Q-Submission program gives a clearly defined mechanism for obtaining FDA feedback on questions tied to an intended premarket submission, while a Notified Body must preserve its independent conformity-assessment role. This can make the FDA interaction model attractive for early regulatory planning.</p>
</div>

<h3>EU MDR may be the better first-market fit when:</h3>
<ul>
  <li>Europe is clearly the company&rsquo;s primary commercial market.</li>
  <li>The device does not have a credible U.S. predicate, and the U.S. pathway would therefore require a different strategy, such as De Novo.</li>
  <li>The development and clinical evidence plan has been designed around MDR requirements.</li>
  <li>The company has identified an appropriate Notified Body where one is required and has confirmed the relevant scope and engagement pathway.</li>
  <li>EU market access, European partnerships or European investor milestones are more important than an early U.S. milestone.</li>
</ul>

<div class="article-table-wrap">
<table>
  <tr><th>Planning Question</th><th>FDA / U.S. Primary Lens</th><th>EU MDR Second-Market Lens</th></tr>
  <tr>
    <td>Core regulatory question</td>
    <td>Can the device be shown substantially equivalent to a legally marketed predicate, where 510(k) is the applicable pathway?</td>
    <td>Does the device conform to applicable MDR requirements, including the General Safety and Performance Requirements?</td>
  </tr>
  <tr>
    <td>Regulatory route</td>
    <td>510(k), De Novo, PMA or another applicable U.S. pathway depending on classification and device characteristics.</td>
    <td>MDR classification and applicable conformity-assessment route; Notified Body involvement where required.</td>
  </tr>
  <tr>
    <td>Early interaction</td>
    <td>Formal Q-Submission mechanisms include Pre-Submissions for targeted FDA feedback before an intended premarket submission.</td>
    <td>Manufacturers and Notified Bodies may use structured dialogue, but Notified Bodies must preserve independence and cannot provide pre-certification consultancy.</td>
  </tr>
  <tr>
    <td>Evidence focus</td>
    <td>Predicate comparison, performance testing and other evidence needed for FDA&rsquo;s safety/effectiveness determination.</td>
    <td>Technical documentation, risk management, clinical evaluation/evidence, QMS and applicable conformity-assessment evidence.</td>
  </tr>
  <tr>
    <td>Submission format</td>
    <td>Most 510(k)s must use eSTAR unless an exemption applies.</td>
    <td>EU technical documentation and conformity-assessment documentation under the MDR.</td>
  </tr>
  <tr>
    <td>Timing lens</td>
    <td>FDA has a 90-FDA-Day MDUFA decision goal for 510(k)s; total project time is longer because development, preparation and response time sit outside that clock.</td>
    <td>Timing depends on evidence readiness, conformity assessment and, where applicable, Notified Body capacity and assessment.</td>
  </tr>
</table>
</div>

<h2><span class="num">05</span> The Evidence Strategy: Build Once Where You Can, Map Twice Where You Must</h2>
<p>An FDA-first strategy should not mean building a U.S.-only evidence system. The smarter approach is to create a common technical evidence backbone and then map that evidence to each market&rsquo;s regulatory questions.</p>

<div class="article-table-wrap">
<table>
  <tr><th>Evidence Area</th><th>Build with FDA in Mind</th><th>Plan for EU Reuse</th></tr>
  <tr>
    <td>Risk management</td>
    <td>Link risks to testing and the 510(k) safety/effectiveness argument.</td>
    <td>Map the same risk controls and evidence to MDR GSPR conformity.</td>
  </tr>
  <tr>
    <td>Performance testing</td>
    <td>Generate objective evidence tied to predicate differences and device claims.</td>
    <td>Reuse underlying test data where the test method, acceptance criteria and regulatory purpose remain suitable.</td>
  </tr>
  <tr>
    <td>Clinical evidence</td>
    <td>Plan only the clinical evidence actually needed for the U.S. pathway and device.</td>
    <td>Assess whether the same clinical data support MDR clinical evaluation and clinical evidence expectations.</td>
  </tr>
  <tr>
    <td>Software &amp; cybersecurity</td>
    <td>Build cybersecurity documentation, threat analysis, vulnerability processes and applicable SBOM information early.</td>
    <td>Reuse the technical evidence, but remap it to MDR requirements and applicable EU cybersecurity guidance.</td>
  </tr>
  <tr>
    <td>QMS</td>
    <td>Build a controlled quality system that supports design, risk, verification/validation and production.</td>
    <td>Leverage the same quality infrastructure for EU conformity assessment where appropriate.</td>
  </tr>
</table>
</div>

<h2><span class="num">06</span> Software, Cybersecurity and AI: Where FDA-First Still Requires Global Thinking</h2>
<p>For connected and software-enabled devices, cybersecurity should be built into product development rather than treated as a final submission appendix. FDA&rsquo;s February 2026 final cybersecurity guidance addresses device design, labelling, and recommended premarket documentation for devices with cybersecurity risk and discusses statutory requirements for qualifying &ldquo;cyber devices&rdquo; under section 524B of the FD&amp;C Act.</p>
<ul>
  <li>Define cybersecurity responsibilities and lifecycle ownership early.</li>
  <li>Maintain threat modelling and security risk documentation.</li>
  <li>Establish a controlled software bill of materials (SBOM) process where applicable.</li>
  <li>Plan vulnerability identification, monitoring and response activities.</li>
  <li>Ensure the eSTAR cybersecurity section is accurate and complete for applicable submissions.</li>
</ul>
<p>The same engineering evidence can support EU MDR work, but the regulatory mapping is not identical. For an FDA-first program, the practical objective is to build the cybersecurity evidence once at the engineering level and then package it separately for each regulatory framework.</p>

<h3>AI-enabled devices</h3>
<p>If the product incorporates AI, keep the medical device regulatory strategy separate from, but coordinated with, AI-specific requirements. The EU AI Act has specific rules for high-risk AI, including AI embedded in regulated products. Following the 2026 AI Omnibus changes, the current application date for high-risk AI embedded in products is 2 August 2028. This should be treated as a live planning item because EU implementation guidance and supporting standards continue to evolve.</p>

<h2><span class="num">07</span> For Indian MedTech Companies: What an FDA-First Strategy Means</h2>
<p>For an India-based company, choosing the U.S. first does not replace Indian regulatory obligations. CDSCO states that medical devices in India are regulated under the Drugs and Cosmetics Act, 1940 and the Medical Devices Rules, 2017, with risk-based classification and specific licensing pathways.</p>
<ul>
  <li>Treat U.S. market entry and India market entry as separate regulatory workstreams.</li>
  <li>Design the technical file so core engineering evidence can be reused, while recognizing that local regulatory submissions and licensing requirements differ.</li>
  <li>Do not assume FDA clearance automatically authorizes manufacture, import or sale in India.</li>
  <li>If India is also an early commercial market, map CDSCO requirements during product development rather than after FDA submission.</li>
</ul>

<div class="article-callout">
  <span class="article-callout-label">For Indian Founders</span>
  <p>A U.S.-first strategy can still be efficient if the company deliberately creates a reusable evidence backbone that supports the U.S., India and later EU submissions. The goal is not three separate development programs; it is one controlled product-development program with market-specific regulatory mapping.</p>
</div>

<h2><span class="num">08</span> A Practical FDA-First Decision Framework</h2>
<p>Use the following sequence before committing the company to a first-market order:</p>
<ol>
  <li>Confirm the commercial priority. Is the U.S. a meaningful early revenue, partnership or investor milestone?</li>
  <li>Confirm the U.S. regulatory route. Is 510(k) actually appropriate, or should the team consider De Novo, PMA or another route?</li>
  <li>Search for the predicate early. Do not wait until the verification/validation plan is already fixed.</li>
  <li>Map the evidence. Identify what is already available and what must be generated.</li>
  <li>Identify uncertainty. If FDA feedback could materially change testing, clinical strategy or submission preparation, assess whether a Pre-Sub is appropriate.</li>
  <li>Build the common evidence backbone. QMS, risk management, performance testing, software, cybersecurity and clinical evidence should be controlled and traceable.</li>
  <li>Map the EU gap. Determine classification, GSPRs, clinical evaluation, technical documentation and Notified Body needs.</li>
  <li>Choose the sequence. If the U.S. route is commercially important and technically credible, an FDA-first sequence may be practical; otherwise, choose the market that best fits the device and business strategy.</li>
  <li>Prepare the second market early. FDA-first should not become EU-later-by-surprise.</li>
</ol>

<div class="article-callout">
  <span class="article-callout-label">What This Means for a Founder</span>
  <p>If your team is unsure about a testing approach, clinical question, cybersecurity evidence package, or other material submission issue, a well-scoped Pre-Sub can help you resolve the question earlier rather than discovering the issue during 510(k) review.</p>
</div>

<h2><span class="num">09</span> When an FDA-First Strategy Is Particularly Practical</h2>
<ul>
  <li>A credible 510(k) predicate exists, and the technological differences can be addressed with a focused evidence plan.</li>
  <li>The U.S. is an important commercial or fundraising milestone.</li>
  <li>The company values a defined mechanism for obtaining FDA feedback before the planned submission.</li>
  <li>The device can generate a strong non-clinical evidence package, where appropriate.</li>
  <li>The regulatory team can prepare a high-quality eSTAR submission and manage FDA interactions.</li>
  <li>The company wants to build a U.S. regulatory foundation that can later be mapped to EU MDR and other markets.</li>
</ul>

<div class="article-callout">
  <span class="article-callout-label">Important Boundary</span>
  <p>FDA-first does not mean FDA-only. It also does not mean every device should go through 510(k). The strongest FDA-first strategy is one in which the U.S. pathway is supported by the device&rsquo;s classification, predicate landscape, evidence requirements and commercial plan.</p>
</div>

<h2><span class="num">10</span> Common Mistakes Founders Make</h2>
<ul>
  <li>Choosing a market before defining the intended use and claims.</li>
  <li>Choosing a predicate based only on product similarity rather than regulatory relevance.</li>
  <li>Treating a predicate as a shortcut around verification, validation or safety/effectiveness evidence.</li>
  <li>Assuming a 90-FDA-Day MDUFA goal equals a 90-day end-to-end launch timeline.</li>
  <li>Waiting until the submission is nearly complete to identify FDA questions that could have been discussed earlier.</li>
  <li>Treating cybersecurity as paperwork rather than an engineering lifecycle.</li>
  <li>Assuming FDA evidence automatically establishes EU MDR conformity.</li>
  <li>Assuming CE marking automatically establishes U.S. eligibility for 510(k).</li>
  <li>Ignoring Notified Body availability when EU conformity assessment requires third-party assessment.</li>
  <li>Building separate technical evidence systems for every market instead of a common controlled evidence backbone.</li>
</ul>

<h2><span class="num">11</span> Founder FAQ</h2>

<div class="article-faq-item">
  <p class="article-faq-q">Is FDA 510(k) always faster than EU MDR?</p>
  <p class="article-faq-a">No. FDA has a 90-FDA-Day MDUFA decision goal for 510(k)s, but that is not the total development-to-clearance timeline. EU MDR timing varies with evidence readiness, conformity assessment and, where required, Notified Body engagement and capacity.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Does FDA have an advantage because of Pre-Submission?</p>
  <p class="article-faq-a">It provides a specific planning mechanism, not a guarantee. A Pre-Sub can help a company obtain FDA feedback on targeted questions before an intended 510(k), which may reduce avoidable uncertainty when used appropriately.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Does the EU have no pre-submission interaction?</p>
  <p class="article-faq-a">That would be too broad. EU manufacturers can have structured dialogue with Notified Bodies, but Notified Bodies must preserve independence and cannot provide certain pre-certification consultancy activities.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Is EU MDR always more expensive?</p>
  <p class="article-faq-a">Not necessarily. Cost depends on device classification, clinical strategy, testing, QMS, conformity-assessment route and company infrastructure.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Can I reuse FDA evidence for EU MDR?</p>
  <p class="article-faq-a">Often the underlying technical evidence can be reused, but it must be mapped against MDR requirements and may need additional evidence or documentation.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Does CE marking make FDA clearance automatic?</p>
  <p class="article-faq-a">No. FDA applies its own classification and premarket requirements. For a 510(k), the substantial-equivalence analysis remains relevant.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Do all EU medical devices need a Notified Body?</p>
  <p class="article-faq-a">No. The need for third-party conformity assessment depends on the applicable MDR route and device classification.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Do I need a clinical trial for every EU MDR device?</p>
  <p class="article-faq-a">No. MDR requires clinical evaluation and sufficient clinical evidence appropriate to the device and intended purpose; the required evidence is device-specific.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Should an Indian startup always choose FDA first?</p>
  <p class="article-faq-a">No. FDA-first can be practical when the U.S. route, predicate strategy and commercial plan align. India, Europe or another market may be the better first market for a different device or business model.</p>
</div>

<h2><span class="num">12</span> Quick FDA-First Checklist</h2>
<ul class="article-checklist">
  <li>Define intended use, indications, target users and key claims.</li>
  <li>Confirm U.S. device classification and likely premarket pathway.</li>
  <li>Identify and document candidate 510(k) predicates early.</li>
  <li>Map technological differences and safety/effectiveness questions.</li>
  <li>Build the verification/validation and clinical evidence plan.</li>
  <li>Plan software, cybersecurity, usability and SBOM evidence where applicable.</li>
  <li>Assess whether a Pre-Submission would reduce material uncertainty.</li>
  <li>Build the eSTAR package structure early.</li>
  <li>Confirm QMS readiness and design-control traceability.</li>
  <li>Map reusable evidence to EU MDR requirements.</li>
  <li>Identify Notified Body needs and availability if EU is a near-term market.</li>
  <li>Map CDSCO requirements separately if India is a target market.</li>
  <li>Compare total development-to-market time, not only formal review clocks.</li>
  <li>Align regulatory sequence with commercial, partnership and fundraising milestones.</li>
</ul>

<h2><span class="num">13</span> Tacticity Advisors: Practical Regulatory Strategy</h2>
<p>The most efficient market-entry programs are usually designed around a common evidence backbone rather than around isolated submissions. For an FDA-first strategy, that means identifying the U.S. pathway and predicate early, using FDA interaction mechanisms where they add value, and simultaneously identifying which evidence can support the second market.</p>
<ul>
  <li>Plan regulatory strategy from product design, not after development is complete.</li>
  <li>Define the U.S. pathway and predicate before locking the evidence plan.</li>
  <li>Use Pre-Submission strategically when a targeted FDA question could materially change development or submission preparation.</li>
  <li>Build reusable evidence and traceability across risk, testing, software, cybersecurity and clinical activities.</li>
  <li>Treat EU MDR as a second-market mapping exercise only where the evidence genuinely transfers; do not assume automatic conformity.</li>
  <li>For India-based companies, maintain a separate CDSCO workstream while maximizing reuse of controlled technical evidence.</li>
</ul>
<p>Tacticity Advisors supports medical-device companies with regulatory strategy, pathway assessment, evidence planning, technical documentation and submission support across the U.S., EU and other markets. The practical objective is to reduce avoidable rework while keeping each market&rsquo;s regulatory requirements distinct.</p>

<h2><span class="num">14</span> Key Takeaway</h2>
<div class="article-callout">
  <span class="article-callout-label">Final Key Takeaway</span>
  <p>For a MedTech startup with a credible 510(k) pathway and a meaningful U.S. commercial objective, the FDA can be a practical first-market choice, not because it is universally easier, but because the pathway can be built around a predicate, a structured submission process and a formal opportunity for targeted FDA feedback before the planned submission. Build the technical evidence once where possible, map it carefully to EU MDR and other markets, and choose the sequence based on the device, evidence, resources and business plan.</p>
</div>

<h2><span class="num">15</span> Sources</h2>
<ul class="article-sources">
  <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/requests-feedback-and-meetings-medical-device-submissions-q-submission-program" target="_blank" rel="noopener">FDA: Requests for Feedback and Meetings for Medical Device Submissions: The Q-Submission Program, Final Guidance, May 2025</a></li>
  <li><a href="https://www.fda.gov/media/114034/download" target="_blank" rel="noopener">FDA: Q-Submission Final Guidance PDF (Pre-Submission section)</a></li>
  <li><a href="https://www.fda.gov/medical-devices/how-study-and-market-your-device/premarket-submissions-selecting-and-preparing-correct-submission" target="_blank" rel="noopener">FDA: Premarket Submissions: Selecting and Preparing the Correct Submission</a></li>
  <li><a href="https://www.fda.gov/medical-devices/premarket-notification-510k/how-prepare-traditional-510k" target="_blank" rel="noopener">FDA: How to Prepare a Traditional 510(k)</a></li>
  <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/electronic-submission-template-medical-device-510k-submissions" target="_blank" rel="noopener">FDA: Electronic Submission Template for Medical Device 510(k) Submissions, Final Guidance</a></li>
  <li><a href="https://www.fda.gov/medical-devices/how-study-and-market-your-device/estar-program" target="_blank" rel="noopener">FDA: eSTAR Program</a></li>
  <li><a href="https://www.fda.gov/medical-devices/premarket-notification-510k/510k-submission-process" target="_blank" rel="noopener">FDA: 510(k) Submission Process</a></li>
  <li><a href="https://eur-lex.europa.eu/eli/reg/2017/745/2017-05-05/eng" target="_blank" rel="noopener">EUR-Lex: Regulation (EU) 2017/745 on Medical Devices (MDR), including Article 61 on clinical evaluation</a></li>
  <li><a href="https://health.ec.europa.eu/medical-devices-topics-interest/reprocessing-devices/manufacturers-md_en" target="_blank" rel="noopener">European Commission: Medical Devices: Manufacturers MD</a></li>
  <li><a href="https://health.ec.europa.eu/medical-devices-topics-interest/notified-bodies-medical-devices_en" target="_blank" rel="noopener">European Commission: Notified Bodies for Medical Devices</a></li>
  <li><a href="https://health.ec.europa.eu/document/download/9c9c532f-013a-477c-9378-0a9e714e5549_en" target="_blank" rel="noopener">MDCG 2019-6 Rev.5: Questions and Answers: Requirements Relating to Notified Bodies</a></li>
  <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/cybersecurity-medical-devices-quality-management-system-considerations-and-content-premarket" target="_blank" rel="noopener">FDA: Cybersecurity in Medical Devices: Quality Management System Considerations and Content of Premarket Submissions, February 2026</a></li>
  <li><a href="https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act" target="_blank" rel="noopener">European Commission: Navigating the AI Act</a></li>
  <li><a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener">European Commission: AI Act / Application Timeline</a></li>
  <li><a href="https://www.cdsco.gov.in/opencms/opencms/en/Medical-Device-Diagnostics/Medical-Device-Diagnostics/" target="_blank" rel="noopener">CDSCO: Medical Device &amp; Diagnostics / Medical Devices Rules, 2017</a></li>
</ul>

<div class="article-closing">
  Regulatory Strategy is Product Strategy.
  <span class="tagline">Better Evidence. Safer Devices. A Healthier Tomorrow.</span>
</div>

    `
  },

  {
    id: "fda-2026-human-factors-guidance-update",
    title: "FDA's 2026 Human Factors Guidance Update: What Medical Device Manufacturers Need to Know",
    image: "assets/newsletter/fda-2026-human-factors-guidance-update.jpg",
    date: "2026-09-23",
    summary: "FDA's August 2026 update to its Human Factors and Usability Engineering guidance refreshes terminology, separates HFE development from submission content, and removes the fixed 2016 report structure in favor of risk-proportionate documentation. This guide walks through what changed, what has not, and a practical five-step review for manufacturers with an existing HFE program.",
    content: `

<div class="article-table-wrap">
<table>
  <tr><th>Area</th><th>2016 Framework</th><th>2026 Update</th><th>What It Means</th></tr>
  <tr><td>Terminology</td><td>More FDA-specific</td><td>Closer international alignment</td><td>Easier integration with existing QMS/risk/usability work.</td></tr>
  <tr><td>Report structure</td><td>Appendix A template</td><td>Risk-based submission information</td><td>More flexibility in how evidence is presented.</td></tr>
  <tr><td>Definitions</td><td>Less extensive</td><td>Expanded and clarified</td><td>Better consistency in interpretation.</td></tr>
  <tr><td>Alignment</td><td>More standalone</td><td>Closer ISO alignment</td><td>Less duplicated translation between frameworks.</td></tr>
  <tr><td>Documentation</td><td>Could feel one-size-fits-all</td><td>More proportionate to risk</td><td>Potentially less submission material for lower-risk situations.</td></tr>
  <tr><td>Core safety objective</td><td>Identify and reduce use-related risk</td><td>Retained</td><td>No fundamental change in the safety goal.</td></tr>
</table>
</div>

<h2><span class="num">01</span> What Is Human Factors Engineering?</h2>
<p>A medical device can meet technical specifications and still pose risks if users cannot operate it safely. This is where Human Factors Engineering (HFE) and Usability Engineering (UE) become critical &mdash; ensuring devices are designed for real users, real environments, and safe use. Imagine a patient at home using a medical device while tired, stressed, or in pain. The lighting may be poor, their vision or dexterity may be limited, and they may be distracted or unfamiliar with the device. Human factors engineering starts with this reality: medical devices must be designed for the people and environments in which they will actually be used.</p>

<div class="article-callout">
  <span class="article-callout-label">Definition</span>
  <p>HFE applies knowledge about human behavior, abilities, limitations, and other characteristics to the design of medical devices, systems, and tasks to achieve adequate usability.</p>
</div>

<div class="article-table-wrap">
<table>
  <tr><th>Concept</th><th>In Simple Terms</th><th>Real-Life Example</th></tr>
  <tr><td>Human behavior</td><td>What people actually do when using a device</td><td><strong>Designer expects:</strong> Users will read the manual first. <strong>Reality:</strong> Many users start pressing buttons and check the manual only when something goes wrong.</td></tr>
  <tr><td>Abilities and limitations</td><td>What users can and cannot easily see, hear, understand, remember, or physically do</td><td><strong>Designer expects:</strong> Users can easily see the buttons. <strong>Reality:</strong> In low light, a user may struggle to distinguish them.</td></tr>
  <tr><td>Design</td><td>What the device provides for users to interact with</td><td><strong>Designer expects:</strong> A red button clearly means &ldquo;STOP.&rdquo; <strong>Reality:</strong> If it looks like another control, users may press the wrong button.</td></tr>
  <tr><td>Usability</td><td>How easily and safely users can complete a task</td><td><strong>Designer expects:</strong> Users will understand the alarm. <strong>Reality:</strong> If the sound or message is unclear, they may not know what action to take.</td></tr>
</table>
</div>

<h3>Human Factors (HFE) vs. User Experience (UX)</h3>
<div class="article-table-wrap">
<table>
  <tr><th>UX Emphasis</th><th>HFE Emphasis</th></tr>
  <tr><td>Ease, satisfaction, and efficiency</td><td>Safe and effective use</td></tr>
  <tr><td>User preference and experience</td><td>Use-related risk and error prevention</td></tr>
  <tr><td>&ldquo;Is the experience good?&rdquo;</td><td>&ldquo;Can the device be used safely and effectively?&rdquo;</td></tr>
</table>
</div>

<h2><span class="num">02</span> The FDA&rsquo;s Risk-Based Approach: How FDA Applies HFE</h2>
<h3>Does Every Device Need HFE?</h3>
<p>The scope of human-factors work depends on the device, its user interface, intended users, use environment, and use-related risks. Documentation of the usability-engineering rationale should be maintained within the quality system, while the extent of evaluation and validation depends on the identified risks.</p>
<p>The FDA&rsquo;s human-factors approach is fundamentally risk-based. If a user interaction can lead to serious harm, the design should address that risk as directly as possible.</p>

<h3>Design First and Identify Critical Risks</h3>
<p>Do not rely on a warning, label, or training program when the underlying design can be improved to reduce the use-related risk.</p>

<h3>The Risk-Control Hierarchy</h3>
<ul>
  <li><strong>Inherently safe design:</strong> Eliminate or reduce the hazard through the design itself. Example: design a tube connector with a unique shape so it cannot be plugged into the wrong slot.</li>
  <li><strong>Protective measures:</strong> Use alarms, guards, interlocks, or other safety mechanisms when the hazard cannot be adequately controlled through design alone. Example: an alarm beeps if the device detects that the wrong tube has been connected.</li>
  <li><strong>Information for safety:</strong> Use labeling, instructions, or training as supporting controls where appropriate. Example: a label reminds the user to &ldquo;Check the tube before connecting.&rdquo;</li>
</ul>

<h3>A Four-Phase View</h3>
<div class="article-table-wrap">
<table>
  <tr><th>Phase</th><th>Focus</th><th>Key Question</th></tr>
  <tr><td>1. Understand</td><td>Define users &amp; environments</td><td>Who &amp; where?</td></tr>
  <tr><td>2. Critical Task</td><td>Find risky user tasks</td><td>Worst mistakes?</td></tr>
  <tr><td>3. Formative</td><td>Test &amp; refine the design</td><td>Need fixing?</td></tr>
  <tr><td>4. Validate</td><td>Test final interface</td><td>Safe to use?</td></tr>
</table>
</div>
<p>Critical-task identification is central to deciding where design controls and HFE evidence should be concentrated. It is a user task that, if performed incorrectly or not performed at all, could cause serious harm to the patient or user.</p>

<div class="article-callout">
  <span class="article-callout-label">Example</span>
  <p>For an infusion device, entering the wrong drug concentration could lead to an incorrect dose. The task of entering and confirming the concentration may therefore require focused risk analysis and evaluation.</p>
</div>

<h2><span class="num">03</span> What Specifically Changed in the 2026 Guidance?</h2>
<p>The August 2026 update does not fundamentally replace FDA&rsquo;s human factors approach. Instead, it refreshes terminology, updates documentation expectations, and separates the HFE development process from the question of what information should be submitted to FDA. For manufacturers already following the 2016 framework, the change is more about updating how the work is documented and communicated than rebuilding the entire HFE program.</p>

<h3>1. Updated Terminology and Definitions</h3>
<p>The revised guidance significantly updates its definitions section to reflect terminology used in current human factors, risk-management, and usability-engineering frameworks. The updated definitions now address concepts such as:</p>
<ul>
  <li><strong>Harm:</strong> The injury or damage that can result from using a device.</li>
  <li><strong>Normal use:</strong> How the device is expected to be used, including routine operation and reasonably foreseeable actions.</li>
  <li><strong>Residual risk:</strong> The risk that remains even after steps have been taken to reduce or control the hazard.</li>
  <li><strong>Serious harm / serious injury:</strong> Harm or injury that has a significant impact on the user and may require medical intervention or have other serious consequences.</li>
  <li><strong>Use environment:</strong> Where and under what conditions the device is actually used &mdash; a brightly lit hospital may be very different from a dimly lit bedroom.</li>
  <li><strong>Use-related risk analysis (URRA):</strong> A structured analysis used to identify and evaluate risks that can arise from how people interact with and use the device.</li>
  <li><strong>Abnormal use:</strong> The updated wording emphasizes a deliberate action or omission that departs from normal use and falls outside the manufacturer&rsquo;s reasonable ability to further reduce the associated risk through user-interface design.</li>
  <li><strong>Formative evaluation:</strong> Now described more concisely around its main purpose &mdash; using evaluation activities to identify strengths, weaknesses, and unexpected use errors so the user interface can be improved.</li>
  <li><strong>Human factors engineering:</strong> Updated to emphasize the application of knowledge about human capabilities, limitations, and characteristics when designing devices, systems, and tasks.</li>
  <li><strong>Task:</strong> The interactions a user performs with a device to achieve a desired outcome.</li>
  <li><strong>User interface:</strong> Now makes clear that interaction is not limited to physical controls or software screens. It can include displays, alarms, packaging, labeling, training materials, and device logic.</li>
</ul>
<p>The underlying HFE principles remain familiar, but companies should make sure their internal terminology and documentation are consistent with the updated FDA framework.</p>

<h3>2. HFE Development &ne; FDA Submission Content</h3>
<p>The revised Section 9 makes a clearer distinction between the HFE work performed during development and the information that needs to be submitted to the FDA.</p>
<div class="article-table-wrap">
<table>
  <tr><th>During Development</th><th>In the FDA Submission</th></tr>
  <tr><td>Risk management</td><td>Relevant HFE evidence</td></tr>
  <tr><td>Formative evaluations</td><td>Appropriate submission information</td></tr>
  <tr><td>Design optimization</td><td>Evidence supporting regulatory review</td></tr>
  <tr><td>Broader HFE documentation</td><td>Broader HFE documentation</td></tr>
</table>
</div>
<p>In simple terms, the FDA is now asking two separate questions. First, <strong>what HFE work did you do?</strong> &mdash; the documentation should show how use-related risks were identified and addressed, through risk management, HFE/UE evaluations, and design optimization. Second, <strong>what do you need to show the FDA?</strong> &mdash; the submission should contain the HFE information needed to support the regulatory review.</p>
<p>For the separate question of what HFE information should actually be submitted to FDA, the revised guidance now points manufacturers to the May 2026 guidance:</p>
<div class="article-table-wrap">
<table>
  <tr><th>FDA Guidance</th><th>Main Question</th></tr>
  <tr><td><a href="https://www.fda.gov/media/80481/download" target="_blank" rel="noopener">HFE/UE Guidance</a></td><td>How should the manufacturer approach HFE during device development?</td></tr>
  <tr><td><a href="https://www.fda.gov/media/163694/download" target="_blank" rel="noopener">HF Content Guidance</a></td><td>What HFE information should be included in the FDA submission?</td></tr>
</table>
</div>

<h3>3. Removal of the Fixed HFE Report Structure</h3>
<p>The 2016 guidance included a recommended structure for presenting HFE/UE information. The August 2026 guidance no longer uses that fixed structure. Instead of following one standard format, manufacturers should provide the right level of HFE information based on the risks associated with their device and the needs of the FDA review. This does not mean HFE work or documentation is no longer needed.</p>
<p><strong>What manufacturers should do:</strong></p>
<ul>
  <li>Continue to properly document the HFE work performed.</li>
  <li>Determine what HFE information is relevant for the specific submission.</li>
  <li>Provide enough evidence for FDA to understand how use-related risks were identified, evaluated, and addressed.</li>
</ul>

<h3>4. Alignment with QMSR</h3>
<p>The revised guidance also updates its terminology to reflect FDA&rsquo;s current quality-system framework. The 2016 guidance used terminology from the former Quality System Regulation (QSR) framework. The updated guidance reflects the current Quality Management System Regulation (QMSR) environment, which incorporates ISO 13485:2016 by reference.</p>
<div class="article-callout">
  <span class="article-callout-label">For Manufacturers, the Practical Message</span>
  <p>HFE documentation should be integrated into your current design-and-development and risk-management records, using terminology consistent with your current quality system.</p>
</div>

<h2><span class="num">04</span> What Has NOT Changed?</h2>
<p>The core safety expectations remain:</p>
<ul>
  <li>Understand users and use environments.</li>
  <li>Identify use-related hazards and critical tasks.</li>
  <li>Reduce risk through design.</li>
  <li>Conduct formative evaluation.</li>
  <li>Validate the final user interface with appropriate representative users.</li>
  <li>Maintain traceability between risks, controls, and evidence.</li>
</ul>
<div class="article-table-wrap">
<table>
  <tr><th>Core Expectation</th><th>What It Means in Practice</th></tr>
  <tr><td>Identify critical tasks</td><td>Focus on user interactions that can lead to serious harm.</td></tr>
  <tr><td>Control risks through design</td><td>Reduce use-related risk through design before relying on warnings or training.</td></tr>
  <tr><td>Use formative evaluation</td><td>Test during development so problems can be corrected before final validation.</td></tr>
  <tr><td>Validate the final interface</td><td>Use representative users and realistic tasks to evaluate the final user interface.</td></tr>
</table>
</div>
<p>Human-factors validation testing is conducted near the end of development to assess user interactions with the final user interface and identify use errors that could result in serious harm. The commonly cited benchmark of at least 15 representative users from each distinct user population remains an important planning consideration.</p>

<div class="article-callout">
  <span class="article-callout-label">Do Not Confuse &ldquo;Less Documentation&rdquo; With &ldquo;Less Safety Work&rdquo;</span>
  <p>A risk-proportionate submission may reduce what is submitted to FDA without eliminating the underlying design, risk-analysis, and usability activities needed to support safe use.</p>
</div>

<h2><span class="num">05</span> What Does This Mean for Manufacturers?</h2>
<h3>Scenario 1 &mdash; A Class II Device</h3>
<p>An integrated approach can connect user needs, use-related hazards, critical tasks, risk controls, formative evaluations, and validation evidence rather than recreating the same rationale in separate regulatory documents.</p>
<ul>
  <li>Define users, environments, and user-interface characteristics early.</li>
  <li>Connect use-related risk analysis to the broader risk-management file.</li>
  <li>Document critical tasks and the controls applied to them.</li>
  <li>Use formative testing to improve the interface.</li>
  <li>Plan validation evidence around the final user interface and representative user groups.</li>
</ul>

<h3>Scenario 2 &mdash; A Minor Device Update</h3>
<div class="article-table-wrap">
<table>
  <tr><th>Question</th><th>If Yes&hellip;</th><th>If No&hellip;</th></tr>
  <tr><td>Does the change affect the user interface?</td><td>Assess resulting use-related risks.</td><td>Document why HFE impact is limited.</td></tr>
  <tr><td>Does it introduce a new critical task?</td><td>Plan deeper evaluation and evidence as appropriate.</td><td>Existing evidence may remain relevant.</td></tr>
  <tr><td>Could a use error cause serious harm?</td><td>Strengthen risk controls and evidence.</td><td>A proportionate approach may be appropriate.</td></tr>
</table>
</div>

<h3>Scenario 3 &mdash; An Indian Startup Entering the U.S.</h3>
<p>For an Indian MedTech company already working within ISO 13485 and ISO 14971 frameworks, the 2026 alignment can make the FDA pathway easier to understand. ISO certification alone does not prove FDA compliance; however, the underlying engineering and risk-management work can provide a strong starting point for FDA-oriented HFE documentation.</p>
<p><strong>What is easier:</strong></p>
<ul>
  <li>Terminology is easier to connect with international standards.</li>
  <li>Existing quality and risk-management work can be more readily integrated into the HFE story.</li>
  <li>Submission documentation can be proportionate to the device&rsquo;s human-factors risk and the nature of the change.</li>
</ul>
<p><strong>What deserves more attention:</strong></p>
<ul>
  <li>Use-related risk analysis should be explicit and traceable.</li>
  <li>Risk controls should demonstrate how the design itself reduces use-related harm.</li>
  <li>The rationale for the amount of HFE evidence should be clear and defensible.</li>
</ul>

<h2><span class="num">06</span> Five Misconceptions</h2>

<div class="article-faq-item">
  <p class="article-faq-q">Myth: &ldquo;The 2026 update relaxed FDA requirements.&rdquo;</p>
  <p class="article-faq-a">The core safety objective remains unchanged. The main shift is toward clearer terminology, stronger alignment, and proportionate submission information.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Myth: &ldquo;A lower-risk device does not need any HFE thinking.&rdquo;</p>
  <p class="article-faq-a">Risk level can change the depth of evaluation and submission evidence, but the design should still consider users, use environment, and use-related risk.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Myth: &ldquo;A warning label can fix a confusing design.&rdquo;</p>
  <p class="article-faq-a">Warnings and training can support risk control, but they should not replace feasible design-based controls.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Myth: &ldquo;The update is only relevant to new devices.&rdquo;</p>
  <p class="article-faq-a">The updated framework is relevant to new submissions and applicable modifications; existing approved devices are not automatically re-reviewed solely because the guidance was updated.</p>
</div>
<div class="article-faq-item">
  <p class="article-faq-q">Myth: &ldquo;ISO 13485 certification means the FDA HFE work is automatically complete.&rdquo;</p>
  <p class="article-faq-a">ISO-aligned processes provide a strong foundation, but FDA submission expectations still need to be assessed for the specific device and submission.</p>
</div>

<h2><span class="num">07</span> Tacticity&rsquo;s Practical Takeaway</h2>
<div class="article-callout">
  <span class="article-callout-label">What Should Medical Device Manufacturers Do Now?</span>
  <p>For companies that already have an HFE program based on the 2016 FDA guidance, the August 2026 revision does not mean starting over. Instead, use the update as an opportunity to review your existing documentation.</p>
</div>
<p><strong>Tacticity recommends a five-step review:</strong></p>
<ul class="article-checklist">
  <li>Review your existing HFE/UE procedures.</li>
  <li>Map your terminology to the updated FDA framework.</li>
  <li>Assess whether your URRA and critical-task documentation remain traceable.</li>
  <li>Separate development documentation from submission-specific evidence.</li>
  <li>Determine the appropriate FDA HFE submission category for upcoming submissions or modifications.</li>
</ul>

<h3>If You Are Starting Development</h3>
<ul class="article-checklist">
  <li>Establish an integrated HFE/usability engineering process alongside quality and risk management.</li>
  <li>Define intended users, use environments, and user-interface characteristics early.</li>
  <li>Identify use-related hazards and critical tasks before the interface is finalized.</li>
  <li>Plan formative evaluations during development.</li>
  <li>Define representative user groups and the validation strategy before final testing.</li>
</ul>

<h3>If You Already Have an Approved Device</h3>
<ul class="article-checklist">
  <li>Review existing HFE documentation and identify evidence supporting the current design.</li>
  <li>For future submissions or modifications, assess the impact of the change on users, user interface, and use-related risk.</li>
  <li>Use the current FDA submission guidance to determine the appropriate level of HFE information.</li>
  <li>Maintain traceability between risk analysis, design controls, usability activities, and submission evidence.</li>
</ul>

<h3>If You Are Preparing a Submission</h3>
<ul class="article-checklist">
  <li>Determine the applicable FDA human-factors submission category using the current FDA guidance.</li>
  <li>Prepare documentation proportionate to the device and its use-related risk.</li>
  <li>Ensure critical tasks, risk controls, and evaluation results are traceable.</li>
  <li>If the appropriate approach is unclear, consider an appropriate FDA pre-submission/Q-submission mechanism.</li>
</ul>

<div class="article-callout">
  <span class="article-callout-label">Need Help Assessing How This Affects Your Device?</span>
  <p>Tacticity Advisors can support manufacturers with regulatory strategy, HFE documentation review, risk-based submission planning, and FDA engagement.</p>
</div>

<h2><span class="num">08</span> Conclusion</h2>
<p>The FDA&rsquo;s August 2026 update does not change the fundamental goal of safe and effective medical-device design. Instead, it modernizes and clarifies how human factors engineering should be applied throughout device development. By updating terminology, clarifying the relationship between HFE development activities and submission content, and providing greater flexibility in documentation, the guidance reinforces a fundamental principle: HFE should not be treated as a regulatory checkbox at the end of development. It should be integrated from the outset as an engineering discipline that connects users, use environments, user interfaces, risk management, design controls, usability evaluation, and regulatory strategy.</p>
<p>Ultimately, effective HFE is not simply about demonstrating compliance: it is about building evidence that the device can be used safely and effectively by its intended users in its intended use environments.</p>

<h2><span class="num">09</span> Key Sources</h2>
<ul class="article-sources">
  <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/applying-human-factors-and-usability-engineering-medical-devices" target="_blank" rel="noopener">FDA &mdash; Applying Human Factors and Usability Engineering to Medical Devices, August 2026</a></li>
  <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/content-human-factors-information-medical-device-marketing-submissions" target="_blank" rel="noopener">FDA &mdash; Content of Human Factors Information in Medical Device Marketing Submissions, May 2026</a></li>
  <li><a href="https://www.fda.gov/medical-devices/human-factors-and-medical-devices/human-factors-premarket-information-device-design-and-documentation-processes" target="_blank" rel="noopener">FDA &mdash; Human Factors: Premarket Information</a></li>
  <li><a href="https://www.fda.gov/medical-devices/how-study-and-market-your-device/estar-program" target="_blank" rel="noopener">FDA &mdash; eSTAR Program</a></li>
</ul>

<div class="article-closing">
  Regulatory Strategy is Product Strategy.
  <span class="tagline">Better Evidence. Safer Devices. A Healthier Tomorrow.</span>
</div>

    `
  },

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
