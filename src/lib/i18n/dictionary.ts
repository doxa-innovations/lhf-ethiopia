// Translation dictionary for LHF Ethiopia.
//
// Translation quality notes for the LHF Ethiopia team:
//  - English (en) is the source of truth.
//  - Amharic (am) translations are first-pass; please review with a native
//    Amharic speaker before launch.
//  - Afaan Oromoo (om) translations are placeholder-quality and need
//    native-speaker review.
//
// Add new strings by extending `en` first, then mirroring in `am` and `om`.
// Long-form content stored in `src/lib/content.ts` arrays (STORIES, PROJECTS,
// EVENTS, NEWS, PUBLICATIONS) currently remains English — translating those
// arrays per locale is the next pass once the editorial team is ready.

export const LOCALES = ["en", "am", "om"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, { short: string; native: string; english: string }> = {
  en: { short: "EN", native: "English", english: "English" },
  am: { short: "አማ", native: "አማርኛ", english: "Amharic" },
  om: { short: "OM", native: "Afaan Oromoo", english: "Afaan Oromoo" },
};

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      publications: "Publications",
      podcast: "Podcast",
      projects: "Projects",
      events: "Events",
      stories: "Stories",
      news: "News",
      contact: "Contact",
      donate: "Donate",
      donateLong: "Donate to LHF Ethiopia",
    },
    common: {
      readMore: "Read more",
      learnMore: "Learn more",
      seeAll: "See all",
      seeAllArrow: "All updates →",
      sponsor: "Sponsor a book",
      sponsorProject: "Sponsor this project",
      sponsorShow: "Support the show",
      browse: "Browse the library",
      watch: "Watch",
      listen: "Listen",
      subscribe: "Subscribe on YouTube",
      requestBook: "Request a copy",
      requestLanguage: "Request a language",
      adoptProject: "Adopt a project",
      adoptTranslation: "Adopt a translation",
      partnersLabel: "Partners & supporters",
      free: "Books distributed free of charge — never sold.",
      sectionEpisodes: "Episodes",
      sectionLatest: "Latest",
      sectionUpcoming: "Upcoming",
      sectionPast: "Recently held",
      sectionImpact: "Impact",
      sectionLanguages: "Heart languages",
      sectionWhatWeDo: "What we do",
      sectionWhatWeBelieve: "What we believe",
      sectionStories: "Stories",
      sectionDigitalOutreach: "Digital outreach on YouTube",
      tagWordAtWork: "The Word at work in Ethiopia",
      languageLabel: "Language",
      sendMessage: "Send a message",
      open: "Open for adoption",
      raised: "Raised",
      ofGoal: "of {goal} goal",
      reserveSpot: "Reserve a spot",
      seePodcast: "See the podcast",
    },
    home: {
      heroTitlePart1: "The Gospel,",
      heroTitleEm: "in every heart language",
      heroTitlePart2: "of Ethiopia.",
      heroCtaPrimary: "Sponsor a book",
      heroCtaSecondary: "Watch on YouTube",
      statLanguages: "Heart languages",
      statBooks: "Books distributed",
      statCongregations: "Congregations supplied",
      statEpisodes: "Podcast episodes live",
      whatWeDoTitle: "Translate. Print. Distribute. Free of charge.",
      whatWeDoBody:
        "Lutheran congregations across Ethiopia ask for one thing again and again — solid Christian books they can actually read. LHF Ethiopia closes that gap, language by language.",
      translation: "Translation",
      translationBody:
        "Ethiopian pastors and theological reviewers render Luther's catechism, Bible stories, and devotionals into Amharic, Afaan Oromoo, Tigrinya, and more.",
      printing: "Printing",
      printingBody:
        "Books are printed locally in Addis Ababa whenever possible, supporting Ethiopian presses and shrinking the time from manuscript to congregation.",
      distribution: "Distribution",
      distributionBody:
        "We deliver to congregations, Sunday schools, and pastoral training centers countrywide — and they receive every title at no cost.",
      podcastTagline: "Sola Scriptura. Bible study in Amharic and English.",
      moreEpisodes: "More recent episodes",
      allEpisodes: "All episodes",
      impactTitle: "The Word, multiplying.",
      impactBody:
        "Real distribution data — every copy counted, broken down by language and year. We update these numbers monthly.",
      languagesTitle: "Six languages today. More on the way.",
      languagesBody:
        "Ethiopia is home to 90+ languages. We add a new heart language whenever donors, translators, and a partner congregation come together.",
      fullLibrary: "Full library",
      eventsTitle: "Events & gatherings",
      eventsBody:
        "Distribution days, pastor trainings, and live podcast recordings across Ethiopia.",
      allEvents: "All events →",
      storiesTitle: "A Lutheran library, one face at a time.",
      storiesBody:
        "Translators, pastors, Sunday school teachers, and congregation members carry these books into real life.",
      readStories: "Read the stories",
      valuesTitle: "Bible-based. Christ-centered. Reformation-driven.",
      ctaTitle: "$7 prints a catechism. $1,200 opens a new language.",
      ctaBody:
        "Every project on our list is a real congregation, a real translator, and a real shelf waiting to be filled.",
      ctaPrimary: "See projects needing adoption",
      ctaSecondary: "Give where most needed",
    },
    about: {
      label: "About",
      title: "A Lutheran library, built one heart language at a time.",
      intro:
        "LHF Ethiopia is the regional arm of the Lutheran Heritage Foundation — a US-based mission that has placed more than 6 million Bible-rooted books into the hands of Lutheran congregations in nearly 100 countries. In Ethiopia, we work shoulder to shoulder with local pastors, translators, and printers to do the same thing here.",
      storyLabel: "Our story",
      storyTitle: "Why Ethiopia. Why now.",
      storyP1:
        "Lutheran congregations have been part of Ethiopia's story since the 19th century. Today, more than 11 million Ethiopians worship in Lutheran parishes — and most of them have never held a copy of Luther's Small Catechism in the language they think and pray in.",
      storyP2:
        "LHF Ethiopia exists to change that. We translate, print, and distribute confessional Lutheran books — at no cost to the congregation, the pastor, or the family that receives them.",
      numbersLabel: "By the numbers",
      numbersTitle: "A measurable mission.",
      convictionsLabel: "What we hold to",
      convictionsTitle: "Four convictions that shape every project.",
      parentLabel: "Parent",
      parentTitle: "Lutheran Heritage Foundation",
      parentBody:
        "LHF is a Recognized Service Organization of the Lutheran Church—Missouri Synod (LCMS), headquartered in Macomb, Michigan. Since 1992 LHF has translated Luther's Small Catechism into more than 150 languages and published over 2,000 titles. LHF Ethiopia carries that mission to the highlands and lowlands of Ethiopia.",
      visitLhf: "Visit LHF",
      getInTouch: "Get in touch",
    },
    publications: {
      label: "Publications",
      title: "The LHF Ethiopia library.",
      intro:
        "Catechisms, Bible-story books, devotionals, and confessional texts — already in print, in translation, or waiting on the next sponsor.",
      heartLanguagesTitle: "Languages we publish in.",
      catalogLabel: "Catalog",
      catalogTitle: "Titles in print and in progress.",
      noteFree:
        "Titles are distributed free of charge to congregations and pastors. To request a shipment for your parish or Sunday school, use the contact form.",
      missingLanguageTitle: "Don't see your language?",
      missingLanguageBody:
        "We open a new heart language whenever a congregation requests it and a sponsor steps forward. Tell us about your parish — and the language it prays in.",
      colTitle: "Title",
      colLanguage: "Language",
      colAudience: "Audience",
      colStatus: "Status",
    },
    podcast: {
      label: "Digital outreach on YouTube",
      hostedBy: "Hosted by",
      browseLabel: "Episodes",
      browseTitle: "Browse the archive",
      filterAll: "All",
      filterBibleStudy: "Bible Study",
      filterDoctrine: "Doctrine",
      filterCatechism: "Catechism",
      filterMusic: "Music",
      searchPlaceholder: "Search episodes, guests, topics…",
      resultsCount: "{n} episodes",
      resultsCountSingular: "{n} episode",
      noResults: "No episodes match that search.",
      hostBlockTitle: "Host",
    },
    projects: {
      label: "Adopt a project",
      title: "Choose where the books go.",
      intro:
        "Every project here is concrete: a translator, a print run, a parish, a Sunday school. Pick one and follow it from manuscript to congregation.",
      giveCta: "Give to most-needed",
      sponsorFullCta: "Sponsor a full project",
      need: "Need:",
      impact: "Impact:",
    },
    events: {
      label: "Events",
      title: "Show up. Take books home.",
      intro:
        "Quarterly distribution days, pastor trainings, book launches, and live podcast recordings. Most events are free and open to Lutheran clergy, teachers, and parish leaders.",
      upcomingTitle: "Next on the calendar",
      pastTitle: "Recently held",
      noUpcoming: "No upcoming events scheduled. Check back soon.",
    },
    stories: {
      label: "Stories",
      title: "In their own words.",
      intro:
        "Pastors, teachers, translators, deaconesses, and printers — the people whose hands these books pass through. Real congregations, real testimonies.",
      ctaTitle: "Your story could be next.",
      ctaBody:
        "If your parish has received books from LHF Ethiopia — or is waiting for them — tell us. We'd love to share what God is doing through you.",
      shareCta: "Share your story",
      helpMoreCta: "Help more stories happen",
    },
    news: {
      label: "News",
      title: "The Word at work.",
      intro:
        "Real updates from translation desks, print floors, and the congregations that receive these books.",
    },
    donate: {
      label: "Donate",
      title: "Send a book where it's needed most.",
      intro:
        "Every gift is converted directly into translated, printed, and distributed books — given away free to Ethiopian Lutheran congregations.",
      makeGiftTitle: "Make a gift",
      makeGiftBody: "Pick an amount or enter your own. Most donors give once a quarter.",
      customLabel: "Custom amount (USD)",
      nameLabel: "Full name",
      emailLabel: "Email",
      designateLabel: "Designate (optional)",
      designateHint: "E.g. 'Sidaama Catechism' or 'Where most needed'",
      noteLabel: "Note for the team",
      submitCta: "Continue to secure checkout",
      taxNote:
        "Payments are processed by LHF's US parent organization. US donors: tax-deductible to the fullest extent of the law.",
      allocationTitle: "Where your gift goes",
      allocationCaption: "Allocation of every dollar received in 2025.",
      otherWaysTitle: "Give another way",
      otherWaysMail:
        "By mail: Lutheran Heritage Foundation, 51474 Romeo Plank, Macomb, MI 48042, USA. Memo: Ethiopia.",
      otherWaysLocal:
        "In Ethiopia: contact our Addis office at",
      otherWaysLocalSuffix: "for local bank transfer details.",
    },
    contact: {
      label: "Contact",
      title: "Tell us about your congregation.",
      intro:
        "Request books, propose a new language, or just say hello. We read everything.",
      formTitle: "Send a message",
      nameLabel: "Name",
      roleLabel: "Role",
      emailLabel: "Email",
      phoneLabel: "Phone (optional)",
      parishLabel: "Congregation / city",
      languageLabel: "Language(s) needed",
      languageHint: "E.g. Amharic, Afaan Oromoo, Tigrinya, Sidaama…",
      messageLabel: "How can we help?",
      submitCta: "Send message",
      officeTitle: "LHF Ethiopia office",
      hoursTitle: "Office hours",
      hours: "Monday – Friday · 9:00 – 17:00 EAT\nSaturday – Sunday · closed",
      parentTitle: "Parent organization",
    },
    footer: {
      explore: "Explore",
      office: "Office",
      follow: "Follow",
      rights: "All rights reserved.",
    },
    languageModal: {
      title: "Choose your language",
      subtitle: "You can change this at any time from the navigation bar.",
      saveBtn: "Continue",
      hint: "We detected your browser language — pick what reads best.",
    },
  },

  am: {
    nav: {
      home: "መነሻ",
      about: "ስለ እኛ",
      publications: "ህትመቶች",
      podcast: "ፖድካስት",
      projects: "ፕሮጀክቶች",
      events: "ዝግጅቶች",
      stories: "ታሪኮች",
      news: "ዜናዎች",
      contact: "አግኙን",
      donate: "ይለግሱ",
      donateLong: "ለLHF ኢትዮጵያ ይለግሱ",
    },
    common: {
      readMore: "ተጨማሪ ያንብቡ",
      learnMore: "የበለጠ ይወቁ",
      seeAll: "ሁሉንም ይመልከቱ",
      seeAllArrow: "ሁሉም ዝመናዎች →",
      sponsor: "መጽሐፍ ይደግፉ",
      sponsorProject: "ይህን ፕሮጀክት ይደግፉ",
      sponsorShow: "ፕሮግራሙን ይደግፉ",
      browse: "ቤተ-መጻሕፍቱን ይዩ",
      watch: "ይመልከቱ",
      listen: "ያዳምጡ",
      subscribe: "በዩቲዩብ ይመዝገቡ",
      requestBook: "ቅጂ ይጠይቁ",
      requestLanguage: "ቋንቋ ይጠይቁ",
      adoptProject: "ፕሮጀክት ይምረጡ",
      adoptTranslation: "ትርጉም ይምረጡ",
      partnersLabel: "አጋሮች እና ደጋፊዎች",
      free: "መጻሕፍቱ በነጻ ይከፋፈላሉ — በፍጹም አይሸጡም።",
      sectionEpisodes: "ክፍሎች",
      sectionLatest: "የቅርብ ጊዜ",
      sectionUpcoming: "የሚመጡ",
      sectionPast: "ያለፉ",
      sectionImpact: "ተጽዕኖ",
      sectionLanguages: "የልብ ቋንቋዎች",
      sectionWhatWeDo: "የምንሰራው",
      sectionWhatWeBelieve: "የምናምነው",
      sectionStories: "ታሪኮች",
      sectionDigitalOutreach: "በዩቲዩብ ላይ የዲጂታል ሥርጭት",
      tagWordAtWork: "ቃሉ በኢትዮጵያ በስራ ላይ",
      languageLabel: "ቋንቋ",
      sendMessage: "መልዕክት ይላኩ",
      open: "ለድጋፍ ክፍት",
      raised: "የተሰበሰበ",
      ofGoal: "ከ{goal} ግብ",
      reserveSpot: "ቦታ ይያዙ",
      seePodcast: "ፖድካስቱን ይዩ",
    },
    home: {
      heroTitlePart1: "ወንጌል፣",
      heroTitleEm: "በእያንዳንዱ የልብ ቋንቋ",
      heroTitlePart2: "የኢትዮጵያ።",
      heroCtaPrimary: "መጽሐፍ ይደግፉ",
      heroCtaSecondary: "በዩቲዩብ ይመልከቱ",
      statLanguages: "የልብ ቋንቋዎች",
      statBooks: "የተሰራጩ መጻሕፍት",
      statCongregations: "የቀረቡ ጉባኤዎች",
      statEpisodes: "ቀጥታ የፖድካስት ክፍሎች",
      whatWeDoTitle: "እንተረጉማለን። እናትማለን። እናሰራጫለን። በነጻ።",
      whatWeDoBody:
        "በመላ ኢትዮጵያ ያሉ የሉተራን ጉባኤዎች በተደጋጋሚ የሚጠይቁት አንድ ነገር አለ — በቀላሉ ሊያነቡት የሚችሉ ጠንካራ የክርስቲያን መጻሕፍት። LHF ኢትዮጵያ ይህን ክፍተት በቋንቋ ይሞላል።",
      translation: "ትርጉም",
      translationBody:
        "ኢትዮጵያውያን ፓስተሮችና የነገረ መለኮት ገምጋሚዎች የሉተርን ካቴኪዝም፣ የመጽሐፍ ቅዱስ ታሪኮችንና ጸሎቶችን ወደ አማርኛ፣ አፋን ኦሮሞ፣ ትግርኛና ሌሎች ይተረጉማሉ።",
      printing: "ህትመት",
      printingBody:
        "መጻሕፍት በተቻለ መጠን አዲስ አበባ ውስጥ ይታተማሉ፣ የኢትዮጵያ ማተሚያ ቤቶችን ይደግፋሉ እንዲሁም ከእጅ ጽሑፍ እስከ ጉባኤ ያለውን ጊዜ ያሳጥራሉ።",
      distribution: "ሥርጭት",
      distributionBody:
        "ለጉባኤዎች፣ ለሰንበት ትምህርት ቤቶችና ለፓስተር ሥልጠና ማዕከላት በመላ አገሪቷ እናደርሳለን — እያንዳንዱን መጽሐፍ ያለ ክፍያ ይቀበላሉ።",
      podcastTagline: "ቅዱስ ቃሉ ብቻ። በአማርኛና በእንግሊዝኛ የመጽሐፍ ቅዱስ ጥናት።",
      moreEpisodes: "ሌሎች የቅርብ ጊዜ ክፍሎች",
      allEpisodes: "ሁሉም ክፍሎች",
      impactTitle: "ቃሉ ይባዛል።",
      impactBody:
        "እውነተኛ የስርጭት መረጃ — እያንዳንዱ ቅጂ ይቆጠራል፣ በቋንቋና በዓመት ይከፈላል። እነዚህን ቁጥሮች በወር አንድ ጊዜ እናዘምናለን።",
      languagesTitle: "ዛሬ ስድስት ቋንቋዎች። ተጨማሪ ይመጣሉ።",
      languagesBody:
        "ኢትዮጵያ ከ90 በላይ ቋንቋዎች መኖሪያ ናት። ለጋሾች፣ ተርጓሚዎችና አጋር ጉባኤ በሚገናኙበት ጊዜ አዲስ የልብ ቋንቋ እንጨምራለን።",
      fullLibrary: "ሙሉ ቤተ-መጻሕፍት",
      eventsTitle: "ዝግጅቶችና ስብሰባዎች",
      eventsBody: "የስርጭት ቀኖች፣ የፓስተር ስልጠናዎች፣ እና በመላ ኢትዮጵያ ቀጥታ ፖድካስት ቅረጻዎች።",
      allEvents: "ሁሉም ዝግጅቶች →",
      storiesTitle: "የሉተራን ቤተ-መጻሕፍት፣ አንድ ፊት በአንድ ጊዜ።",
      storiesBody:
        "ተርጓሚዎች፣ ፓስተሮች፣ የሰንበት ትምህርት መምህራን እና የጉባኤ አባላት እነዚህን መጻሕፍት ወደ እውነተኛ ሕይወት ይወስዳሉ።",
      readStories: "ታሪኮችን ያንብቡ",
      valuesTitle: "በመጽሐፍ ቅዱስ የተመሰረተ። በክርስቶስ ላይ ያተኮረ። በሪፎርሜሽን የሚነዳ።",
      ctaTitle: "$7 አንድ ካቴኪዝም ያትማል። $1,200 አዲስ ቋንቋ ይከፍታል።",
      ctaBody:
        "በዝርዝራችን ላይ ያለ እያንዳንዱ ፕሮጀክት እውነተኛ ጉባኤ፣ እውነተኛ ተርጓሚ እና ለመሞላት የሚጠብቅ እውነተኛ መደርደሪያ ነው።",
      ctaPrimary: "ድጋፍ የሚሹ ፕሮጀክቶችን ይመልከቱ",
      ctaSecondary: "ብዙ የሚያስፈልገውን ይስጡ",
    },
    about: {
      label: "ስለ እኛ",
      title: "የሉተራን ቤተ-መጻሕፍት፣ በአንድ ጊዜ አንድ የልብ ቋንቋ።",
      intro:
        "LHF ኢትዮጵያ የሉተራን ቅርስ ፋውንዴሽን ክልላዊ ቅርንጫፍ ነው — በዩናይትድ ስቴትስ የተመሰረተ ተልዕኮ ሲሆን ከ6 ሚሊዮን በላይ መጽሐፍ ቅዱሳዊ መጻሕፍት ለሉተራን ጉባኤዎች በ100 አገሮች ውስጥ አስቀምጧል። በኢትዮጵያ ከአካባቢው ፓስተሮች፣ ተርጓሚዎችና አታሚዎች ጋር በመተባበር ተመሳሳይ ሥራ እንሰራለን።",
      storyLabel: "ታሪካችን",
      storyTitle: "ለምን ኢትዮጵያ። ለምን አሁን።",
      storyP1:
        "የሉተራን ጉባኤዎች ከ19ኛው ክፍለ ዘመን ጀምሮ የኢትዮጵያ ታሪክ አካል ናቸው። ዛሬ ከ11 ሚሊዮን በላይ ኢትዮጵያውያን በሉተራን ጉባኤዎች ያመልካሉ — እና ብዙዎቹ የሉተር ትንሹን ካቴኪዝም በሚያስቡበትና በሚጸልዩበት ቋንቋ ይዘው አያውቁም።",
      storyP2:
        "LHF ኢትዮጵያ ይህን ለመለወጥ ነው የተመሰረተው። የእምነት መግለጫ የሆኑ የሉተራን መጻሕፍትን እንተረጉማለን፣ እናትማለን፣ እናሰራጫለን — ለጉባኤው፣ ለፓስተሩ ወይም ለቤተሰቡ ምንም ክፍያ ሳይኖር።",
      numbersLabel: "በቁጥር",
      numbersTitle: "ሊለካ የሚችል ተልዕኮ።",
      convictionsLabel: "የምንመራባቸው",
      convictionsTitle: "እያንዳንዱን ፕሮጀክት የሚቀርጹ አራት እምነቶች።",
      parentLabel: "ወላጅ ድርጅት",
      parentTitle: "የሉተራን ቅርስ ፋውንዴሽን",
      parentBody:
        "LHF በማኮምብ፣ ሚቺጋን የተመሰረተ የሉተራን ቤተ ክርስቲያን—ሚዙሪ ሲኖድ (LCMS) እውቅና ያለው የአገልግሎት ድርጅት ነው። ከ1992 ጀምሮ የሉተር ትንሹን ካቴኪዝም ከ150 በላይ ቋንቋዎች ተርጉሞ ከ2,000 በላይ ርዕሶች አሳትሟል። LHF ኢትዮጵያ ይህን ተልዕኮ ወደ የኢትዮጵያ ደጋማ ቦታዎችና ቆላማ ቦታዎች ይወስዳል።",
      visitLhf: "LHF ይጎብኙ",
      getInTouch: "ያግኙን",
    },
    publications: {
      label: "ህትመቶች",
      title: "የLHF ኢትዮጵያ ቤተ-መጻሕፍት።",
      intro:
        "ካቴኪዞች፣ የመጽሐፍ ቅዱስ ታሪክ መጻሕፍት፣ ጸሎቶችና የእምነት መግለጫ ጽሑፎች — በህትመት ላይ ያሉ፣ በትርጉም ላይ ያሉ ወይም የሚቀጥለውን ስፖንሰር የሚጠብቁ።",
      heartLanguagesTitle: "የምናተምባቸው ቋንቋዎች።",
      catalogLabel: "ካታሎግ",
      catalogTitle: "በህትመት ላይና በሂደት ላይ ያሉ ርዕሶች።",
      noteFree:
        "ርዕሶቹ ለጉባኤዎችና ለፓስተሮች በነጻ ይከፋፈላሉ። ለሰበካዎ ወይም ለሰንበት ትምህርት ቤትዎ ለመጠየቅ የመገናኛ ቅጹን ይጠቀሙ።",
      missingLanguageTitle: "ቋንቋዎን አያዩም?",
      missingLanguageBody:
        "ጉባኤ በሚጠይቅበትና ስፖንሰር ሲነሳ አዲስ የልብ ቋንቋ እንከፍታለን። ስለ ሰበካዎ — እና ስለሚጸልዩበት ቋንቋ ይንገሩን።",
      colTitle: "ርዕስ",
      colLanguage: "ቋንቋ",
      colAudience: "ተደራሽ",
      colStatus: "ሁኔታ",
    },
    podcast: {
      label: "በዩቲዩብ ላይ የዲጂታል ሥርጭት",
      hostedBy: "የሚያቀርብ",
      browseLabel: "ክፍሎች",
      browseTitle: "መዝገብ ቤቱን ይዳስሱ",
      filterAll: "ሁሉም",
      filterBibleStudy: "የመጽሐፍ ቅዱስ ጥናት",
      filterDoctrine: "ትምህርተ-ሃይማኖት",
      filterCatechism: "ካቴኪዝም",
      filterMusic: "ሙዚቃ",
      searchPlaceholder: "ክፍሎችን፣ እንግዶችን፣ ርዕሶችን ይፈልጉ…",
      resultsCount: "{n} ክፍሎች",
      resultsCountSingular: "{n} ክፍል",
      noResults: "ይህን ፍለጋ የሚያሟላ ክፍል የለም።",
      hostBlockTitle: "አቅራቢ",
    },
    projects: {
      label: "ፕሮጀክት ይምረጡ",
      title: "መጻሕፍቱ የት እንደሚሄዱ ይምረጡ።",
      intro:
        "እዚህ ያለ እያንዳንዱ ፕሮጀክት እውነተኛ ነው፦ ተርጓሚ፣ የህትመት ሥራ፣ ሰበካ፣ የሰንበት ትምህርት ቤት። አንዱን ይምረጡና ከእጅ ጽሑፍ እስከ ጉባኤ ይከታተሉት።",
      giveCta: "ለበለጠ ለሚያስፈልገው ይስጡ",
      sponsorFullCta: "ሙሉ ፕሮጀክት ይደግፉ",
      need: "ፍላጎት፦",
      impact: "ተጽዕኖ፦",
    },
    events: {
      label: "ዝግጅቶች",
      title: "ይምጡ። መጻሕፍት ይዘው ይሂዱ።",
      intro:
        "የሩብ ዓመት ስርጭት ቀኖች፣ የፓስተር ስልጠናዎች፣ የመጽሐፍ ምረቃዎችና ቀጥታ ፖድካስት ቅረጻዎች። አብዛኞቹ ዝግጅቶች በነፃ ናቸው እና ለሉተራን ካህናት፣ መምህራንና የሰበካ መሪዎች ክፍት ናቸው።",
      upcomingTitle: "በመጪው ቀን መርሐ ግብር ላይ",
      pastTitle: "በቅርቡ የተደረጉ",
      noUpcoming: "የተያዘ ዝግጅት የለም። በቅርቡ ይመለሱ።",
    },
    stories: {
      label: "ታሪኮች",
      title: "በራሳቸው ቃላት።",
      intro:
        "ፓስተሮች፣ መምህራን፣ ተርጓሚዎች፣ ዲያቆናት እና አታሚዎች — እነዚህ መጻሕፍት የሚያልፉበት ሰዎች። እውነተኛ ጉባኤዎች፣ እውነተኛ ምስክርነቶች።",
      ctaTitle: "ቀጣዩ ታሪክ የእርስዎ ሊሆን ይችላል።",
      ctaBody:
        "ሰበካዎ ከLHF ኢትዮጵያ መጻሕፍት ከተቀበለ — ወይም እየጠበቀ ከሆነ — ይንገሩን። እግዚአብሔር በእርስዎ የሚሰራውን መካፈል እንወዳለን።",
      shareCta: "ታሪክዎን ያጋሩ",
      helpMoreCta: "ብዙ ታሪኮች እንዲሆኑ ያግዙ",
    },
    news: {
      label: "ዜናዎች",
      title: "ቃሉ በስራ ላይ።",
      intro:
        "ከትርጉም ጠረጴዛዎች፣ ከህትመት ወለሎች እና እነዚህን መጻሕፍት ከሚቀበሉ ጉባኤዎች እውነተኛ ዝመናዎች።",
    },
    donate: {
      label: "ይለግሱ",
      title: "መጽሐፍን ብዙ ወደሚያስፈልግበት ይላኩ።",
      intro:
        "እያንዳንዱ ስጦታ በቀጥታ ወደ ተተርጎሙ፣ የታተሙና ለኢትዮጵያ ሉተራን ጉባኤዎች በነፃ ወደተሰራጩ መጻሕፍት ይቀየራል።",
      makeGiftTitle: "ስጦታ ይስጡ",
      makeGiftBody: "መጠን ይምረጡ ወይም የራስዎን ያስገቡ። አብዛኞቹ ለጋሾች በሩብ አንድ ጊዜ ይሰጣሉ።",
      customLabel: "ብጁ መጠን (ዶላር)",
      nameLabel: "ሙሉ ስም",
      emailLabel: "ኢሜል",
      designateLabel: "ምድብ (አማራጭ)",
      designateHint: "ለምሳሌ 'የሲዳማ ካቴኪዝም' ወይም 'ብዙ የሚያስፈልገው ቦታ'",
      noteLabel: "ለቡድኑ ማስታወሻ",
      submitCta: "ወደ ደህንነቱ የተጠበቀ ክፍያ ይቀጥሉ",
      taxNote:
        "ክፍያዎች በLHF የአሜሪካ ወላጅ ድርጅት ይከናወናሉ። የአሜሪካ ለጋሾች፦ ሕግ በሚፈቅደው መጠን ከታክስ ቅናሽ ይደረጋል።",
      allocationTitle: "ስጦታዎ የት እንደሚሄድ",
      allocationCaption: "በ2025 የተቀበለው የእያንዳንዱ ዶላር ድልድል።",
      otherWaysTitle: "በሌላ መንገድ ይስጡ",
      otherWaysMail:
        "በፖስታ፦ Lutheran Heritage Foundation, 51474 Romeo Plank, Macomb, MI 48042, USA. ማስታወሻ፦ ኢትዮጵያ።",
      otherWaysLocal:
        "በኢትዮጵያ፦ የአዲስ ቢሮአችንን ያግኙ",
      otherWaysLocalSuffix: "ለአካባቢ ባንክ ዝውውር ዝርዝሮች።",
    },
    contact: {
      label: "አግኙን",
      title: "ስለ ጉባኤዎ ይንገሩን።",
      intro: "መጻሕፍት ይጠይቁ፣ አዲስ ቋንቋ ያቅርቡ፣ ወይም ሰላምታ ይስጡ። ሁሉንም እናነባለን።",
      formTitle: "መልዕክት ይላኩ",
      nameLabel: "ስም",
      roleLabel: "ሚና",
      emailLabel: "ኢሜል",
      phoneLabel: "ስልክ (አማራጭ)",
      parishLabel: "ሰበካ / ከተማ",
      languageLabel: "የሚያስፈልጉ ቋንቋዎች",
      languageHint: "ለምሳሌ አማርኛ፣ አፋን ኦሮሞ፣ ትግርኛ፣ ሲዳማ…",
      messageLabel: "እንዴት ልንረዳ እንችላለን?",
      submitCta: "መልዕክት ይላኩ",
      officeTitle: "የLHF ኢትዮጵያ ቢሮ",
      hoursTitle: "የቢሮ ሰዓታት",
      hours: "ሰኞ – አርብ · 9:00 – 17:00 EAT\nቅዳሜ – እሁድ · ዝግ",
      parentTitle: "ወላጅ ድርጅት",
    },
    footer: {
      explore: "ይዳስሱ",
      office: "ቢሮ",
      follow: "ይከተሉን",
      rights: "መብቱ የተጠበቀ ነው።",
    },
    languageModal: {
      title: "ቋንቋዎን ይምረጡ",
      subtitle: "በማንኛውም ጊዜ ከአሰሳ አሞሌው መለወጥ ይችላሉ።",
      saveBtn: "ይቀጥሉ",
      hint: "የአሳሽዎን ቋንቋ አግኝተናል — በደንብ የሚነበበውን ይምረጡ።",
    },
  },

  om: {
    nav: {
      home: "Fuula Jalqabaa",
      about: "Waa'ee Keenya",
      publications: "Maxxansa",
      podcast: "Podkaastii",
      projects: "Pirojektoota",
      events: "Sagantaa",
      stories: "Seenaa",
      news: "Oduu",
      contact: "Nu Qunnamaa",
      donate: "Arjoomi",
      donateLong: "LHF Itoophiyaaf arjoomi",
    },
    common: {
      readMore: "Caalaa dubbisi",
      learnMore: "Caalaa baradhu",
      seeAll: "Hunda ilaali",
      seeAllArrow: "Haaromsi hundaa →",
      sponsor: "Kitaaba deeggari",
      sponsorProject: "Pirojektii kana deeggari",
      sponsorShow: "Sagantaa deeggari",
      browse: "Mana kitaabaa ilaali",
      watch: "Ilaali",
      listen: "Dhaggeeffadhu",
      subscribe: "YouTube irratti galmaa'i",
      requestBook: "Garagalcha gaafadhu",
      requestLanguage: "Afaan gaafadhu",
      adoptProject: "Pirojektii filadhu",
      adoptTranslation: "Hiika filadhu",
      partnersLabel: "Hirmaattota fi deeggartoota",
      free: "Kitaabonni tola raabsaman — gonkumaa hin gurguraman.",
      sectionEpisodes: "Kutaalee",
      sectionLatest: "Haaraa",
      sectionUpcoming: "Dhufaa jiru",
      sectionPast: "Kanneen darban",
      sectionImpact: "Bu'aa",
      sectionLanguages: "Afaanota onnee",
      sectionWhatWeDo: "Hojii keenya",
      sectionWhatWeBelieve: "Wantoota itti amannu",
      sectionStories: "Seenaa",
      sectionDigitalOutreach: "Tamsaasa dijitaalaa YouTube irratti",
      tagWordAtWork: "Dubbiin Itoophiyaa keessatti hojiirra",
      languageLabel: "Afaan",
      sendMessage: "Ergaa ergi",
      open: "Deeggarsaaf banaa",
      raised: "Walitti qabame",
      ofGoal: "{goal} kaayyoo keessaa",
      reserveSpot: "Iddoo qabadhu",
      seePodcast: "Podkaastii ilaali",
    },
    home: {
      heroTitlePart1: "Wangeela,",
      heroTitleEm: "afaan onnee hunda keessatti",
      heroTitlePart2: "kan Itoophiyaa.",
      heroCtaPrimary: "Kitaaba deeggari",
      heroCtaSecondary: "YouTube irratti ilaali",
      statLanguages: "Afaanota onnee",
      statBooks: "Kitaabota raabsaman",
      statCongregations: "Waldaalee deeggaraman",
      statEpisodes: "Kutaalee podkaastii jiraan",
      whatWeDoTitle: "Hiikna. Maxxansina. Raabsina. Tola.",
      whatWeDoBody:
        "Waldaaleen Luuteraanaa Itoophiyaa keessa jiran irra deddeebi'anii waan tokko gaafatu — kitaabota Kiristaanaa cimoo dhugaa dubbachuu danda'an. LHF Itoophiyaan hanqina kana, afaan afaaniin guuta.",
      translation: "Hiika",
      translationBody:
        "Pastoroonni Itoophiyaa fi qorattoonni amantii Catechism Luuter, seenaa Macaafa Qulqulluu fi kadhannaa gara Amaariffa, Afaan Oromoo, Tigriiffa fi kkf hiiku.",
      printing: "Maxxansa",
      printingBody:
        "Yommuu danda'amu kitaabonni Finfinnee keessatti maxxansamu — manneen maxxansaa Itoophiyaa deeggaree yeroo barreessuu irraa gara waldaatti ce'umsa gabaabsu.",
      distribution: "Raabsa",
      distributionBody:
        "Waldaalee, mana barumsaa Sanbataa fi giddugala leenjii pastoraatti biyya guutuu raabsina — kitaaba hundumaa tola fudhatu.",
      podcastTagline:
        "Sola Scriptura. Macaafa Qulqulluu Amaariffa fi Afaan Ingiliffaan qo'achuu.",
      moreEpisodes: "Kutaalee biroo dhiyeenya",
      allEpisodes: "Kutaalee hundaa",
      impactTitle: "Dubbiin, baay'achaa jira.",
      impactBody:
        "Daataa raabsaa dhugaa — garagalcha hundi lakkaa'amee, afaaniin fi waggaan addaan baafame. Lakkoofsota kana ji'a tokkotti haaressina.",
      languagesTitle: "Har'a afaanota jaha. Caalaan dhufaa jira.",
      languagesBody:
        "Itoophiyaan mana afaanota 90+ ti. Yeroo arjoomtoonni, hiiktonni fi waldaa hirmaataan walitti dhufan afaan onnee haaraa dabalama.",
      fullLibrary: "Mana kitaabaa guutuu",
      eventsTitle: "Sagantaalee fi walga'iiwwan",
      eventsBody:
        "Guyyoota raabsaa, leenjii pastoraa, fi waraabbii podkaastii kallattii Itoophiyaa keessatti.",
      allEvents: "Sagantaalee hundaa →",
      storiesTitle: "Mana kitaabaa Luuteraanaa, fuula tokko yeroo tokkotti.",
      storiesBody:
        "Hiiktonni, pastoroonni, barsiisotni Sanbataa fi miseensonni waldaa kitaabota kana gara jireenya dhugaatti geessu.",
      readStories: "Seenaalee dubbisi",
      valuesTitle:
        "Macaafa Qulqulluu irratti hundaa'e. Kiristoos giddugaleessa godhate. Riformeshiniin oofame.",
      ctaTitle: "$7 catechism tokko maxxansa. $1,200 afaan haaraa banaa.",
      ctaBody:
        "Pirojektiin tarree keenya irra jiru hundi waldaa dhugaa, hiikaa dhugaa, fi shelfa dhugaa eegaa jiru dha.",
      ctaPrimary: "Pirojektoota deeggara barbaadan ilaali",
      ctaSecondary: "Iddoo baay'ee barbaachisutti kenni",
    },
    about: {
      label: "Waa'ee Keenya",
      title: "Mana kitaabaa Luuteraanaa, afaan onnee tokkoon tokkoon ijaarame.",
      intro:
        "LHF Itoophiyaan damee naannoo Lutheran Heritage Foundation — ergama biyya Ameerikaa keessatti hundeeffame, kitaabota Macaafa Qulqulluu irratti hundaa'an miiliyoona 6 ol waldaalee Luuteraanaa biyyoota 100 hin caalle keessatti gahe. Itoophiyaa keessatti pastoroota, hiiktotaa fi maxxansitoota naannoo wajjin hojjenna.",
      storyLabel: "Seenaa keenya",
      storyTitle: "Maaliif Itoophiyaa. Maaliif amma.",
      storyP1:
        "Waldaaleen Luuteraanaa jaarraa 19ffaa irraa eegalee seenaa Itoophiyaa keessaa qooda taa'aa jiru. Har'a Itoophiyaanonni miiliyoona 11 ol waldaa Luuteraanaa keessatti waaqeffatu — garuu hedduun isaanii Catechism Xiqqaa Luuter afaan itti yaadanii fi itti kadhatanii hin qaban.",
      storyP2:
        "LHF Itoophiyaan kana jijjiiruuf jira. Kitaabota Luuteraanaa amanamoo hiikna, maxxansina, raabsina — waldaaf, pastoraaf, ykn maatii fudhatuuf gatii tokko malee.",
      numbersLabel: "Lakkoofsaan",
      numbersTitle: "Ergama safaramuu danda'u.",
      convictionsLabel: "Wantoota itti hidhamne",
      convictionsTitle: "Amantiiwwan afur pirojektii hundaa boca'an.",
      parentLabel: "Dhaabbata maatii",
      parentTitle: "Lutheran Heritage Foundation",
      parentBody:
        "LHF dhaabbata tajaajilaa beekamoo Lutheran Church—Missouri Synod (LCMS) ti, Macomb, Michigan keessa qubsiifame. Bara 1992 irraa eegalee Catechism Xiqqaa Luuter afaanota 150 oliin hiike fi mata duree 2,000 ol maxxanseera. LHF Itoophiyaan ergama kana gara olka'aa fi gad-aanaa Itoophiyaatti geessa.",
      visitLhf: "LHF daawwadhu",
      getInTouch: "Nu qunnami",
    },
    publications: {
      label: "Maxxansa",
      title: "Mana kitaabaa LHF Itoophiyaa.",
      intro:
        "Catechism, kitaabota seenaa Macaafa Qulqulluu, kadhannaa fi barreeffamoota amantii — kanneen maxxansaa irra jiran, kanneen hiikamaa jiran, ykn deeggaraa itti aanu eeggataa jiran.",
      heartLanguagesTitle: "Afaanota maxxansinu.",
      catalogLabel: "Kataaloogii",
      catalogTitle: "Matadureewwan maxxansaa fi adeemsa irra jiran.",
      noteFree:
        "Matadureewwan waldaalee fi pastoraaf tola raabsamu. Geejjiba sabaa keessanii ykn mana barumsaa Sanbataaf gaafachuuf, foormii qunnamtii fayyadami.",
      missingLanguageTitle: "Afaan kee hin argine?",
      missingLanguageBody:
        "Yeroo waldaan gaafatuu fi deeggaraan dhufu afaan onnee haaraa bannu. Waa'ee waldaa keetii fi afaan ittiin kadhatu nutti himi.",
      colTitle: "Mata duree",
      colLanguage: "Afaan",
      colAudience: "Hawaasa",
      colStatus: "Haala",
    },
    podcast: {
      label: "Tamsaasa dijitaalaa YouTube irratti",
      hostedBy: "Kan dhiheessu",
      browseLabel: "Kutaalee",
      browseTitle: "Galmee daawwadhu",
      filterAll: "Hundaa",
      filterBibleStudy: "Macaafa Qulqulluu qo'achuu",
      filterDoctrine: "Barsiisa amantii",
      filterCatechism: "Catechism",
      filterMusic: "Muuziqaa",
      searchPlaceholder: "Kutaalee, keessummoota, mataduree barbaadi…",
      resultsCount: "Kutaalee {n}",
      resultsCountSingular: "Kutaa {n}",
      noResults: "Barbaachan kuni kutaa hin argamne.",
      hostBlockTitle: "Dhiyeessaa",
    },
    projects: {
      label: "Pirojektii filadhu",
      title: "Kitaabonni eessa akka deeman filadhu.",
      intro:
        "Pirojektiin hundi kun dhugaa dha: hiikaa, hojii maxxansaa, waldaa, mana barumsaa Sanbataa. Tokko filadhuutii barreessuu irraa hanga waldaatti hordofi.",
      giveCta: "Iddoo baay'ee barbaachisutti kenni",
      sponsorFullCta: "Pirojektii guutuu deeggari",
      need: "Barbaachisaa:",
      impact: "Bu'aa:",
    },
    events: {
      label: "Sagantaalee",
      title: "Dhufii. Kitaaba qabattee deemi.",
      intro:
        "Guyyoota raabsaa hanga waggaa afurii, leenjii pastoraa, eebbifama kitaabaa, fi waraabbii podkaastii kallattii. Sagantaalee baayyeen tola, lubummaa Luuteraanaa, barsiisotaa fi gaggeessitoota waldaaf banaa dha.",
      upcomingTitle: "Kaalandara irra kan dhufu",
      pastTitle: "Dhiyeenya kana kan godhaman",
      noUpcoming: "Sagantaan dhufaa jiru hin jiru. Booda deebi'aatii ilaali.",
    },
    stories: {
      label: "Seenaa",
      title: "Jechoota isaaniitiin.",
      intro:
        "Pastoroonni, barsiisotni, hiiktonni, diqaakonnotaa fi maxxansitoonni — namoonni harki isaanii kitaabota kana keessa darbu. Waldaalee dhugaa, dhugaa baannu dhugaa.",
      ctaTitle: "Seenaan kee kan itti aanu ta'uu danda'a.",
      ctaBody:
        "Waldaan kee LHF Itoophiyaa irraa kitaabota fudhatee yoo jiraate — ykn yoo eegaa jiraate — nutti himi. Wantoota Waaqayyo sii keessatti hojjetaa jiru qooduu jaalanna.",
      shareCta: "Seenaa kee qoodi",
      helpMoreCta: "Seenaan baay'ee akka ta'u gargaari",
    },
    news: {
      label: "Oduu",
      title: "Dubbiin hojiirra.",
      intro:
        "Haaromsi dhugaa minjaala hiikaarraa, lafa maxxansaarraa, fi waldaalee kitaabota kana fudhataniirraa.",
    },
    donate: {
      label: "Arjoomi",
      title: "Kitaaba iddoo baay'ee barbaachisutti ergi.",
      intro:
        "Kennaan hundi gara kitaabota hiikaman, maxxanfaman, fi waldaalee Luuteraanaa Itoophiyaaf tola raabsamanitti kallatti jijjirama.",
      makeGiftTitle: "Kennaa kenni",
      makeGiftBody:
        "Hammaa filadhu ykn keessumaa kee galchi. Arjoomtonni baayyeen waggaa keessatti yeroo afur kennu.",
      customLabel: "Hamma keessumaa (USD)",
      nameLabel: "Maqaa guutuu",
      emailLabel: "Imeelii",
      designateLabel: "Murtoo (filannoo)",
      designateHint: "F.M. 'Catechism Sidaamaa' ykn 'Iddoo baay'ee barbaachisu'",
      noteLabel: "Yaada garee",
      submitCta: "Gara kaffaltii eegamtuutti itti fufi",
      taxNote:
        "Kaffaltiiwwan dhaabbata maatii Ameerikaa LHF tiin raawwatamu. Arjoomtota Ameerikaa: hanga seerri eyyamutti gibira irraa hir'isamu.",
      allocationTitle: "Kennaan kee iddoo deemu",
      allocationCaption: "Ramaddii doolaara hundaa bara 2025 fudhatame.",
      otherWaysTitle: "Karaa biroo kenni",
      otherWaysMail:
        "Postaan: Lutheran Heritage Foundation, 51474 Romeo Plank, Macomb, MI 48042, USA. Yaadachiisa: Itoophiyaa.",
      otherWaysLocal: "Itoophiyaa keessatti: waajjira Finfinnee qunnamaa",
      otherWaysLocalSuffix: "ragaa dabarsuu baankii naannoof.",
    },
    contact: {
      label: "Nu Qunnamaa",
      title: "Waa'ee waldaa kee nutti himi.",
      intro:
        "Kitaaba gaafadhu, afaan haaraa dhiyeessi, ykn nagaa nuuf himi. Hunda ni dubbifna.",
      formTitle: "Ergaa ergi",
      nameLabel: "Maqaa",
      roleLabel: "Gahee",
      emailLabel: "Imeelii",
      phoneLabel: "Bilbila (filannoo)",
      parishLabel: "Waldaa / magaalaa",
      languageLabel: "Afaanota barbaachisan",
      languageHint: "F.M. Amaariffa, Afaan Oromoo, Tigriiffa, Sidaamaa…",
      messageLabel: "Akkamiin gargaaruu dandeenya?",
      submitCta: "Ergaa ergi",
      officeTitle: "Waajjira LHF Itoophiyaa",
      hoursTitle: "Sa'aatii waajjiraa",
      hours: "Wiixata – Jimaata · 9:00 – 17:00 EAT\nSanbata – Dilbata · cufaa",
      parentTitle: "Dhaabbata maatii",
    },
    footer: {
      explore: "Daawwadhu",
      office: "Waajjira",
      follow: "Nu hordofi",
      rights: "Mirgi qabatame.",
    },
    languageModal: {
      title: "Afaan kee filadhu",
      subtitle: "Yeroo kamiyyuu jijjiiruu ni dandeessa.",
      saveBtn: "Itti fufi",
      hint: "Afaan barreessaa argineerra — kan caalaa sii ta'u filadhu.",
    },
  },
} as const;

export type Dictionary = typeof dictionary.en;
export type TKey =
  | `nav.${keyof Dictionary["nav"]}`
  | `common.${keyof Dictionary["common"]}`
  | `home.${keyof Dictionary["home"]}`
  | `about.${keyof Dictionary["about"]}`
  | `publications.${keyof Dictionary["publications"]}`
  | `podcast.${keyof Dictionary["podcast"]}`
  | `projects.${keyof Dictionary["projects"]}`
  | `events.${keyof Dictionary["events"]}`
  | `stories.${keyof Dictionary["stories"]}`
  | `news.${keyof Dictionary["news"]}`
  | `donate.${keyof Dictionary["donate"]}`
  | `contact.${keyof Dictionary["contact"]}`
  | `footer.${keyof Dictionary["footer"]}`
  | `languageModal.${keyof Dictionary["languageModal"]}`;
