// LHF Ethiopia content source-of-truth. Plain TS objects so the
// marketing site can ship without a CMS; swap to Payload/MDX later
// without touching the components.

export const SITE = {
  name: "LHF Ethiopia",
  longName: "Lutheran Heritage Foundation — Ethiopia",
  tagline: "The Gospel, in every heart language of Ethiopia.",
  description:
    "LHF Ethiopia translates, prints, and distributes Bible-based, Christ-centered Lutheran books in Amharic, Afaan Oromoo, Tigrinya, Somali, Sidaamu Afoo, and Wolayttattuwaa — free of charge — and reaches new audiences through podcasting, events, and digital outreach.",
  parent:
    "A regional initiative of the Lutheran Heritage Foundation (LHF), Macomb, MI, USA.",
  email: "Info@lhfethiopia.org",
  phone: "+251 911 000 000",
  address: "Bole Sub-City, Addis Ababa, Ethiopia",
  social: {
    facebook: "https://facebook.com/lhfmissions",
    instagram: "https://instagram.com/lhfbooks",
    youtube: "https://youtube.com/@lhfmissions",
    spotify: "https://open.spotify.com",
    applePodcasts: "https://podcasts.apple.com",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/podcast", label: "Podcast" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

/* Grouped navigation used by the dropdown navbar. Each top-level item
   either links straight to a page, or opens a small menu of children. */
export const NAV_GROUPS = [
  { kind: "link" as const, href: "/", labelKey: "nav.home" },
  {
    kind: "menu" as const,
    labelKey: "nav.about",
    href: "/about",
    items: [
      { href: "/about", labelKey: "nav.about", descKey: "navMenu.aboutDesc" },
      {
        href: "/about#believe",
        labelKey: "common.sectionWhatWeBelieve",
        descKey: "navMenu.believeDesc",
      },
    ],
  },
  {
    kind: "menu" as const,
    labelKey: "navMenu.library",
    href: "/publications",
    items: [
      {
        href: "/publications",
        labelKey: "nav.publications",
        descKey: "navMenu.publicationsDesc",
      },
      {
        href: "/podcast",
        labelKey: "nav.podcast",
        descKey: "navMenu.podcastDesc",
      },
    ],
  },
  {
    kind: "menu" as const,
    labelKey: "navMenu.engage",
    href: "/projects",
    items: [
      {
        href: "/projects",
        labelKey: "nav.projects",
        descKey: "navMenu.projectsDesc",
      },
      {
        href: "/events",
        labelKey: "nav.events",
        descKey: "navMenu.eventsDesc",
      },
    ],
  },
  { kind: "link" as const, href: "/news", labelKey: "nav.news" },
  { kind: "link" as const, href: "/contact", labelKey: "nav.contact" },
] as const;

export const STATS = [
  { value: "6", suffix: "+", label: "Heart languages served" },
  { value: "42", suffix: "k", label: "Books printed for Ethiopia" },
  { value: "180", suffix: "+", label: "Congregations supplied" },
  { value: "12", suffix: "", label: "Translation projects active" },
] as const;

export const LANGUAGES = [
  {
    code: "am",
    name: "Amharic",
    native: "አማርኛ",
    region: "Addis Ababa, Amhara",
    speakers: "32 million",
    status: "Published",
    titles: 14,
  },
  {
    code: "om",
    name: "Afaan Oromoo",
    native: "Afaan Oromoo",
    region: "Oromia",
    speakers: "37 million",
    status: "Published",
    titles: 9,
  },
  {
    code: "ti",
    name: "Tigrinya",
    native: "ትግርኛ",
    region: "Tigray",
    speakers: "9 million",
    status: "Published",
    titles: 6,
  },
  {
    code: "so",
    name: "Somali",
    native: "Soomaali",
    region: "Somali Region",
    speakers: "8 million",
    status: "In translation",
    titles: 2,
  },
  {
    code: "sid",
    name: "Sidaama",
    native: "Sidaamu Afoo",
    region: "Sidama",
    speakers: "4 million",
    status: "In translation",
    titles: 1,
  },
  {
    code: "wal",
    name: "Wolaytta",
    native: "Wolayttattuwaa",
    region: "South Ethiopia",
    speakers: "2 million",
    status: "Requested",
    titles: 0,
  },
] as const;

export const PUBLICATIONS = [
  {
    title: "Luther's Small Catechism",
    language: "Amharic",
    native: "የሉተር ትንሹ ካቴኪዝም",
    audience: "All ages",
    pages: 112,
    status: "In print",
  },
  {
    title: "The Good News About Jesus",
    language: "Afaan Oromoo",
    native: "Misiraachoo Yesuusiif",
    audience: "Children",
    pages: 64,
    status: "In print",
  },
  {
    title: "A Child's Garden of Bible Stories",
    language: "Amharic",
    native: "የልጆች የመጽሐፍ ቅዱስ ታሪኮች",
    audience: "Children",
    pages: 96,
    status: "In print",
  },
  {
    title: "Luther's Small Catechism",
    language: "Tigrinya",
    native: "ናይ ሉተር ንእሽቶ ካቴኪዝም",
    audience: "All ages",
    pages: 108,
    status: "In print",
  },
  {
    title: "The Augsburg Confession",
    language: "Amharic",
    native: "የአውግስቡርግ የእምነት መግለጫ",
    audience: "Pastors & teachers",
    pages: 86,
    status: "Reprint requested",
  },
  {
    title: "Luther's Small Catechism",
    language: "Somali",
    native: "Catechism-ka yar ee Luther",
    audience: "All ages",
    pages: 110,
    status: "In translation",
  },
  {
    title: "Daily Devotions for Families",
    language: "Amharic",
    native: "የቤተሰብ ዕለታዊ ጸሎቶች",
    audience: "All ages",
    pages: 144,
    status: "In print",
  },
  {
    title: "The Lord's Prayer Explained",
    language: "Afaan Oromoo",
    native: "Kadhannaa Gooftaa",
    audience: "All ages",
    pages: 48,
    status: "In print",
  },
  {
    title: "Hymns of the Reformation",
    language: "Amharic",
    native: "የሪፎርሜሽን መዝሙራት",
    audience: "Congregations",
    pages: 78,
    status: "In translation",
  },
] as const;

export const PROJECTS = [
  {
    title: "Sidaama Catechism — First Edition",
    region: "Sidama Region",
    need: "Translation review + 2,000-copy first print run",
    raised: 4200,
    goal: 11500,
    impact:
      "Equips 40 rural congregations with their first Lutheran catechism in Sidaamu Afoo.",
  },
  {
    title: "Pastor's Library — Tigray Reprint",
    region: "Tigray",
    need: "Reprint of 8 Amharic and Tigrinya titles, post-conflict restoration",
    raised: 9800,
    goal: 18000,
    impact:
      "Replaces libraries lost during the 2020–2022 conflict for 65 pastors.",
  },
  {
    title: "Children's Bible Stories — Oromia Outreach",
    region: "Oromia",
    need: "10,000 copies of A Child's Garden in Afaan Oromoo",
    raised: 6300,
    goal: 14000,
    impact:
      "Sunday school curriculum for 220 congregations across Oromia.",
  },
  {
    title: "Somali Translation — Year One",
    region: "Somali Region",
    need: "Salary support for two reviewers + theological consultant",
    raised: 2100,
    goal: 9000,
    impact:
      "Opens a new heart language: first Lutheran texts ever in Soomaali.",
  },
  {
    title: "Podcast Studio — Phase 1",
    region: "Addis Ababa",
    need: "Acoustic treatment + microphones + interface for the new studio",
    raised: 3500,
    goal: 8400,
    impact:
      "Triples weekly recording capacity and lifts audio quality for sermon, music, and teaching episodes.",
  },
] as const;

export const NEWS = [
  {
    slug: "tigrinya-catechism-reprint",
    date: "2026-05-18",
    title: "Tigrinya catechism reprint reaches 65 congregations",
    excerpt:
      "After the conflict years, replacement copies of Luther's Small Catechism in Tigrinya have arrived in Mekelle and surrounding parishes.",
    tag: "Distribution",
  },
  {
    slug: "afaan-oromoo-childrens-stories",
    date: "2026-04-02",
    title: "Children's Bible Stories enters its third printing in Afaan Oromoo",
    excerpt:
      "Demand from Sunday schools across Oromia keeps growing — the third printing of 5,000 copies is now on press in Addis Ababa.",
    tag: "Publication",
  },
  {
    slug: "sidaama-translation-launch",
    date: "2026-02-14",
    title: "Sidaama translation team begins work on the Small Catechism",
    excerpt:
      "A new translation effort opens a sixth heart language for LHF Ethiopia. Three reviewers met in Hawassa to set the editorial standard.",
    tag: "Translation",
  },
  {
    slug: "addis-warehouse-opens",
    date: "2026-01-09",
    title: "LHF Ethiopia opens a distribution warehouse in Addis Ababa",
    excerpt:
      "A dedicated office and warehouse in Bole simplifies customs clearance and inland shipping to congregations countrywide.",
    tag: "Operations",
  },
] as const;

/* What we believe — confessional Lutheran content drawn from the LCMS
   "What about…" series and the Book of Concord. Plain-English summaries
   suitable for a public site; the doctrinal substance follows lcms.org. */
export const VALUES = [
  {
    title: "Sola Scriptura — Scripture Alone",
    body:
      "The Bible is the only rule and norm of faith and life. Holy Scripture is the written Word of God — inspired, inerrant, and the sole authority by which every doctrine is tested. We teach what Scripture teaches and confess what Scripture confesses.",
  },
  {
    title: "Sola Gratia — Grace Alone",
    body:
      "Salvation is the free gift of God's grace. We are saved not by what we have done or could do, but by the unmerited favor of God in Christ Jesus, who came to seek and save the lost.",
  },
  {
    title: "Sola Fide — Faith Alone",
    body:
      "We are justified — declared righteous before God — through faith alone in Jesus Christ, apart from works of the law. This good news is the central article of the Christian faith and the heart of every book LHF Ethiopia distributes.",
  },
  {
    title: "Solus Christus — Christ Alone",
    body:
      "Jesus Christ, true God and true man, is the one mediator between God and humanity. There is no other name under heaven by which we must be saved. His life, death, and resurrection accomplish our salvation in full.",
  },
  {
    title: "Soli Deo Gloria — Glory to God Alone",
    body:
      "Every congregation served, every book printed, every podcast recorded is offered to the glory of God alone. We labour in His name, by His grace, for the spread of His Word in Ethiopia.",
  },
  {
    title: "Word and Sacrament",
    body:
      "Christ comes to us through the means of grace: the preached Word of the Gospel, Holy Baptism, and the Lord's Supper. We support congregations in the regular, faithful use of these means so the saving work of Christ is delivered into the lives of God's people.",
  },
  {
    title: "The Book of Concord",
    body:
      "We confess the unaltered Augsburg Confession (1530), Luther's Small and Large Catechisms, and the other Lutheran Confessions gathered in the Book of Concord — because they are a faithful exposition of Holy Scripture. Confessional Lutheran teaching shapes every title we choose to translate.",
  },
  {
    title: "Heart language, free of charge",
    body:
      "People meet Christ best in the language they think and pray in. LHF Ethiopia translates, prints, and freely distributes Lutheran books in Amharic, Afaan Oromoo, Tigrinya, Somali, Sidaamu Afoo, and beyond — never sold, always given.",
  },
];

/* ============================================================
   STORIES — used by /stories and as teasers on the homepage
   ============================================================ */

export const STORIES = [
  {
    slug: "pastor-tadesse",
    name: "Pastor Tadesse Bekele",
    role: "Pastor",
    congregation: "St. Mark Lutheran · Mekelle",
    language: "Tigrinya",
    quote:
      "When the reprints arrived, I cried. For two years I had been preaching from notes in the margin of my one borrowed catechism. Now every elder in our parish has their own.",
    photo: "/photos/story-pastor-1.jpg",
  },
  {
    slug: "selam-teacher",
    name: "Selam Girma",
    role: "Sunday school teacher",
    congregation: "Bole Lutheran · Addis Ababa",
    language: "Amharic",
    quote:
      "The children's Bible stories in Amharic changed our Sunday school. The kids read aloud to their parents at home — sometimes the parents are the ones who learn.",
    photo: "/photos/story-teacher-1.jpg",
  },
  {
    slug: "abdi-translator",
    name: "Abdi Lemma",
    role: "Translator",
    congregation: "LHF Ethiopia · Oromia desk",
    language: "Afaan Oromoo",
    quote:
      "Translating Luther into Afaan Oromoo is not just word-for-word. We choose words a farmer in Bale would actually say, so the catechism lives in the language of the kitchen, not the lecture hall.",
    photo: "/photos/story-translator-1.jpg",
  },
  {
    slug: "almaz-deaconess",
    name: "Almaz Wolde",
    role: "Deaconess",
    congregation: "Hawassa Lutheran · Sidama",
    language: "Sidaamu Afoo",
    quote:
      "For the first time in my lifetime, I am holding a Lutheran book in Sidaamu Afoo. It is one small first edition — and it is everything.",
    photo: "/photos/story-deaconess-1.jpg",
  },
  {
    slug: "yohannes-printer",
    name: "Yohannes Asfaw",
    role: "Print partner",
    congregation: "Addis Ababa press",
    language: "Multilingual",
    quote:
      "Most jobs through our press are textbooks or government forms. LHF Ethiopia is different — when those books leave the dock, they leave for free, and the press knows it.",
    photo: "/photos/story-printer-1.jpg",
  },
] as const;

/* ============================================================
   PODCAST — featured digital-outreach programme
   ============================================================ */

export const PODCAST = {
  title: "Scripture Alone Podcast",
  native: "ቃሉ ብቻ ፖድካስት",
  tagline: "Sola Scriptura. Bible study in Amharic and English.",
  host: "Featured partner podcast",
  hostBio:
    "An Ethiopian Bible-study podcast featured by LHF Ethiopia as part of its digital outreach. Confessional teaching grounded in scripture alone — episodes range from Luther's Small Catechism to verse-by-verse studies of 1 Timothy.",
  description:
    "An Ethiopian video podcast — confessional Bible study in Amharic (ቃሉ ብቻ ፖድካስት) and English. Sola Scriptura, the Small Catechism, and walk-through studies of scripture. Watch on YouTube, or listen on Spotify, Apple Podcasts, and Telegram.",
  cadence: "New episodes weekly",
  channelUrl: "https://www.youtube.com/@scripturealonepodcast6447",
  // Featured player on Home + /podcast hero. Latest full episode at time of
  // writing (Ep 129 — Salvation by Faith). Refresh as new episodes drop.
  featuredYoutubeId: "znymBLaMsYY",
  platforms: [
    {
      name: "YouTube",
      href: "https://www.youtube.com/@scripturealonepodcast6447",
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/show/4yMPgfglhDyuNe5xe8WSwh",
    },
    {
      name: "Apple Podcasts",
      href: "https://podcasts.apple.com/us/podcast/scripture-alone-podcast/id1536167258",
    },
    {
      name: "Telegram",
      href: "https://t.me/solascripturakalubicha",
    },
  ],
} as const;

// Real video IDs pulled from the Scripture Alone Podcast YouTube channel
// (https://www.youtube.com/@scripturealonepodcast6447) on 2026-06-15.
// To refresh: fetch the channel RSS feed at
// https://www.youtube.com/feeds/videos.xml?channel_id=UCH4uGyZQCCvrppCIFN_V_Wg
export const PODCAST_EPISODES = [
  {
    slug: "ep-129-salvation-by-faith",
    number: 129,
    title: "Salvation by Faith — መዳን በእምነት",
    guest: "Scripture Alone Podcast",
    durationMin: 38,
    date: "2025-09-24",
    summary:
      "Salvation by faith alone, or by faith plus works? A scripture-grounded walk-through of the Lutheran answer in Amharic and English.",
    language: "Amharic / English",
    topic: "Doctrine",
    youtubeId: "znymBLaMsYY",
  },
  {
    slug: "ep-128-original-sin",
    number: 128,
    title: "Original Sin — የውርስ ሃጥያት",
    guest: "Scripture Alone Podcast",
    durationMin: 36,
    date: "2025-09-20",
    summary:
      "What does scripture teach about original sin, and how does it shape the way we read the Gospel? Episode 128, in Amharic with English exposition.",
    language: "Amharic / English",
    topic: "Doctrine",
    youtubeId: "AwCX027ON2Q",
  },
  {
    slug: "ep-127-1-tim-1-our-hope",
    number: 127,
    title: "1 Timothy 1:1 — Our Hope, Jesus Christ",
    guest: "Scripture Alone Podcast",
    durationMin: 34,
    date: "2025-09-17",
    summary:
      "Verse-by-verse study of 1 Timothy 1:1 — ተስፋችን እየሱስ ክርስቶስ. Why Paul opens with hope, and what it means for the Ethiopian church today.",
    language: "Amharic / English",
    topic: "Bible Study",
    youtubeId: "QhfxfbGyTPQ",
  },
  {
    slug: "ep-126-small-catechism",
    number: 126,
    title: "Luther's Small Catechism — የሉተር ትንሹ ካቴኪዝም",
    guest: "Scripture Alone Podcast",
    durationMin: 41,
    date: "2025-09-13",
    summary:
      "Why the Small Catechism still matters 500 years on — a walk-through of its structure and how it shapes parish life in Ethiopia.",
    language: "Amharic / English",
    topic: "Catechism",
    youtubeId: "cB6dp_EChg4",
  },
  {
    slug: "short-salvation-by-faith",
    number: 0,
    title: "Salvation by Faith — short clip",
    guest: "Scripture Alone Podcast",
    durationMin: 1,
    date: "2025-09-22",
    summary:
      "A one-minute clip from the Original Sin episode — what scripture says about inherited sin.",
    language: "Amharic",
    topic: "Doctrine",
    youtubeId: "_4Ar2_XYKCw",
  },
  {
    slug: "short-our-hope-jesus",
    number: 0,
    title: "Our Hope, Jesus Christ — short clip",
    guest: "Scripture Alone Podcast",
    durationMin: 1,
    date: "2025-09-18",
    summary:
      "ተስፋችን እየሱስ ክርስቶስ — a short reflection from the 1 Timothy series.",
    language: "Amharic",
    topic: "Bible Study",
    youtubeId: "yoAqqhUJbJI",
  },
  {
    slug: "short-small-catechism",
    number: 0,
    title: "Small Catechism — short clip",
    guest: "Scripture Alone Podcast",
    durationMin: 1,
    date: "2025-09-13",
    summary:
      "Why every Lutheran congregation needs a copy of Luther's Small Catechism in its heart language.",
    language: "Amharic",
    topic: "Catechism",
    youtubeId: "uw8hL9rfe2U",
  },
  {
    slug: "short-channel-trailer",
    number: 0,
    title: "Channel trailer — ቃሉ ብቻ ፖድካስት",
    guest: "Scripture Alone Podcast",
    durationMin: 1,
    date: "2025-09-26",
    summary:
      "A short introduction to the show — scripture alone, in Amharic, for the Ethiopian church.",
    language: "Amharic",
    topic: "Bible Study",
    youtubeId: "CxBWXGWRFls",
  },
] as const;

/* ============================================================
   EVENTS — distribution, training, gatherings
   ============================================================ */

export const EVENTS = [
  {
    slug: "addis-distribution-day-jun",
    title: "Addis Distribution Day",
    date: "2026-07-12",
    location: "Bole warehouse, Addis Ababa",
    audience: "Pastors & parish administrators",
    summary:
      "Quarterly hand-off of new shipments to Addis-area congregations. Bring your parish letter and we&apos;ll load your cart.",
    status: "Upcoming",
  },
  {
    slug: "mekelle-pastor-training-aug",
    title: "Mekelle Pastor Training Weekend",
    date: "2026-08-23",
    location: "St. Mark Lutheran, Mekelle",
    audience: "Pastors from Tigray and Amhara",
    summary:
      "Two-day training on using the Tigrinya catechism in parish life, with discussion sessions led by Pastor Tadesse.",
    status: "Upcoming",
  },
  {
    slug: "hawassa-sidaama-launch",
    title: "Sidaamu Afoo First-Edition Launch",
    date: "2026-09-14",
    location: "Hawassa University Chapel",
    audience: "Open to the public",
    summary:
      "Public launch of the first Lutheran catechism in Sidaamu Afoo. Open service, music, and book hand-off to delegated parishes.",
    status: "Upcoming",
  },
  {
    slug: "addis-podcast-live-may",
    title: "Live Podcast Recording — Reformation Music",
    date: "2026-05-04",
    location: "Bole studio, Addis Ababa",
    audience: "Public",
    summary:
      "Live audience recording of The Word at Work — Ethiopia, featuring the St. Mark choir.",
    status: "Past",
  },
  {
    slug: "oromia-distribution-mar",
    title: "Oromia Spring Distribution",
    date: "2026-03-18",
    location: "Adama warehouse, Oromia",
    audience: "Pastors & parish leaders",
    summary:
      "Spring distribution of Afaan Oromoo children's Bible stories to 80 parishes across Oromia.",
    status: "Past",
  },
] as const;

/* ============================================================
   PHOTOS — Traditional / Ethiopian / paper-based imagery
   ------------------------------------------------------------
   Every URL below is a first-pass Unsplash placeholder chosen
   for an OLD / TRADITIONAL / SCRIPTURAL feel — not modern
   person close-ups. Photo team: replace with real Ethiopian
   Orthodox / Lalibela / Ge'ez manuscript / Ethiopian highlands
   imagery before public launch. Style brief:
     * leather-bound Bibles, illuminated pages, parchment
     * Lalibela rock-hewn churches, frescoes, Tigray plateaus
     * crowd backs (no close-up portraits)
     * Ethiopian crosses, processional crosses, censers
   ============================================================ */

export const PHOTOS = {
  // Vintage leather Bible — Aaron Burden's widely-used Unsplash photo
  heroPrimary:
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1400&q=80&auto=format&fit=crop",
  // Open Bible pages
  heroSecondary:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80&auto=format&fit=crop",
  // Antique books on shelf
  heroTertiary:
    "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=900&q=80&auto=format&fit=crop",
  // Congregation imagery (back of crowd, traditional setting). [TODO: replace
  // with traditional Ethiopian Orthodox church interior — Lalibela, Axum.]
  congregation:
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80&auto=format&fit=crop",
  openBible:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80&auto=format&fit=crop",
  bookshelf:
    "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=1200&q=80&auto=format&fit=crop",
  // [TODO: replace with traditional Ethiopian Sunday-school scene]
  childrenReading:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80&auto=format&fit=crop",
  // Hands holding a book/paper — kept generic
  handsHolding:
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80&auto=format&fit=crop",
  // [TODO: replace with Ge'ez manuscript / scribe at desk]
  translatorAtDesk:
    "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=1200&q=80&auto=format&fit=crop",
  // Print press — keep
  printPress:
    "https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80&auto=format&fit=crop",
  // Ethiopian highlands
  ethiopiaLandscape:
    "https://images.unsplash.com/photo-1580458148391-44b4baa3f9d2?w=1600&q=80&auto=format&fit=crop",
  // STORY PORTRAITS — currently set to the open-Bible photo as a placeholder
  // so we do not show generic modern close-ups. [TODO: photo team — supply
  // consented portraits of the actual congregation members named in STORIES.]
  pastor:
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=900&q=80&auto=format&fit=crop",
  teacher:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80&auto=format&fit=crop",
  translator:
    "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=900&q=80&auto=format&fit=crop",
  deaconess:
    "https://images.unsplash.com/photo-1580458148391-44b4baa3f9d2?w=900&q=80&auto=format&fit=crop",
  printer:
    "https://images.unsplash.com/photo-1568667256549-094345857637?w=900&q=80&auto=format&fit=crop",
  // Podcast + digital outreach — generic studio imagery
  podcastStudio:
    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1400&q=80&auto=format&fit=crop",
  podcastMic:
    "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80&auto=format&fit=crop",
  // [TODO: replace with Pastor Henok portrait]
  podcastHost:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80&auto=format&fit=crop",
  music:
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80&auto=format&fit=crop",
  // Events — gathering / training / distribution
  eventGathering:
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80&auto=format&fit=crop",
  eventTraining:
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80&auto=format&fit=crop",
  eventDistribution:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80&auto=format&fit=crop",
} as const;

/* ============================================================
   CHART DATA — feeds the ApexCharts panels on Home and Donate
   ============================================================ */

export const IMPACT_TIMESERIES = {
  years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"],
  series: [
    { name: "Amharic", data: [1200, 2400, 3600, 5200, 7800, 11200, 14200] },
    { name: "Afaan Oromoo", data: [400, 900, 1600, 2800, 4400, 6500, 9100] },
    { name: "Tigrinya", data: [200, 600, 1100, 1700, 1900, 4200, 6300] },
    { name: "Other heart languages", data: [0, 0, 200, 600, 1400, 2800, 4500] },
  ],
} as const;

export const TITLES_PER_LANGUAGE = [
  { language: "Amharic", titles: 14 },
  { language: "Afaan Oromoo", titles: 9 },
  { language: "Tigrinya", titles: 6 },
  { language: "Somali", titles: 2 },
  { language: "Sidaamu Afoo", titles: 1 },
  { language: "Wolayttattuwaa", titles: 0 },
] as const;

export const ALLOCATION = [
  { label: "Printing & paper", value: 42 },
  { label: "Translation review", value: 28 },
  { label: "Distribution & customs", value: 22 },
  { label: "Operations & admin", value: 8 },
] as const;

/* ============================================================
   PARTNER LOGOS — string list for the marquee strip
   ============================================================ */

export const PARTNERS = [
  "Lutheran Heritage Foundation",
  "Lutheran Church — Missouri Synod",
  "Mekane Yesus Seminary",
  "Ethiopian Evangelical Lutheran Church",
  "Wittenberg Project",
  "Concordia Publishing",
  "St. Paul's, Mekelle",
  "Addis Lutheran Press",
] as const;

export function formatUsd(cents: number) {
  return `$${cents.toLocaleString("en-US")}`;
}
