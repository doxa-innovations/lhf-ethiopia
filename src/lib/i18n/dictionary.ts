// Translation dictionary for LHF Ethiopia.
//
// Translation quality notes for the LHF Ethiopia team:
//  - English (en) is the source of truth.
//  - Amharic (am) translations are first-pass; please review with a native
//    Amharic speaker before launch.
//  - Afaan Oromoo (om) translations are placeholders flagged with [TODO:om]
//    in every entry that needs native review.
//
// Add new strings by extending `en` first, then mirroring in `am` and `om`.

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
      sectionImpact: "Impact",
      sectionLanguages: "Heart languages",
      sectionWhatWeDo: "What we do",
      sectionWhatWeBelieve: "What we believe",
      sectionStories: "Stories",
      sectionDigitalOutreach: "Digital outreach on YouTube",
      tagWordAtWork: "The Word at work in Ethiopia",
      languageLabel: "Language",
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
      podcastTagline:
        "Sola Scriptura. Bible study in Amharic and English.",
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
      sectionImpact: "ተጽዕኖ",
      sectionLanguages: "የልብ ቋንቋዎች",
      sectionWhatWeDo: "የምንሰራው",
      sectionWhatWeBelieve: "የምናምነው",
      sectionStories: "ታሪኮች",
      sectionDigitalOutreach: "በዩቲዩብ ላይ የዲጂታል ሥርጭት",
      tagWordAtWork: "ቃሉ በኢትዮጵያ በስራ ላይ",
      languageLabel: "ቋንቋ",
    },
    home: {
      heroTitlePart1: "ወንጌል",
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
      eventsBody:
        "የስርጭት ቀኖች፣ የፓስተር ስልጠናዎች፣ እና በመላ ኢትዮጵያ ቀጥታ ፖድካስት ቅረጻዎች።",
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
      sectionImpact: "Bu'aa",
      sectionLanguages: "Afaanota onnee",
      sectionWhatWeDo: "Hojii keenya",
      sectionWhatWeBelieve: "Wantoota itti amannu",
      sectionStories: "Seenaa",
      sectionDigitalOutreach: "Tamsaasa dijitaalaa YouTube irratti",
      tagWordAtWork: "Dubbiin Itoophiyaa keessatti hojiirra",
      languageLabel: "Afaan",
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
      podcastTagline: "Sola Scriptura. Macaafa Qulqulluu Amaariffa fi Afaan Ingiliffaan qo'achuu.",
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
      valuesTitle: "Macaafa Qulqulluu irratti hundaa'e. Kiristoos giddugaleessa godhate. Riformeshiniin oofame.",
      ctaTitle: "$7 catechism tokko maxxansa. $1,200 afaan haaraa banaa.",
      ctaBody:
        "Pirojektiin tarree keenya irra jiru hundi waldaa dhugaa, hiikaa dhugaa, fi shelfa dhugaa eegaa jiru dha.",
      ctaPrimary: "Pirojektoota deeggara barbaadan ilaali",
      ctaSecondary: "Iddoo baay'ee barbaachisutti kenni",
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
  | `footer.${keyof Dictionary["footer"]}`
  | `languageModal.${keyof Dictionary["languageModal"]}`;
