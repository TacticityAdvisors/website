/* ============================================================
   CAREERS — open positions
   ------------------------------------------------------------
   To post a new opening: copy one { ... } block below, paste it
   inside the list, and edit the text. To close a role, delete its
   block (or set  open: false ). Save, commit and push; the careers
   page updates itself. Roles appear in the order listed here.

   Fields
     id          short unique slug, lowercase-with-dashes (used in links)
     title       job title
     team        which part of the firm, e.g. "Regulatory Affairs",
                 "Business Development", "Technology", "HR"
                 (optional, shown as the first tag)
     location    e.g. "Balewadi, Pune (in office)"
     type        e.g. "Full-time", "Internship, 6 months"
     experience  short note shown as a tag, e.g. "Freshers welcome"
                 (optional)
     stipend     e.g. "₹15,000 / month" (optional, shown as a tag)
     posted      date posted, YYYY-MM-DD
     summary     one or two sentences shown on the card
     sections    the full job description: each has a heading and
                 either "text" (a paragraph) or "points" (a bullet list)
     open        true to show the role, false to hide it
   ============================================================ */
window.CAREERS_OPENINGS = [

  /* ---------------- FULL-TIME ---------------- */
  {
    id: 'regulatory-affairs-full-time',
    title: 'Regulatory Affairs – Medical Devices (Full-Time)',
    team: 'Regulatory Affairs',
    location: 'Balewadi, Pune (in office)',
    type: 'Full-time',
    experience: 'Medical device RA experience required',
    posted: '2026-11-25',
    summary: 'Work directly with the founder on FDA submissions for medical devices. You will research regulatory pathways, review test data, help draft parts of submissions and join client calls.',
    sections: [
      {
        heading: 'Who should apply',
        points: [
          'Hands-on experience in medical device regulatory affairs is required. Work on an FDA submission (510(k), De Novo or PMA) is a plus.',
          'Well spoken in English, outspoken and confident with new people',
          'Eager to learn and open to feedback',
          'Degree in Life Sciences, Biomedical Engineering, Biotechnology, Pharmacy or Engineering'
        ]
      },
      {
        heading: 'What you will gain',
        points: [
          'Learn how medical devices get approved by the U.S. FDA, from a former FDA reviewer',
          'Hands-on submission work and real client exposure',
          'Room to grow with the company as it expands'
        ]
      },
      {
        heading: 'Details',
        text: 'Full-time role | Office in Balewadi, Pune'
      }
    ],
    open: true
  },

  {
    id: 'business-development-founders-office-full-time',
    title: 'Business Development – Founder’s Office (Full-Time)',
    team: 'Business Development',
    location: 'Balewadi, Pune (in office)',
    type: 'Full-time',
    experience: 'MedTech background required',
    posted: '2026-11-25',
    summary: 'Work directly with the founder to grow the company. You will speak with clients, build relationships, research the MedTech market and prepare short reports and presentations.',
    sections: [
      {
        heading: 'Who should apply',
        points: [
          'Well spoken in English and confident with new people',
          'Outgoing, eager to learn, and able to take ownership',
          'Comfortable with Excel and PowerPoint',
          'Background in medical devices / MedTech is required. Experience in business development, marketing or sales is a plus.'
        ]
      },
      {
        heading: 'What you will gain',
        points: [
          'Work directly with the founder and get real client exposure',
          'Learn how medical devices get approved by the U.S. FDA',
          'Room to grow with the company as it expands'
        ]
      },
      {
        heading: 'Details',
        text: 'Full-time role | Office in Balewadi, Pune'
      }
    ],
    open: true
  },

  /* ---------------- INTERNSHIPS ---------------- */
  {
    id: 'regulatory-affairs-intern',
    title: 'Regulatory Affairs Intern – Medical Devices',
    team: 'Regulatory Affairs',
    location: 'Balewadi, Pune (in office)',
    type: 'Internship, 6 months',
    experience: 'Prior medical device work',
    posted: '2026-11-25',
    summary: 'Work directly with the founder on FDA submissions for medical devices: research regulatory pathways, review test data, help draft parts of submissions and join client calls, with some business development alongside.',
    sections: [
      {
        heading: 'About the role',
        text: 'Work directly with the founder on FDA submissions for medical devices. You will research regulatory pathways, review test data, help draft parts of submissions and join client calls. The role also includes some business development, such as speaking with clients and building relationships.'
      },
      {
        heading: 'Who should apply',
        points: [
          'Past hands-on work with medical devices (job or internship) in regulatory, testing, quality or R&D',
          'Well spoken in English, outspoken and confident with new people',
          'Eager to learn and open to feedback',
          'Degree in Life Sciences, Biomedical Engineering, Biotechnology, Pharmacy or Engineering'
        ]
      },
      {
        heading: 'What you will gain',
        points: [
          'Learn how medical devices get approved by the U.S. FDA, from a former FDA reviewer',
          'Hands-on submission work and real client exposure',
          'The chance to learn every part of the regulatory work if you want to, from research and testing to FDA submissions',
          'Business development experience alongside regulatory work',
          'A full-time role based on performance, with room to grow as the company expands'
        ]
      },
      {
        heading: 'Details',
        text: '6-month internship | Office in Balewadi, Pune'
      }
    ],
    open: true
  },

  {
    id: 'business-development-intern-founders-office',
    title: 'Business Development Intern – Founder’s Office',
    team: 'Business Development',
    location: 'Balewadi, Pune (in office)',
    type: 'Internship, 6 months',
    experience: 'Students & freshers welcome',
    posted: '2026-11-25',
    summary: 'Work directly with the founder to grow the company. You will speak with clients, build relationships, research the MedTech market and prepare short reports and presentations.',
    sections: [
      {
        heading: 'Who should apply',
        points: [
          'Well spoken in English and confident with new people',
          'Outgoing, eager to learn, and able to take ownership',
          'Comfortable with Excel and PowerPoint',
          'Students and freshers are welcome. Experience in business development, marketing or sales is a plus.'
        ]
      },
      {
        heading: 'What you will gain',
        points: [
          'Work directly with the founder and get real client exposure',
          'Learn how medical devices get approved by the U.S. FDA',
          'A full-time role based on performance, with room to grow as the company expands'
        ]
      },
      {
        heading: 'Details',
        text: '6-month internship | Office in Balewadi, Pune'
      }
    ],
    open: true
  },

  {
    id: 'data-scientist-ml-engineer-intern',
    title: 'Data Scientist / Machine Learning Engineer Intern',
    team: 'Technology',
    location: 'Balewadi, Pune (in office)',
    type: 'Internship, 6 months',
    experience: 'Students & freshers welcome',
    posted: '2026-11-25',
    summary: 'Use data and AI to make Tacticity’s work faster and smarter. You will work directly with the founder to clean and analyse data, build and test machine learning models, and turn the results into clear insights and useful tools.',
    sections: [
      {
        heading: 'Who should apply',
        points: [
          'Degree in Computer Science, Data Science, Statistics, Mathematics, Engineering or a related field',
          'Students and freshers are welcome. Internships, research or strong academic projects are a plus',
          'Strong Python skills (Pandas, NumPy, Scikit-learn) and good SQL',
          'Good grasp of statistics and core machine learning methods, such as regression, decision trees and clustering',
          'Able to show results with clear charts (Matplotlib, Power BI, Tableau or similar)',
          'Well spoken in English and able to explain technical results to non-technical people',
          'Experience with deep learning, NLP or large language models (Hugging Face, LangChain, RAG) is a plus'
        ]
      },
      {
        heading: 'What you will gain',
        points: [
          'Work directly with the founder and own real work from day one',
          'Learn how medical devices get approved by the U.S. FDA',
          'A full-time role based on performance, with room to grow as the company expands'
        ]
      },
      {
        heading: 'Details',
        text: '6-month internship | Office in Balewadi, Pune'
      },
      {
        heading: 'When you apply',
        text: 'Add a link to your GitHub, Kaggle or project portfolio in the application form.'
      }
    ],
    open: true
  },

  {
    id: 'full-stack-developer-intern',
    title: 'Full Stack Developer Intern',
    team: 'Technology',
    location: 'Balewadi, Pune (in office)',
    type: 'Internship, 6 months',
    experience: 'Students & freshers welcome',
    posted: '2026-11-25',
    summary: 'Build the websites and tools that help Tacticity grow. You will work directly with the founder on our website, client-facing tools and internal systems, across both the front end and the back end.',
    sections: [
      {
        heading: 'Who should apply',
        points: [
          'Degree in Computer Science, IT or a related field, or equivalent practical experience',
          'Students and freshers are welcome. Internships or personal projects are a plus',
          'Good with JavaScript/TypeScript, HTML and CSS, and a front-end framework (React preferred)',
          'Working knowledge of a back-end language (Node.js, Python or Java), SQL databases and REST APIs',
          'Comfortable with Git, and able to learn new tools quickly',
          'Well spoken in English and able to explain technical work to non-technical people',
          'Cloud (AWS, GCP or Azure), Docker or AI tools experience, or a GitHub/portfolio of live projects, is a plus'
        ]
      },
      {
        heading: 'What you will gain',
        points: [
          'Work directly with the founder and own real work from day one',
          'Learn how medical devices get approved by the U.S. FDA',
          'A full-time role based on performance, with room to grow as the company expands'
        ]
      },
      {
        heading: 'Details',
        text: '6-month internship | Office in Balewadi, Pune'
      },
      {
        heading: 'When you apply',
        text: 'Add a link to your GitHub or portfolio in the application form.'
      }
    ],
    open: true
  },

  {
    id: 'hr-intern',
    title: 'HR Intern',
    team: 'HR',
    location: 'Balewadi, Pune (in office)',
    type: 'Internship, 6 months',
    experience: 'Freshers welcome',
    stipend: '₹15,000 / month',
    posted: '2026-11-25',
    summary: 'Own the HR work of a growing company from day one: company policies, attendance and leave, monthly salary working, and hiring.',
    sections: [
      {
        heading: 'About the role',
        text: 'Own the HR work of a growing company from day one. You will draft and update company policies, make sure rules and regulations are followed, keep a check on employee attendance, leave and timings, and take care of the monthly salary working. You will also run hiring: posting jobs, going through CVs, scheduling interviews and talking to candidates.'
      },
      {
        text: 'This is a small team, so you will not be one of many interns. You will work with the founder, own real HR work, and see your policies and decisions used across the company.'
      },
      {
        heading: 'Who should apply',
        points: [
          'Well spoken in English and confident talking to people',
          'Organised, disciplined and good at following up',
          'Comfortable with Excel, Google Sheets and email',
          'Freshers are welcome. A background in HR or an MBA/BBA is a plus.',
          'Students can apply if your college allows a 6-month full-time internship.'
        ]
      },
      {
        heading: 'What you will gain',
        points: [
          'Hands-on experience across the full HR role, not one small part of it',
          'Policy writing, payroll working and hiring on your CV within six months',
          'A chance to convert to a full-time role after 6 months, based on performance'
        ]
      },
      {
        heading: 'Details',
        text: '6-month internship | ₹15,000 per month stipend | In person, office in Balewadi, Pune'
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
