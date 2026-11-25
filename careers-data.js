/* ============================================================
   CAREERS — open positions
   ------------------------------------------------------------
   To post a new opening: copy one { ... } block below, paste it
   inside the list, and edit the text. To close a role, delete its
   block (or set  open: false ). Save, commit and push; the careers
   page updates itself.

   Fields
     id          short unique slug, lowercase-with-dashes (used in links)
     title       job title
     team        which part of the firm, e.g. "Regulatory Science",
                 "Investments", "Business Development", "Operations",
                 "Marketing" (optional, shown as the first tag)
     location    e.g. "Pune, India (on-site)"
     type        e.g. "Full-time", "Internship"
     experience  e.g. "0–2 years"
     posted      date posted, YYYY-MM-DD
     summary     one or two sentences shown on the card
     sections    the full job description: each has a heading and
                 either "text" (a paragraph) or "points" (a bullet list)
     open        true to show the role, false to hide it

   Note: the first block below is an EXAMPLE. Replace it with
   your real opening before publishing.
   ============================================================ */
window.CAREERS_OPENINGS = [
  {
    id: 'regulatory-affairs-associate',
    title: 'Regulatory Affairs Associate, Medical Devices',
    team: 'Regulatory Science',
    location: 'Pune, India (on-site)',
    type: 'Full-time',
    experience: '0–2 years',
    posted: '2026-11-25',
    summary: 'Help medical device companies prepare their U.S. FDA submissions, from biocompatibility strategy to 510(k) packages, working closely with a former FDA CDRH lead reviewer.',
    sections: [
      {
        heading: 'About the role',
        text: 'You will join a small team that helps medical device, IVD and SaMD companies get through U.S. FDA review. Most of the work is building the scientific case for a device: deciding what evidence it needs, checking that the evidence holds up, and writing it so that a reviewer can follow the reasoning. You will work on live client projects and learn the review process from someone who has done it at FDA.'
      },
      {
        heading: 'What you will do',
        points: [
          'Draft sections of 510(k), De Novo and Q-Submission packages, including eSTAR submissions',
          'Prepare biological evaluation plans and biocompatibility assessments under ISO 10993',
          'Review CRO test protocols and reports for scientific soundness and fit with FDA expectations',
          'Research FDA guidance documents, recognized consensus standards and predicate devices',
          'Help draft responses to FDA Additional Information requests and deficiency letters'
        ]
      },
      {
        heading: 'What you will learn',
        points: [
          'How an FDA reviewer reads a submission, and where arguments usually fail',
          'How to match testing to a device’s actual risks instead of running tests by convention',
          'How to write a technical argument that holds up to expert review'
        ]
      },
      {
        heading: 'What we are looking for',
        points: [
          'A degree in biomedical engineering, polymer science, chemistry, pharmacy, life sciences or a related field',
          'Clear, precise written English: much of this job is technical writing',
          'Comfort reading scientific papers, standards and regulatory guidance',
          'Care with detail, and the habit of asking why'
        ]
      },
      {
        heading: 'Good to have',
        points: [
          'Exposure to ISO 10993, ISO 14971, chemical characterization (E&L) or FDA guidance documents',
          'Internship or project work with a medical device company, testing laboratory or CRO'
        ]
      }
    ],
    open: true
  }
];

/* Where applications are sent: FormSubmit (formsubmit.co) emails every
   application, with the resume attached, to the careers inbox.
   Use formsubmit.co/<email>, not a FormSubmit "Email Link"
   (formsubmit.co/el/...), which cannot receive this form.
   See careers.html. */
window.CAREERS_FORM_ENDPOINT = 'https://formsubmit.co/careers@tacticityadvisors.com';
