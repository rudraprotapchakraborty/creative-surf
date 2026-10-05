import { defineMessages } from "../types";
import { cvTeaserMessages } from "./cvTeaser";

export const cvBuilderMessages = defineMessages("cvBuilder", {
  en: {
    metaTitle: "Free AI CV Builder — ATS-Friendly | Creative Surf",
    metaDescription:
      "Turn rough notes into a recruiter-ready CV. Paste the job advert, see which requirements you have covered, and download a free ATS-safe PDF. We never invent employers, dates or numbers.",
    hero: {
      ...cvTeaserMessages.en.hero,
      badge: "Free · No sign-up",
      ctaSecondary: "See a sample CV",
      sampleTitle: "Sample CV — a fictional candidate",
    },
    stats: [
      { value: "~60s", label: "From rough notes to a finished PDF" },
      { value: "0", label: "Paywalls between you and your download" },
      { value: "6", label: "Languages your CV can be written in" },
    ],
    import: {
      title: "Already have a CV?",
      subtitle:
        "Upload a PDF or Word (.docx) file to see its ATS score straight away. We'll fill in the form too, so improving it is one click.",
      button: "Upload CV",
      reading: "Reading your CV…",
      success: "Your CV is in the preview with its ATS score, and the form is filled in. Generate to get an improved version.",
      failed: "We couldn't read that CV. Try another file, or fill the form in by hand.",
    },
    guestNotice: {
      title: "You're building without an account",
      subtitle: "Build and download your CV without signing in — It won't be filed under an account, so you won't be able to reopen it later. A free account keeps your CVs in one place.",
      login: "Log in",
      register: "Create free account",
    },
    builder: {
      eyebrow: "The builder",
      title: "Three passes,",
      highlight: "one finished CV",
      description:
        "Fill in what you can remember. Rough notes are the point — turning them into proper CV language is our job, not yours.",
    },
    sections: {
      basics: "About you",
      basicsHint: "Your name, the role you are aiming at, and how a recruiter reaches you.",
      background: "Your background",
      backgroundHint: "Half-sentences and typos are fine. Detail matters far more than polish.",
      tailoring: "Target & tone",
      tailoringHint: "Paste the advert here to unlock the match score.",
      links: "Links (optional)",
      photo: "Photo (optional)",
      photoAdd: "Upload a photo",
      photoChange: "Replace photo",
      photoRemove: "Remove",
      photoReading: "Preparing…",
      photoFailed: "That photo could not be read. Try another file.",
      photoTooLarge: "That photo is too large. Try a smaller image.",
      photoHint:
        "A headshot is expected on a CV in much of Europe, Asia and Latin America, and screened out before a human sees it in the UK, the US and Canada. Leave it empty if you are applying there.",
      languages: "Languages (optional)",
      languageName: "Language",
      languageLevel: "Level",
      languageAdd: "Add another language",
      languageRemove: "Remove this language",
      languagePlaceholder: "English",
      languagesHint:
        "Your level goes into the CV exactly as you set it here — we never round it up to suit the advert.",
      linkLabel: "Link",
      linkType: "Type",
      linkAdd: "Add another link",
      linkRemove: "Remove this link",
      linksHint:
        "Paste a link — LinkedIn, GitHub, your own site, anything. Pick what it is from the list beside it. An “Other” link is named in your CV after the site it points to, so paste the full address rather than just a username.",
    },
    fields: {
      fullName: { label: "Full name", placeholder: "Alex Morgan" },
      jobTitle: { label: "Target role or current title", placeholder: "Senior Frontend Engineer" },
      email: { label: "Email", placeholder: "alex@example.com" },
      phone: { label: "Phone", placeholder: "+44 7700 900123" },
      location: { label: "Location", placeholder: "London, UK" },
      yearsExperience: { label: "Years of experience", placeholder: "6" },
      workHistory: {
        label: "Work history",
        placeholder:
          "Frontend Engineer at Northwind, 2021-now. Rebuilt the checkout, cut load time roughly in half, mentored two juniors.\n\nJunior Developer at Belltower, 2019-2021. Built internal dashboards in React.",
        hint: "Rough notes are fine — one role per paragraph, with dates if you have them.",
      },
      education: {
        label: "Education",
        placeholder: "BSc Computer Science, University of Leeds, 2015-2019",
      },
      skills: {
        label: "Skills",
        placeholder: "React, TypeScript, Node.js, Figma, team leadership, stakeholder comms",
      },
      targetJob: {
        label: "Target job description",
        placeholder: "Paste the job advert you're applying for…",
        hint: "Optional, but this is where the tool earns its keep — paste an advert and we score your CV against it.",
      },
      tone: { label: "Tone" },
      language: { label: "CV language" },
      effort: { label: "Effort" },
    },
    languageLevels: {
      native: "Native",
      fluent: "Fluent",
      professional: "Professional",
      intermediate: "Intermediate",
      basic: "Basic",
    },
    linkTypes: {
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfolio",
      other: "Other",
    },
    linkPlaceholders: {
      linkedin: "linkedin.com/in/alexmorgan",
      github: "github.com/alexmorgan",
      portfolio: "alexmorgan.dev",
      scholar: "scholar.google.com/citations?user=…",
      orcid: "orcid.org/0000-0002-1825-0097",
      behance: "behance.net/alexmorgan",
      researchgate: "researchgate.net/profile/Alex-Morgan",
      kaggle: "kaggle.com/alexmorgan",
      leetcode: "leetcode.com/u/alexmorgan",
      medium: "medium.com/@alexmorgan",
      other: "dribbble.com/alexmorgan",
    },
    efforts: {
      high: "High",
      low: "Low",
    },
    tones: {
      professional: "Professional",
      concise: "Concise",
      impact: "Impact-driven",
    },
    actions: {
      generate: "Generate my CV",
      generating: "Writing your CV…",
      regenerate: "Regenerate",
      download: "Download PDF",
      view: "View",
      startOver: "Clear form",
    },
    wizard: {
      label: "Steps",
      stepOf: "Step {current} of {total}",
      back: "Back",
      next: "Next",
      nextTo: "Next: {step}",
      filled: "Filled in",
      add: "Add",
      jump: "Go to step {n}: {step}",
      short: { basics: "About you", profiles: "Links", experience: "Experience", education: "Education", target: "Target" },
      profiles: "Links & languages",
      profilesHint: "Where a recruiter can see your work, and the languages you work in. Both optional — skip ahead if you have neither.",
      experience: "Experience",
      experienceHint: "Every role you want on the page. Half-sentences and typos are fine — detail matters far more than polish.",
      education: "Education & skills",
      educationHint: "Degrees and courses, then the tools and strengths you would happily be tested on.",
      ready: "Ready when you are",
      readyHint: "Everything else is optional. Generate now, or add the advert first for a sharper CV and a match score.",
    },
    progress: {
      label: "Detail so far",
      hint: "The more you give us, the less we have to leave out.",
    },
    saved: {
      title: "Your saved CVs",
      subtitle: "Every CV you generate is kept here, so you can hold one version per application.",
      empty: "Nothing saved yet — your first CV will appear here.",
      load: "Open",
      remove: "Delete",
      confirm: "Delete this saved CV? This cannot be undone.",
    },
    preview: {
      title: "Preview",
      placeholderTitle: "Your CV will appear here",
      placeholderSubtitle: "Fill in your details on the left and click 'Generate my CV' to see your live preview.",
      loading: "Drafting your CV. This usually takes 5-15 seconds.",
      downloadHint: "Choose “Save as PDF” in the print dialog to keep a copy. It prints as real, selectable text.",
    },
    ats: {
      title: "ATS readiness",
      caption: "{passed} of {total} checks cleared",
      tiers: { strong: "ATS-ready", good: "Nearly there", weak: "Needs work" },
      tierHints: {
        strong: "A tracking system can read every part of this CV. Nothing here is holding you back.",
        good:
          "Readable, but the points below are where CVs quietly lose marks. Fix what you can and regenerate.",
        weak:
          "An applicant tracking system will struggle with this. Work through the failures below — most are solved by adding detail to your notes.",
      },
      note:
        "This grades the mechanics a recruiting system reads first: structure, dates, numbers, contact details. It is a different question from the advert match, and a CV can do well on one and badly on the other.",
      checks: {
        contact: {
          label: "Contact details are complete",
          fix: "Add your phone number and location — a parser looks for both in the header.",
        },
        profileLinks: {
          label: "At least one profile link",
          fix: "Add a LinkedIn, personal website or GitHub link above. Most recruiters open one before they call.",
        },
        headline: {
          label: "Short, specific headline",
          fix: "The headline is missing or too long to scan. A tighter target role in the form fixes it.",
        },
        summary: {
          label: "Summary is the right length",
          fix: "Aim for 25 to 130 words. Shorter says nothing; longer gets skipped.",
        },
        experienceDepth: {
          label: "Every role has enough detail",
          fix:
            "Some roles carry fewer than three bullets. Add more of what you did there to your work history.",
        },
        dates: {
          label: "Every role is dated",
          fix: "A role without dates is a role a parser cannot place. Add years to your work history.",
        },
        metrics: {
          label: "Achievements are measurable",
          fix:
            "Too few bullets contain a number. Add team sizes, percentages, budgets or timeframes you genuinely remember.",
        },
        bulletLength: {
          label: "Bullets are a readable length",
          fix: "Several bullets are very short or run long. Six to thirty words each reads best.",
        },
        skills: {
          label: "Skills are grouped and specific",
          fix: "List more skills, and enough of them to fall into at least two groups.",
        },
        firstPerson: {
          label: "Written without “I” and “my”",
          fix: "A CV reads in the implied first person. Regenerating usually clears this.",
        },
        length: {
          label: "Overall length is right",
          fix:
            "Aim for roughly 300 to 850 words. Add detail to your notes if it is thin, trim it if it runs long.",
        },
      },
    },
    match: {
      title: "Advert match",
      lockedTitle: "Match score locked",
      lockedBody:
        "Paste the job advert into “Target & tone” and we'll score this CV against what that employer actually asked for.",
      ungradedTitle: "Not graded this time",
      ungradedBody:
        "We couldn't grade this CV against the advert just now. Regenerating usually fixes it — and a score we can't stand behind is worse than none.",
      caption: "{matched} of {total} key terms from the advert appear in your CV",
      tiers: {
        strong: "Strong match",
        good: "Decent match",
        weak: "Needs work",
      },
      tierHints: {
        strong: "This CV is speaking the advert's language. Download it and send it.",
        good: "Close. If anything below is genuinely yours, add it to your notes and regenerate.",
        weak: "The advert is asking for things your notes never mention. Add whatever you have genuinely done, then regenerate.",
      },
      matchedLabel: "Covered",
      missingLabel: "Not covered yet",
      honestNote:
        "We will not add these for you. If it isn't in your notes, it doesn't go in your CV — that is the whole point.",
    },
    errors: {
      required: "Please add your name, target role, and email.",
      email: "Please enter a valid email address.",
      background: "Please add at least your work history, education, or skills.",
      generic: "Something went wrong. Please try again.",
    },
    cv: {
      summary: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certifications",
      languages: "Languages",
    },
    tips: {
      title: "Getting a better result",
      items: [
        "Include numbers where you have them — team sizes, budgets, percentages, timeframes.",
        "Write one paragraph per role, and include the dates so the timeline is right.",
        "Paste the advert you're applying for so the CV leads with what that employer asks for.",
        "We never invent employers, dates, or results — the more you give us, the stronger the CV.",
      ],
    },
    why: {
      eyebrow: "Why this one",
      title: "Plenty of tools will write you a CV.",
      highlight: "Very few will keep it true.",
      description:
        "We built this for the moment after you hit download — when a recruiter asks you to talk through the CV you sent them.",
      cards: [
        {
          title: "It won't invent your career",
          body:
            "Most AI will happily hand you a 47% uplift you never achieved. Ours is instructed to use only what you typed: no invented employers, dates, degrees or metrics. Every line is one you can defend in the room.",
        },
        {
          title: "It writes the document, not just the sentences",
          body:
            "Grammar assistants improve text you have already written. You still have to structure a CV, choose the sections and decide what belongs. That is the part we do — rough notes in, an ordered, finished CV out.",
        },
        {
          title: "It answers the advert in front of you",
          body:
            "Paste the job description and the CV is reordered and reworded around it. Then we score the result and name the requirements you haven't covered yet, so you know before the recruiter does.",
        },
        {
          title: "The PDF is free, and it's real text",
          body:
            "No export fee, no watermark, no 'upgrade to download'. It prints as selectable vector text in a single-column layout with no tables or text boxes — the things that usually break an applicant tracking system.",
        },
        {
          title: "Six languages, one career",
          body:
            "Write the same CV in English, French, German, Spanish, Arabic or Bengali, independently of the language you are browsing in. Useful when you are applying across Europe, the Gulf and South Asia rather than in one market.",
        },
        {
          title: "There are real people behind it",
          body:
            "We are a working agency, not an anonymous subscription. Your CVs stay in your account so you can hold one version per application, and there is a real team on the other end of the contact form.",
        },
      ],
    },
    honesty: {
      eyebrow: "The difference in one example",
      title: "Rough note in.",
      highlight: "Honest CV out.",
      description:
        "The same handful of words, handled three ways. This is the entire argument for using this instead of a general chatbot.",
      typedLabel: "What you actually typed",
      typedBody: "Worked on the checkout at Northwind, made it faster, helped two juniors.",
      genericLabel: "What a general AI tends to write",
      genericBody:
        "Drove a 47% increase in checkout conversion and led a team of 8 engineers, delivering $2M in incremental annual revenue.",
      genericNote: "Numbers you never gave it. You will be asked about them.",
      oursLabel: "What we write",
      oursBody:
        "Rebuilt the Northwind checkout, cutting load time and smoothing the path to purchase. Mentored two junior developers through their first production releases.",
      oursNote: "Sharper wording, identical facts. Nothing here can catch you out.",
    },
    compare: {
      eyebrow: "An honest comparison",
      title: "Where we fit —",
      highlight: "and where we don't",
      description:
        "Writing assistants and general chatbots are good tools. They are just not CV builders. Here is the difference, plainly.",
      feature: "What you need",
      columns: {
        us: "Creative Surf",
        assistant: "Writing assistants",
        chatbot: "General AI chat",
        sites: "Typical CV sites",
      },
      rows: [
        {
          label: "Turns rough notes into a finished CV",
          us: "Yes",
          assistant: "No — it edits text you wrote",
          chatbot: "If you prompt it well",
          sites: "You still write every line",
        },
        {
          label: "Gives you a laid-out, print-ready document",
          us: "Yes",
          assistant: "No",
          chatbot: "Chat text you format yourself",
          sites: "Yes",
        },
        {
          label: "Rewrites the CV around a specific advert",
          us: "Yes",
          assistant: "No",
          chatbot: "Only if you ask, every time",
          sites: "Rarely",
        },
        {
          label: "Scores your CV against that advert",
          us: "Yes, with the gaps named",
          assistant: "No",
          chatbot: "No",
          sites: "Usually a paid add-on",
        },
        {
          label: "Refuses to invent metrics and employers",
          us: "By design",
          assistant: "Doesn't write for you",
          chatbot: "Invents freely",
          sites: "Depends on the engine",
        },
        {
          label: "PDF download",
          us: "Free",
          assistant: "Not applicable",
          chatbot: "Not applicable",
          sites: "Often behind a payment",
        },
        {
          label: "CV written in six languages",
          us: "Yes",
          assistant: "English-first",
          chatbot: "Yes",
          sites: "Usually one",
        },
        {
          label: "Keeps a saved version per application",
          us: "Yes",
          assistant: "No",
          chatbot: "No",
          sites: "On paid plans",
        },
      ],
      note:
        "To be fair to them: Grammarly is very good at catching the sentence you fumbled, and we would happily run a CV through it afterwards. It simply isn't trying to build the document, and it will never tell you what the advert asked for.",
    },
    how: {
      eyebrow: "How it works",
      title: "Five minutes of typing,",
      highlight: "then it's ours",
      description: "No template picking, no drag-and-drop, no twelve-step wizard.",
      steps: [
        {
          title: "Dump what you remember",
          body:
            "One paragraph per job, with dates if you have them. Typos don't matter. This is the only part that is on you, and it takes about five minutes.",
        },
        {
          title: "Paste the advert",
          body:
            "Optional, but it is where the tool earns its keep. The CV gets reordered and reworded around what that employer actually asked for.",
        },
        {
          title: "Close the gaps, then download",
          body:
            "We name the requirements your CV hasn't covered. Add anything genuinely yours, regenerate, and save the PDF straight from your browser.",
        },
      ],
    },
    faq: {
      eyebrow: "Straight answers",
      title: "Questions",
      highlight: "worth asking",
      items: [
        {
          q: "Is it really free?",
          a: "Yes. You need a free account so your CVs are saved and you can come back to them, but there is no paid tier standing between you and the PDF, and no watermark on the download.",
        },
        {
          q: "How is this different from asking a chatbot to write my CV?",
          a: "Two things. A chatbot hands you text in a chat window that you still have to lay out, and it will happily invent numbers to make you sound impressive. This hands you a finished, printable document, and it is constrained to the facts you supplied.",
        },
        {
          q: "Isn't Grammarly enough?",
          a: "Grammarly checks the writing. It doesn't decide what belongs in a CV, order your roles, tailor you to an advert, score you against it, or hand you a PDF. Use it after this if you like — the two aren't really competing.",
        },
        {
          q: "Will the CV get through applicant tracking systems?",
          a: "The PDF is a single-column layout of real, selectable text — no tables, no columns, no images or text boxes, which is what usually breaks a parser. Paste the advert as well and we will show you which of its terms your CV is still missing.",
        },
        {
          q: "Can I change it afterwards?",
          a: "Yes. Edit your notes and regenerate as often as you like, or download the PDF and open it in any editor. Each generated CV is saved to your account, so nothing is lost when you try a different angle.",
        },
        {
          q: "What happens to what I type?",
          a: "Your notes and finished CVs are stored against your account so you can reopen them later, and you can delete any of them from the builder at any time. They are sent to an AI provider only to write your CV.",
        },
      ],
    },
    finalCta: {
      title: "Five minutes of notes,",
      highlight: "one CV you can defend",
      description:
        "You will leave with a PDF you can send today — and nothing in it you would rather a recruiter didn't ask about.",
      primary: "Build my CV",
      secondary: "Talk to a human",
    },
  },
});
