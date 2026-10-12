/**
 * தமிழ் கற்றல் மையம் · Tamil Study Hub
 * Premium Frontend Controller with Bilingual Support (Tamil & English)
 */

const $ = (id) => document.getElementById(id);
const esc = (t) =>
  String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const safeUrl = (u) => (/^https?:\/\//i.test(u) ? u : "#");

// Language & Translations (i18n)
let currentLang = localStorage.getItem("hubLang") || "ta";

const i18n = {
  ta: {
    brandTitle: "தமிழ் கற்றல் மையம்",
    brandSub: "· Tamil Study Hub",
    brandGrade: "11 & 12-ஆம் வகுப்பு மேல்நிலை",
    brandTeacher: "👩‍🏫 வழிகாட்டுதல்: எலிசபெத் ராத்தி (Elizabeth Rathi, M.A., B.Ed.)",
    wisdomTamil: "📖 \"கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக\" — திருக்குறள் 391",
    wisdomEn: "(\"கற்க வேண்டியவற்றை பிழையின்றி கற்க; கற்றபின் அதன்படி வாழ்க.\")",
    serverOnline: "இணைக்கப்பட்டது (Live)",
    serverOffline: "இணைப்பு இல்லை (Offline)",
    classAll: "அனைத்தும் (All)",
    class11: "11-ஆம் வகுப்பு",
    class12: "12-ஆம் வகுப்பு",
    searchPlaceholder: "தேடுக: பாடங்கள், கவிதைகள், வினாத்தாள்கள், காணொளிகள்…",
    tabLesson: "பாடங்கள் (Lessons)",
    tabHomework: "வீட்டுப்பாடம் (Homework)",
    tabPaper: "வினாத்தாள்கள் (Papers)",
    tabVideo: "காணொளிகள் (Videos)",
    tabAdmin: "ஆசிரியர் தளம் (Admin)",
    allCategories: "அனைத்துப் பிரிவுகள் (All Categories)",
    allYears: "அனைத்து ஆண்டுகள் (All Years)",
    foundItems: (count) => `${count} பாடப் பொருட்கள் கண்டறியப்பட்டன`,
    forClass: (cls) => ` · வகுப்பு ${cls}`,
    inCat: (cat) => ` · "${cat}"`,
    resetFilters: "வடிகட்டிகளை மீட்டமை ↺",
    emptyTitle: "தேடல் முடிவுகள் கிடைக்கவில்லை",
    emptyDesc: "உங்கள் தேடலுக்கு ஏற்ற பாடக்குறிப்புகள் அல்லது வினாத்தாள்கள் எதுவும் கிடைக்கவில்லை.",
    emptyShowAll: "அனைத்தையும் காண்க (Show All)",
    classPrefix: (cls) => `வகுப்பு ${cls} (Class ${cls})`,
    yearPrefix: (yr) => `ஆண்டு ${yr}`,
    readNotesHint: "பாடக் குறிப்புகளைப் படிக்க அழுத்தவும் (Tap to read notes)",
    copyNotes: "குறிப்புகளை நகலெடு (Copy Notes)",
    notesCopied: "பாடக் குறிப்புகள் நகலெடுக்கப்பட்டன!",
    openPdf: "பார்வையிடுக (Open PDF)",
    downloadPaper: "வினாத்தாளைப் பதிவிறக்கு (Download Paper)",
    watchVideo: "காணொளியைக் காண்க (Watch Video)",
    watchYt: "YouTube-இல் காண்க ↗",
    logout: "வெளியேறு (Logout)",
    loginTitle: "தமிழ் கற்றல் மையம்",
    loginSub: "11 & 12-ஆம் வகுப்பு மாணவர் மற்றும் ஆசிரியர் தளம்",
    studentAccess: "மாணவர் அனுமதி (Student Access)",
    adminAccess: "ஆசிரியர் தளம் (Admin)",
    usernameLabel: "பயனர் பெயர் / Username",
    passwordLabel: "கடவுச்சொல் / Password",
    signInBtn: "உள்நுழைக / Sign In",
    connecting: "இணைக்கப்படுகிறது…",
    sessionExpired: "அமர்வு முடிந்தது. மீண்டும் உள்நுழையவும்.",
    welcome: (role) => `நல்வரவு ${role === "admin" ? "எலிசபெத் ராத்தி" : "மாணவர்"}!`,
    adminWelcome: "வணக்கம், ஆசிரியர் எலிசபெத் ராத்தி (Elizabeth Rathi)",
    adminSub: "11 & 12-ஆம் வகுப்பு தமிழ் ஆசிரியர் கட்டுப்பாட்டு அறை (Admin Dashboard)",
    statLessons: "பாடக் குறிப்புகள் (Lessons)",
    statHomework: "வீட்டுப்பாடங்கள் (Homework)",
    statPapers: "வினாத்தாள்கள் (Papers)",
    statVideos: "காணொளிகள் (Videos)",
    statFiles: "PDF ஆவணங்கள் (Files)",
    addNewTitle: "புதிய பாடக் குறிப்பு / வினாத்தாள் சேர்க்க (Add New Material)",
    contentType: "வகையைத் தேர்வு செய்க (Content Type)",
    optLesson: "📚 பாடக் குறிப்பு (Lesson Notes)",
    optHomework: "✍️ வீட்டுப்பாடம் (Homework / Task)",
    optPaper: "📝 வினாத்தாள் (Question Paper)",
    optVideo: "🎬 வழிகாட்டல் காணொளி (Video)",
    hwCompleted: "முடித்தேன் (Completed)",
    hwPending: "செய்ய வேண்டும் (To Do)",
    hwCopied: "வீட்டுப்பாட விபரங்கள் நகலெடுக்கப்பட்டன!",
    classField: "வகுப்பு (Class)",
    titleField: "தலைப்பு (Title) *",
    titlePlaceholder: "எ.கா: இயல் 1: இளந்தமிழே - கவிதைப்பேழை விளக்கம்",
    catField: "பிரிவு (Category)",
    catPlaceholder: "செய்யுள் / உரைநடை / இலக்கணம் / பொதுத் தேர்வு…",
    yearField: "ஆண்டு (Year - வினாத்தாள்களுக்கு)",
    yearPlaceholder: "எ.கா: 2025 அல்லது 2024",
    notesField: "பாடக் குறிப்பு உரை அல்லது YouTube இணைப்பு (Notes / Video URL)",
    notesPlaceholder: "பாடக் குறிப்புகளின் முழு விபரம், அல்லது YouTube காணொளி முகவரி (https://youtube.com/...)",
    pdfUploadLabel: "PDF ஆவணம் பதிவேற்றம் (Max 8 MB)",
    dropzoneText: "PDF கோப்பைத் தேர்ந்தெடுக்க இங்கே கிளிக் செய்யவும் அல்லது இழுத்து விடவும்",
    dropzoneSub: "Click to browse or drag and drop a PDF file (Max 8 MB)",
    publishBtn: "+ புதியதைப் பதிவேற்றுக (Publish Material)",
    uploading: "⏳ பதிவேற்றப்படுகிறது…",
    studentPwTitle: "மாணவர் கடவுச்சொல் மேலாண்மை (Student Password Security)",
    studentPwDesc: "மாணவர்கள் அனைவரும் ஒரே பொது கடவுச்சொல்லைப் பயன்படுத்தி உள்நுழையலாம். புதிய கடவுச்சொல்லை இங்கே மாற்றவும்:",
    newPwPlaceholder: "புதிய கடவுச்சொல் (New password for students)",
    changePwBtn: "கடவுச்சொல் மாற்று",
    manageContentTitle: "பதிவேற்றப்பட்ட பாடங்கள் & வினாத்தாள்களை நிர்வகிக்க (Manage & Delete)",
    filterItemsPlaceholder: "🔍 தலைப்பின் மூலம் தேடுக (Filter items to delete)…",
    deleteBtn: "நீக்கு (Delete)",
    confirmDeleteTitle: "பாடப் பொருள் நீக்கம் (Confirm Delete)",
    confirmDeleteMsg: (title) => `"${title}" என்ற பதிவை நிச்சயமாக நீக்க விரும்புகிறீர்களா?`,
    itemDeleted: "பதிவு நீக்கப்பட்டது.",
    publishedSuccess: "வெற்றிகரமாகப் பதிவேற்றப்பட்டது!",
    pwUpdated: "கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது!",
    footerBrand: "தமிழ் கற்றல் மையம் (Tamil Study Hub)",
    footerGrade: "11-ஆம் & 12-ஆம் வகுப்பு பாடத்திட்டம் · Higher Secondary Tamil",
    footerTeacher: "வழிகாட்டுதல்: எலிசபெத் ராத்தி (Elizabeth Rathi)",
    heroBadge: "✨ தமிழ்நாடு மேல்நிலைக் கல்வித் தளம் · Tamil Nadu HSC Excellence",
    heroTitle: "தமிழ் கற்றல் மையம்",
    heroSub: "11 மற்றும் 12-ஆம் வகுப்பு பொதுத்தேர்வுக்கான முழுமையான செய்யுள், உரைநடை, இலக்கணக் குறிப்புகள், மாதிரி வினாத்தாள்கள் மற்றும் வழிகாட்டல் தளம்.",
    heroTeacherTitle: "முதுகலைத் தமிழாசிரியர் வழிகாட்டல்",
    heroStartBtn: "🚀 மாணவ உள்நுழைவு (Student Sign In)",
    heroDemoBtn: "⚡ மாதிரி முன்னோட்டம் (Guest Demo Portal)",
    featureLessonsTitle: "இயல்வாரிக் குறிப்புகள் (Curated Notes)",
    featureLessonsDesc: "11 & 12-ஆம் வகுப்பு செய்யுள், உரைநடை, துணைப்பாடம் மற்றும் இலக்கணம் ஆகியவற்றுக்கான எளிய நயவுரை மற்றும் வினா-விடைகள்.",
    featureHomeworkTitle: "வீட்டுப்பாடப் பணிகள் (Homework & Tasks)",
    featureHomeworkDesc: "11 & 12-ஆம் வகுப்பு செய்யுள், உரைநடை மற்றும் இலக்கண வினா-விடைப் பயிற்சிகள், மாணவர் பணி முடித்தல் கண்காணிப்பு.",
    featurePapersTitle: "மாதிரி வினாத்தாள்கள் (Model Papers)",
    featurePapersDesc: "அரசு பொதுத்தேர்வு மாதிரி வினாத்தாள்கள், முந்தைய ஆண்டுக் கேள்வித்தாள்கள் மற்றும் விரிவான விடைக்குறிப்புகள்.",
    featureVideosTitle: "காணொளிப் பாடங்கள் (Video Lectures)",
    featureVideosDesc: "செய்யுள் பாடல் பண்ணிசை விளக்கம், இலக்கண விதிகள் மற்றும் தேர்வுக்கான வழிகாட்டல் விரிவுரைகள்.",
    guestDemoBadge: "✨ மாதிரி முன்னோட்ட நிலை (Guest Demo Mode)",
    guestDemoNotice: "நீங்கள் தற்போது மாதிரி முன்னோட்டத்தில் உள்ளீர்கள். பாடங்கள், வினாத்தாள்கள் மற்றும் காணொளிகளை முழுமையாக ஆராயலாம்!",
    exitDemoBtn: "வெளியேறு (Exit Demo)"
  },
  en: {
    brandTitle: "Tamil Study Hub",
    brandSub: "· Higher Secondary Portal",
    brandGrade: "11th & 12th Higher Secondary Tamil",
    brandTeacher: "👩‍🏫 Managed by Elizabeth Rathi, M.A., B.Ed.",
    wisdomTamil: "📖 \"Learn thoroughly what should be learned, and live according to what you have learned.\"",
    wisdomEn: "(Thirukkural 391: \"Karka Kasadara Karpavai Kattrapin Nitka Atharkuth Thaka\")",
    serverOnline: "Live",
    serverOffline: "Server Offline",
    classAll: "All Classes",
    class11: "Class 11",
    class12: "Class 12",
    searchPlaceholder: "Search lessons, poetry, question papers, videos…",
    tabLesson: "Lessons",
    tabHomework: "Homework",
    tabPaper: "Question Papers",
    tabVideo: "Videos",
    tabAdmin: "Admin Studio",
    allCategories: "All Categories",
    allYears: "All Years",
    foundItems: (count) => `Found ${count} study material${count === 1 ? "" : "s"}`,
    forClass: (cls) => ` · Class ${cls}`,
    inCat: (cat) => ` · "${cat}"`,
    resetFilters: "Reset filters ↺",
    emptyTitle: "No Study Materials Found",
    emptyDesc: "No lessons, papers, or videos matched your search query. Try clearing your filters.",
    emptyShowAll: "Show All Materials",
    classPrefix: (cls) => `Class ${cls}`,
    yearPrefix: (yr) => `Year ${yr}`,
    readNotesHint: "Tap to read full revision notes",
    copyNotes: "Copy Notes",
    notesCopied: "Lesson notes copied to clipboard!",
    openPdf: "Open PDF Document",
    downloadPaper: "Download Question Paper",
    watchVideo: "Watch Video Lecture",
    watchYt: "Watch on YouTube ↗",
    logout: "Logout",
    loginTitle: "Tamil Study Hub",
    loginSub: "Class 11 & 12 Higher Secondary Portal",
    studentAccess: "Student Access",
    adminAccess: "Teacher (Admin)",
    usernameLabel: "Username",
    passwordLabel: "Password",
    signInBtn: "Sign In",
    connecting: "Connecting to study hub…",
    sessionExpired: "Session expired. Please log in again.",
    welcome: (role) => `Welcome ${role === "admin" ? "Elizabeth Rathi" : "Student"}!`,
    adminWelcome: "Welcome, Teacher Elizabeth Rathi",
    adminSub: "Class 11 & 12 Tamil Teacher Dashboard (Admin Studio)",
    statLessons: "Lesson Notes",
    statHomework: "Homework & Tasks",
    statPapers: "Question Papers",
    statVideos: "Video Lectures",
    statFiles: "PDF Documents",
    addNewTitle: "Publish New Study Material",
    contentType: "Content Type",
    optLesson: "📚 Lesson Notes",
    optHomework: "✍️ Homework / Task",
    optPaper: "📝 Question Paper",
    optVideo: "🎬 Video Lecture",
    hwCompleted: "Completed ✓",
    hwPending: "Mark Done ○",
    hwCopied: "Homework task copied to clipboard!",
    classField: "Class",
    titleField: "Title *",
    titlePlaceholder: "e.g. Unit 1: Ilanthamizhe - Poetry Explanation",
    catField: "Category",
    catPlaceholder: "Poetry / Prose / Grammar / Public Exam…",
    yearField: "Year (Question Papers only)",
    yearPlaceholder: "e.g. 2025 or 2024",
    notesField: "Lesson Notes Text or YouTube Link",
    notesPlaceholder: "Complete notes content, or YouTube video link (https://youtube.com/...)",
    pdfUploadLabel: "Upload PDF Document (Max 8 MB)",
    dropzoneText: "Click or drag & drop a PDF file here",
    dropzoneSub: "Max file size: 8 MB",
    publishBtn: "+ Publish Material",
    uploading: "⏳ Uploading…",
    studentPwTitle: "Student Access Password Security",
    studentPwDesc: "All students use this shared password to log in. Update it below:",
    newPwPlaceholder: "New password for students",
    changePwBtn: "Update Password",
    manageContentTitle: "Manage & Delete Published Content",
    filterItemsPlaceholder: "🔍 Filter materials by title to delete…",
    deleteBtn: "Delete",
    confirmDeleteTitle: "Confirm Delete",
    confirmDeleteMsg: (title) => `Are you sure you want to delete "${title}"? This cannot be undone.`,
    itemDeleted: "Item deleted successfully.",
    publishedSuccess: "Material published successfully!",
    pwUpdated: "Student password updated successfully!",
    footerBrand: "Tamil Study Hub · தமிழ் கற்றல் மையம்",
    footerGrade: "Class 11 & 12 Higher Secondary Tamil Curriculum",
    footerTeacher: "Instructor: Elizabeth Rathi",
    heroBadge: "✨ Tamil Nadu Higher Secondary Excellence Portal",
    heroTitle: "Tamil Study Hub",
    heroSub: "Complete Higher Secondary Tamil curriculum: Poetry, Prose, Grammar notes, Board Question Papers & Video Tutorials for Classes 11 & 12.",
    heroTeacherTitle: "Post Graduate Tamil Teacher",
    heroStartBtn: "🚀 Student Sign In",
    heroDemoBtn: "⚡ Guest Demo Portal",
    featureLessonsTitle: "Curated Study Notes",
    featureLessonsDesc: "Comprehensive analysis, poetry explanations, prose summaries, and exam-oriented Q&A for Classes 11 & 12.",
    featureHomeworkTitle: "Homework & Tasks",
    featureHomeworkDesc: "Daily curriculum assignments, poetry recitation tasks, grammar exercises, and student completion tracking.",
    featurePapersTitle: "Model Board Papers",
    featurePapersDesc: "Official HSC model question papers, previous board exams, and full PDF answer keys with preview viewer.",
    featureVideosTitle: "Video Lectures",
    featureVideosDesc: "Melodic recitations, grammar breakdowns, and strategic exam scoring lectures.",
    guestDemoBadge: "✨ Guest Demo Mode",
    guestDemoNotice: "You are currently exploring the interactive Guest Demo. Browse all sample lessons, question papers, and videos!",
    exitDemoBtn: "Exit Demo"
  }
};

const t = (key, ...args) => {
  const dict = i18n[currentLang] || i18n.ta;
  const val = dict[key];
  if (typeof val === "function") return val(...args);
  return val != null ? val : key;
};

// Authentic Tamil Curriculum Sample Dataset (Used for Guest Demo & Offline Preview)
const sampleCurriculum = [
  {
    id: "sample-1",
    cls: "12",
    type: "lesson",
    title: "இயல் 1: இளந்தமிழே - கவிஞர் சிற்பி பாலசுப்பிரமணியம்",
    cat: "செய்யுள்",
    body: "இளந்தமிழே - கவிதைப் பேழை விரிவான பாடம்:\n\n1. ஆசிரியர் குறிப்பு:\nசிற்பி பாலசுப்பிரமணியம், 'நிலவுப்பூ' என்னும் கவிதைத் தொகுப்பிலிருந்து இப்பாடல் எடுக்கப்பட்டுள்ளது. இவர் சாகித்திய அகாதெமி விருது பெற்ற கவிஞர்.\n\n2. பாடல் வரிகள்:\n'செம்பரிதி மலைமேட்டில் தலையைச் சாய்ப்பான்;\nசெந்நிறத்துப் பூக்காடாம் வானமெல்லாம்!\nதம் கைகள் வருந்த உழைத்துழைத்துத் தேய்ந்த\nதோழர்களின் வியர்வைத் துளிகள் அவை!\n\nவிம்முகின்ற தோள்தழைத்த பாண்டியரின் தம்புகழை,\nசெப்பிப் புகழ்ந்திடவோ? செந்தமிழே நீ மீண்டும்\nபுத்துயிர் பெற்று எழுந்துவா!'\n\n3. மையக்கருத்து:\nதமிழ்மொழியின் தொன்மை, பாண்டி மன்னர்களின் வீரம், உழைக்கும் பாட்டாளி மக்களின் உன்னதம் ஆகியவற்றை நினைவுகூர்ந்து, தமிழன்னை மீண்டும் புத்துயிர்ப்புடன் எழவேண்டும் என கவிஞர் அழைக்கிறார்.\n\n4. முக்கியமான 4-மதிப்பெண் வினா:\n• செந்தமிழே நீ மீண்டுமொருமுறை புத்துயிர் பெற்று எழுந்துவா என்று கவிஞர் பாடக் காரணம் யாது? விளக்குக.",
    year: ""
  },
  {
    id: "sample-2",
    cls: "11",
    type: "lesson",
    title: "இயல் 1: யுகத்தின் பாடல் - கவிஞர் சு. வில்வரத்தினம்",
    cat: "செய்யுள்",
    body: "யுகத்தின் பாடல் - கவிதை நயமும் பொருளுணர்வும்:\n\n1. கவிஞர் அறிமுகம்:\nசு. வில்வரத்தினம் யாழ்ப்பாணத்தில் உள்ள புங்குடுதீவில் பிறந்தவர். காலத்தின் சுவடுகள் தாண்டி நிற்கும் தமிழின் வலிமையை கவிதையாக்கியுள்ளார்.\n\n2. பாடல் வரிகள்:\n'என் அம்மை ஒற்றி எடுத்த\nநெற்றிமண் அழகே,\nவழியெங்கும் நின்றாடும்\nவனப்பே, என் செழுந்தமிழே!\nஉன் பாடல் பாடுவதற்கு\nஎன் நாவில் அமுதூறும்!'\n\n3. வினா & விடை:\nவினா: யுகத்தின் பாடல் உணர்த்தும் முதன்மைச் செய்தி யாது?\nவிடை: காலவெள்ளத்தில் அழியாது நிற்கும் தமிழ் மொழியின் படைப்பாற்றலும், தாய்மொழிப் பற்றும் தமிழினத்தின் உயிர்ப்பாக விளங்குகிறது.",
    year: ""
  },
  {
    id: "sample-3",
    cls: "12",
    type: "lesson",
    title: "இயல் 2: நெடுநல்வாடை - நக்கீரர் (பத்துப்பாட்டு)",
    cat: "செய்யுள்",
    body: "நெடுநல்வாடை - அகமும் புறமும் இணைந்த சங்க இலக்கியம்:\n\n1. நூல் குறிப்பு:\nபத்துப்பாட்டு நூல்களுள் ஒன்று. 188 அடிகளைக் கொண்ட ஆசிரியப்பாவால் இயற்றப்பட்டது. ஆசிரியர்: மதுரைக்கணக்காயனார் மகனார் நக்கீரர்.\n\n2. திணை & துறை:\nதிணை: வாகைத்திணை (போர் வெற்றி)\nதுறை: கூதிர்ப்பாசறை (குளிர்காலத்தில் பாசறையில் அரசன் தங்கியிருத்தல்)\n\n3. பாடற் சிறப்பு:\nதலைவனைப் பிரிந்த தலைவிக்கு 'நெடிய வாடை'யாகவும், போர்க்களத்தில் வெற்றி காணும் தலைவனுக்கு 'நல்ல வாடை'யாகவும் விளங்குவதால் 'நெடுநல்வாடை' எனப் பெயர் பெற்றது.\n\n4. தேர்வுக்குரிய வினாக்கள்:\n• கூதிர்ப்பருவத்தில் விலங்குகளும் மனிதர்களும் எவ்வாறெல்லாம் வருந்தினர்?\n• 'நெடுநல்வாடை' பெயர் அமைப்புக் காரணத்தை நிறுவுக.",
    year: ""
  },
  {
    id: "sample-4",
    cls: "11",
    type: "lesson",
    title: "இயல் 2: நன்னூல் பாயிரம் - பவணந்தி முனிவர்",
    cat: "இலக்கணம்",
    body: "நன்னூல் பாயிரம் - தமிழ் இலக்கண மரபு:\n\n1. ஆசிரியர் குறிப்பு:\nபவணந்தி முனிவர் இயற்றிய தமிழ் இலக்கண நூல் நன்னூல். இது எழுத்ததிகாரம், சொல்லதிகாரம் என இரு பகுதிகளைக் கொண்டது.\n\n2. முகவுரை (பாயிரம்) வகைகள்:\n• பொதுப்பாயிரம் - நூலின் பொதுவான இலக்கணம்\n• சிறப்புப்பாயிரம் - நூலின் தனிப்பட்ட சிறப்புகள்\n\n3. பாடல் வரிகள்:\n'ஆயிர முகத்தான் அகன்ற தாயினும்,\nபாயிர மில்லது பனுவ லன்றே'\n\nவிளக்கம்: ஆயிரம் முகங்களைக் கொண்டு விரிவாக இயற்றப்பட்ட நூலாயினும், பாயிரம் இல்லாத நூல் சிறந்த நூலாகக் கருதப்படாது.",
    year: ""
  },
  {
    id: "sample-5",
    cls: "12",
    type: "paper",
    title: "12-ஆம் வகுப்பு பொதுத்தேர்வு மாதிரி வினாத்தாள் - 2025 (HSC Tamil Model Paper)",
    cat: "பொதுத் தேர்வு",
    year: "2025",
    body: "https://dge.tn.gov.in/",
    fileName: "12th_Tamil_Public_Model_Paper_2025.pdf"
  },
  {
    id: "sample-6",
    cls: "11",
    type: "paper",
    title: "11-ஆம் வகுப்பு பொது மாதிரி வினாத்தாள் & விடைக் குறிப்பு - 2024",
    cat: "அரசுத் தேர்வு",
    year: "2024",
    body: "https://dge.tn.gov.in/",
    fileName: "11th_Tamil_Annual_Model_Exam_2024.pdf"
  },
  {
    id: "sample-7",
    cls: "12",
    type: "paper",
    title: "12-ஆம் வகுப்பு காலாண்டுப் பொது வினாத்தாள் - 2024",
    cat: "காலாண்டுத் தேர்வு",
    year: "2024",
    body: "https://dge.tn.gov.in/",
    fileName: "12th_Tamil_Quarterly_Exam_2024.pdf"
  },
  {
    id: "sample-8",
    cls: "12",
    type: "video",
    title: "12-ஆம் வகுப்பு தமிழ் - இயல் 1 முழுமையான கவிதை நயம் & மையக்கருத்து விரிவுரை",
    cat: "காணொளி பாடம்",
    year: "",
    body: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "sample-9",
    cls: "11",
    type: "video",
    title: "11-ஆம் வகுப்பு தமிழ் - நன்னூல் பொதுப்பாயிரம் இலக்கண விளக்கம்",
    cat: "இலக்கணம்",
    year: "",
    body: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "sample-hw-1",
    cls: "12",
    type: "homework",
    title: "12-ஆம் வகுப்பு: இயல் 1 இளந்தமிழே - கவிதை நயமும் உருவக அணிப் பயிற்சியும்",
    cat: "கவிதை நயம் & அணி",
    year: "Due: Fri",
    body: "📝 வீட்டுப்பாடக் குறிப்புகள் & வினாக்கள்:\n\n1. 'செம்பரிதி மலைமேட்டில் தலையைச் சாய்ப்பான்' - இத்தொடரில் பயின்றுவரும் உருவக நயத்தையும் கற்பனை வளத்தையும் 4 வரிகளில் விளக்குக.\n2. சிற்பி பாலசுப்பிரமணியம் தமிழ் மொழியினை எவ்வாறு போற்றிப் பாடுகிறார்? மையக்கருத்தை எழுதி வரவும்.\n3. இலக்கணப் பயிற்சி: உவமை அணிக்கும் உருவக அணிக்கும் உள்ள வேறுபாடுகள் இரண்டு கூறுக.\n\n📅 சமர்ப்பிக்க வேண்டிய இறுதி நாள்: இவ்வார இறுதிக்குள் தமிழ் வகுப்பேட்டில் எழுதிச் சமர்ப்பிக்கவும்."
  },
  {
    id: "sample-hw-2",
    cls: "11",
    type: "homework",
    title: "11-ஆம் வகுப்பு: இயல் 1 யுகத்தின் பாடல் - மனப்பாடப் பாடல் & நெடுவினா தயாரிப்பு",
    cat: "மனப்பாடம் & நெடுவினா",
    year: "Due: Mon",
    body: "📝 வீட்டுப்பாடப் பணிகள்:\n\n1. 'என் அம்மை ஒற்றி எடுத்த...' எனத் தொடங்கும் செய்யுள் வரிகளைப் பிழையின்றி 2 முறை வகுப்பேட்டில் எழுதிப் பழகவும்.\n2. தாய்மொழிப்பற்று குறித்து கவிஞர் வில்வரத்தினம் உணர்த்தும் செய்திகளைத் தொகுத்து ஒரு பக்கக் கட்டுரையாக வரைக.\n3. கலைச்சொல் தருக: Aesthetic, Literature, Classical Language.\n\n📌 மதிப்பீடு: 10 மதிப்பெண்கள்."
  },
  {
    id: "sample-hw-3",
    cls: "12",
    type: "homework",
    title: "12-ஆம் வகுப்பு: இயல் 2 நெடுநல்வாடை - கூதிர்ப்பருவப் பின்னணி அகப்பொருள் ஆய்வு",
    cat: "அகப்பொருள் ஆய்வு",
    year: "Due: Wed",
    body: "📝 வீட்டுப்பாடக் கேள்விகள்:\n\n1. குளிர்காலத்தில் (கூதிர்ப்பருவம்) மாடுகளும் பறவைகளும் எவ்வாறு வருந்தின என நக்கீரர் விளக்குகிறார்?\n2. வாகைத்திணை மற்றும் கூதிர்ப்பாசறை துறை விளக்கம் தருக.\n3. தலைவியின் பிரிவாற்றாமையை நக்கீரர் எவ்வாறு விவரிக்கிறார்?"
  }
];

// Core State
let items = [];
let tab = "lesson";
let cat = "";
let yr = "";
let role = null;
let token = null;
let loadError = "";

// Saved Theme & Auth Retrieval
try {
  role = sessionStorage.getItem("hubRole");
  token = sessionStorage.getItem("hubToken");
} catch (e) {}
if (!token || (role !== "student" && role !== "admin" && role !== "guest")) {
  role = null;
  token = null;
}

/* ==========================================================================
   Language Switcher & UI Synchronizer
   ========================================================================== */
function setLanguage(lang) {
  if (lang !== "ta" && lang !== "en") return;
  currentLang = lang;
  localStorage.setItem("hubLang", lang);
  document.documentElement.lang = lang;

  // Update active pill button
  document.querySelectorAll(".lang-pill-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Update static layout elements
  if ($("brand-title")) $("brand-title").textContent = t("brandTitle");
  if ($("brand-sub")) $("brand-sub").textContent = t("brandSub");
  if ($("brand-grade")) $("brand-grade").textContent = t("brandGrade");
  if ($("brand-teacher")) $("brand-teacher").textContent = t("brandTeacher");
  if ($("wisdom-line-1")) $("wisdom-line-1").textContent = t("wisdomTamil");
  if ($("wisdom-line-2")) $("wisdom-line-2").textContent = t("wisdomEn");

  if ($("btn-class-all")) $("btn-class-all").textContent = t("classAll");
  if ($("btn-class-11")) $("btn-class-11").textContent = t("class11");
  if ($("btn-class-12")) $("btn-class-12").textContent = t("class12");

  if ($("q")) $("q").placeholder = t("searchPlaceholder");

  if ($("tab-label-lesson")) $("tab-label-lesson").textContent = t("tabLesson");
  if ($("tab-label-homework")) $("tab-label-homework").textContent = t("tabHomework");
  if ($("tab-label-paper")) $("tab-label-paper").textContent = t("tabPaper");
  if ($("tab-label-video")) $("tab-label-video").textContent = t("tabVideo");
  if ($("tab-label-admin")) $("tab-label-admin").textContent = t("tabAdmin");

  if ($("btn-logout-label")) $("btn-logout-label").textContent = t("logout");
  if ($("footer-brand")) $("footer-brand").textContent = t("footerBrand");
  if ($("footer-grade")) $("footer-grade").textContent = t("footerGrade");
  if ($("footer-teacher")) $("footer-teacher").textContent = t("footerTeacher");

  // Synchronize server status badge with active language
  updateServerStatus();

  // Synchronize user role badge with active language
  const userBadge = $("user-badge");
  if (userBadge && role) {
    userBadge.textContent =
      role === "admin"
        ? (currentLang === "ta" ? "👩‍🏫 எலிசபெத் ராத்தி (ஆசிரியர்)" : "👩‍🏫 Elizabeth Rathi (Admin)")
        : role === "guest"
        ? t("guestDemoBadge")
        : (currentLang === "ta" ? "👨‍🎓 மாணவர் (Student)" : "👨‍🎓 Student");
  }

  // Re-render active view
  if (!role) {
    gate();
  } else if (tab === "admin") {
    adminView();
  } else {
    filters();
    draw();
  }
}

// Bind language buttons
document.querySelectorAll(".lang-pill-btn").forEach((btn) => {
  btn.onclick = () => setLanguage(btn.dataset.lang);
});

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = "info", duration = 3200) {
  const container = $("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
  toast.innerHTML = `<span style="font-weight:700;font-size:1.1rem">${icon}</span> <span>${esc(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

/* ==========================================================================
   Custom Confirmation Dialog Modal
   ========================================================================== */
function showConfirm(title, message) {
  return new Promise((resolve) => {
    const modal = $("confirm-modal");
    $("confirm-modal-title").textContent = title;
    $("confirm-modal-msg").textContent = message;
    modal.style.display = "flex";

    const cleanup = (result) => {
      modal.style.display = "none";
      $("confirm-modal-btn").onclick = null;
      $("confirm-modal-cancel").onclick = null;
      $("confirm-modal-close").onclick = null;
      resolve(result);
    };

    $("confirm-modal-btn").onclick = () => cleanup(true);
    $("confirm-modal-cancel").onclick = () => cleanup(false);
    $("confirm-modal-close").onclick = () => cleanup(false);
  });
}

/* ==========================================================================
   Theme Controller (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const saved = localStorage.getItem("hubTheme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeButton(theme);

  $("theme-toggle").onclick = () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("hubTheme", next);
    updateThemeButton(next);
  };
}

function updateThemeButton(theme) {
  const btn = $("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

/* ==========================================================================
   API Communication
   ========================================================================== */
let isServerOnline = null;

function updateServerStatus(online) {
  if (typeof online === "boolean") {
    isServerOnline = online;
  }
  const pill = $("api-status");
  const text = $("api-status-text");
  if (!text) return;

  if (isServerOnline === true) {
    if (pill) {
      pill.className = "api-status-pill";
      pill.title = currentLang === "ta" ? "சேவையகம் இணைக்கப்பட்டுள்ளது (Live)" : "Server Connected (Live)";
    }
    text.textContent = t("serverOnline");
  } else if (isServerOnline === false) {
    if (pill) {
      pill.className = "api-status-pill offline";
      pill.title = currentLang === "ta" ? "இணைப்பு இல்லை (Offline)" : "Server Offline";
    }
    text.textContent = t("serverOffline");
  } else {
    if (pill) pill.className = "api-status-pill";
    text.textContent = currentLang === "ta" ? "இணைக்கப்படுகிறது…" : "Connecting…";
  }
}

async function checkServerHealth() {
  try {
    const res = await fetch(API_URL + "/", { method: "GET" });
    if (res.ok) {
      updateServerStatus(true);
      return true;
    }
  } catch (e) {}
  updateServerStatus(false);
  return false;
}

async function api(path, method = "GET", body) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = "Bearer " + token;

  const res = await fetch(API_URL + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch (e) {}

  if (res.status === 401 && token) {
    logout();
    throw new Error(t("sessionExpired"));
  }
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

async function uploadPdf(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(API_URL + "/api/upload", {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    body: fd,
  });
  let data = {};
  try {
    data = await res.json();
  } catch (e) {}
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data;
}

// PDF Viewer in Modal or External Tab
async function openPdf(id, title = "Document Preview") {
  const modal = $("pdf-modal");
  const frame = $("pdf-modal-frame");
  const modalTitle = $("pdf-modal-title");
  const extLink = $("pdf-modal-external");

  modalTitle.textContent = title;
  modal.style.display = "flex";
  frame.src = "about:blank";

  try {
    const res = await fetch(API_URL + "/api/files/" + encodeURIComponent(id), {
      headers: { Authorization: "Bearer " + token },
    });
    if (!res.ok) throw new Error("Could not retrieve file");
    const blob = await res.blob();
    const pdfUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));

    frame.src = pdfUrl;
    extLink.href = pdfUrl;
  } catch (e) {
    showToast("Could not load PDF document.", "error");
    modal.style.display = "none";
  }
}

$("pdf-modal-close").onclick = () => {
  $("pdf-modal").style.display = "none";
  $("pdf-modal-frame").src = "about:blank";
};

/* ==========================================================================
   Load Items directly from backend or guest fallback
   ========================================================================== */
async function loadItems() {
  if (role === "guest") {
    items = [...sampleCurriculum];
    loadError = "";
    updateTabCounts();
    return;
  }
  try {
    items = await api("/api/items");
    loadError = "";
  } catch (e) {
    loadError = e.message === "Failed to fetch" ? (currentLang === "ta" ? "சேவையகத்துடன் இணைக்க முடியவில்லை. இணைய இணைப்பைச் சரிபார்க்கவும்." : "Cannot reach the server. Check your connection or try again.") : e.message;
  }
  updateTabCounts();
}

/* ==========================================================================
   Homework Completion Persistence Helpers
   ========================================================================== */
function getCompletedHw() {
  try {
    return JSON.parse(localStorage.getItem("hubCompletedHw") || "[]");
  } catch (e) {
    return [];
  }
}

function isHwDone(id) {
  return getCompletedHw().includes(id);
}

function toggleHwDone(id) {
  let list = getCompletedHw();
  const index = list.indexOf(id);
  if (index >= 0) {
    list.splice(index, 1);
  } else {
    list.push(id);
  }
  try {
    localStorage.setItem("hubCompletedHw", JSON.stringify(list));
  } catch (e) {}
  return list.includes(id);
}

function updateTabCounts() {
  const cLesson = items.filter((i) => i.type === "lesson").length;
  const cHomework = items.filter((i) => i.type === "homework").length;
  const cPaper = items.filter((i) => i.type === "paper").length;
  const cVideo = items.filter((i) => i.type === "video").length;

  if ($("count-lesson")) $("count-lesson").textContent = cLesson;
  if ($("count-homework")) $("count-homework").textContent = cHomework;
  if ($("count-paper")) $("count-paper").textContent = cPaper;
  if ($("count-video")) $("count-video").textContent = cVideo;
}

/* ==========================================================================
   Guest Demo Mode Launch Controller
   ========================================================================== */
function startGuestDemo() {
  role = "guest";
  token = "guest-demo";
  try {
    sessionStorage.setItem("hubRole", "guest");
    sessionStorage.setItem("hubToken", "guest-demo");
  } catch (e) {}
  items = [...sampleCurriculum];
  showToast(currentLang === "ta" ? "மாதிரி முன்னோட்டம் தொடங்கப்பட்டது!" : "Guest Demo loaded successfully!", "success");
  tab = "lesson";
  cat = "";
  yr = "";
  updateTabCounts();
  go();
}

/* ==========================================================================
   Scroll Effects & Animation Engines
   ========================================================================== */
function initScrollEffects() {
  const progressBar = $("scroll-progress-bar");
  const scrollTopBtn = $("scroll-top-btn");
  const scrollRingFill = $("scroll-ring-fill");
  const siteHeader = document.querySelector(".site-header");

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = scrolled.toFixed(1) + "%";
    }

    if (scrollTopBtn) {
      if (winScroll > 160) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }

    if (scrollRingFill) {
      scrollRingFill.setAttribute("stroke-dasharray", `${scrolled.toFixed(1)}, 100`);
    }

    if (siteHeader) {
      if (winScroll > 25) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (scrollTopBtn) {
    scrollTopBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }
}

function initScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".scroll-reveal").forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -25px 0px" }
  );

  document.querySelectorAll(".scroll-reveal:not(.is-revealed)").forEach((el) => {
    observer.observe(el);
  });
}

function initCardInteractions() {
  document.querySelectorAll(".card, .login-card, .hero-feature-card").forEach((card) => {
    card.onmousemove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -3.2;
      const rotY = ((x - centerX) / centerX) * 3.2;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-5px)`;
    };
    card.onmouseleave = () => {
      card.style.transform = "";
    };
  });
}

/* ==========================================================================
   Login Portal & Grand Hero Showcase
   ========================================================================== */
function logout() {
  role = null;
  token = null;
  items = [];
  try {
    sessionStorage.removeItem("hubRole");
    sessionStorage.removeItem("hubToken");
  } catch (e) {}
  showToast(currentLang === "ta" ? "வெற்றிகரமாக வெளியேறியது" : "Logged out successfully", "info");
  go();
}

function gate() {
  $("search-controls").style.display = "none";
  $("tabs").style.display = "none";
  $("filters").innerHTML = "";
  $("results-meta").innerHTML = "";
  $("out").style.display = "none";
  $("user-badge").style.display = "none";

  $("view").innerHTML = `
    <div class="login-screen-wrap">
      <!-- Grand Hero Showcase Section with Staggered Entrance -->
      <section class="hero-showcase scroll-reveal is-revealed" id="hero-section">
        <div class="hero-badge-pill">
          ${esc(t("heroBadge"))}
        </div>
        <h2 class="hero-title">
          ${esc(t("heroTitle"))}
        </h2>
        <p class="hero-sub">
          ${esc(t("heroSub"))}
        </p>

        <div class="hero-teacher-badge">
          <span class="teacher-avatar-icon">👩‍🏫</span>
          <span>${esc(t("heroTeacherTitle"))}: <strong class="teacher-name-bold">எலிசபெத் ராத்தி (Elizabeth Rathi, M.A., B.Ed.)</strong></span>
        </div>

        <!-- 4 Feature Highlight Cards with Interactive Lift -->
        <div class="hero-features-grid">
          <div class="hero-feature-card scroll-reveal is-revealed" style="--reveal-index:0">
            <div class="feature-icon-badge">📚</div>
            <h4 class="feature-card-title">${esc(t("featureLessonsTitle"))}</h4>
            <p class="feature-card-desc">${esc(t("featureLessonsDesc"))}</p>
          </div>
          <div class="hero-feature-card scroll-reveal is-revealed" style="--reveal-index:1">
            <div class="feature-icon-badge">✍️</div>
            <h4 class="feature-card-title">${esc(t("featureHomeworkTitle"))}</h4>
            <p class="feature-card-desc">${esc(t("featureHomeworkDesc"))}</p>
          </div>
          <div class="hero-feature-card scroll-reveal is-revealed" style="--reveal-index:2">
            <div class="feature-icon-badge">📝</div>
            <h4 class="feature-card-title">${esc(t("featurePapersTitle"))}</h4>
            <p class="feature-card-desc">${esc(t("featurePapersDesc"))}</p>
          </div>
          <div class="hero-feature-card scroll-reveal is-revealed" style="--reveal-index:3">
            <div class="feature-icon-badge">🎬</div>
            <h4 class="feature-card-title">${esc(t("featureVideosTitle"))}</h4>
            <p class="feature-card-desc">${esc(t("featureVideosDesc"))}</p>
          </div>
        </div>

        <!-- Hero Quick Action CTAs -->
        <div class="hero-cta-group">
          <button type="button" class="btn-hero-primary" id="btn-hero-signin">
            <span>🔐</span>
            <span>${esc(t("heroStartBtn"))}</span>
          </button>
          <button type="button" class="btn-hero-demo" id="btn-hero-demo">
            <span>✨</span>
            <span>${esc(t("heroDemoBtn"))}</span>
          </button>
        </div>
      </section>

      <!-- Glassmorphic Elevated Login Portal Card with 3D Depth -->
      <div class="login-card scroll-reveal is-revealed" id="login-card-box">
        <div class="login-emblem-wrap">
          <img src="assets/emblem.jpg" alt="Logo">
        </div>
        <h2>${esc(t("loginTitle"))}</h2>
        <p class="login-subtitle">${esc(t("loginSub"))}</p>

        <!-- Quick Credentials Switcher -->
        <div class="login-quick-roles">
          <button type="button" class="btn-role-quick" id="btn-quick-student">
            <span>👨‍🎓</span>
            <span>${esc(t("studentAccess"))}</span>
          </button>
          <button type="button" class="btn-role-quick" id="btn-quick-admin">
            <span>👩‍🏫</span>
            <span>${esc(t("adminAccess"))}</span>
          </button>
        </div>

        <div class="login-form-group">
          <label class="login-label" for="lu">${esc(t("usernameLabel"))}</label>
          <div class="input-with-icon">
            <span class="input-icon">👤</span>
            <input id="lu" class="login-input" placeholder="student or elizabeth rathi" autocomplete="username">
          </div>
        </div>

        <div class="login-form-group">
          <label class="login-label" for="lp">${esc(t("passwordLabel"))}</label>
          <div class="input-with-icon">
            <span class="input-icon">🔒</span>
            <input id="lp" class="login-input" type="password" placeholder="Enter password" autocomplete="current-password">
            <button type="button" id="toggle-pwd-vis" class="btn-pwd-eye" title="Show password">👁</button>
          </div>
        </div>

        <button class="btn-primary-action" id="li">
          <span>${esc(t("signInBtn"))}</span>
        </button>

        <p class="login-error-msg" id="lm"></p>
      </div>
    </div>
  `;

  // Bind hero smooth scroll and demo buttons
  $("btn-hero-signin").onclick = () => {
    $("login-card-box").scrollIntoView({ behavior: "smooth", block: "center" });
    $("lu").focus();
  };

  $("btn-hero-demo").onclick = () => {
    startGuestDemo();
  };

  // Quick auto-fills
  $("btn-quick-student").onclick = () => {
    $("lu").value = "student";
    $("lp").value = "student123";
    $("lm").textContent = "";
    $("lp").focus();
  };

  $("btn-quick-admin").onclick = () => {
    $("lu").value = "elizabeth rathi";
    $("lp").value = "admin@123";
    $("lm").textContent = "";
    $("lp").focus();
  };

  // Toggle Password Visibility
  $("toggle-pwd-vis").onclick = () => {
    const input = $("lp");
    const isPass = input.type === "password";
    input.type = isPass ? "text" : "password";
    $("toggle-pwd-vis").textContent = isPass ? "🙈" : "👁";
  };

  const tryLogin = async () => {
    const u = $("lu").value.trim();
    const p = $("lp").value;
    if (!u || !p) {
      $("lm").textContent = currentLang === "ta" ? "பயனர் பெயர் மற்றும் கடவுச்சொல் இரண்டையும் உள்ளிடவும்." : "Please enter both username and password.";
      return;
    }

    $("lm").textContent = t("connecting");
    $("li").disabled = true;

    try {
      const r = await api("/api/login", "POST", { username: u, password: p });
      role = r.role;
      token = r.token;
      try {
        sessionStorage.setItem("hubRole", role);
        sessionStorage.setItem("hubToken", token);
      } catch (e) {}

      showToast(t("welcome", role), "success");
      tab = "lesson";
      await loadItems();
      go();
    } catch (e) {
      $("lm").textContent = e.message === "Failed to fetch" ? (currentLang === "ta" ? "சேவையகத்துடன் இணைக்க முடியவில்லை." : "Cannot connect to server.") : e.message;
      $("li").disabled = false;
    }
  };

  $("li").onclick = tryLogin;
  $("lp").onkeydown = (e) => {
    if (e.key === "Enter") tryLogin();
  };
  $("lu").onkeydown = (e) => {
    if (e.key === "Enter") $("lp").focus();
  };

  initScrollReveal();
  initCardInteractions();
}

/* ==========================================================================
   Filter Components
   ========================================================================== */
function filters() {
  const list = items.filter((i) => i.type === tab);
  const cats = [...new Set(list.map((i) => i.cat).filter(Boolean))].sort();
  const yrs = [...new Set(list.map((i) => i.year).filter(Boolean))].sort().reverse();

  let h = `
    <select id="fc" class="filter-select">
      <option value="">${esc(t("allCategories"))}</option>
      ${cats.map((c) => `<option value="${esc(c)}"${c === cat ? " selected" : ""}>${esc(c)}</option>`).join("")}
    </select>
  `;

  if (tab === "paper") {
    h += `
      <select id="fy" class="filter-select">
        <option value="">${esc(t("allYears"))}</option>
        ${yrs.map((y) => `<option value="${esc(y)}"${y === yr ? " selected" : ""}>${esc(y)}</option>`).join("")}
      </select>
    `;
  }

  $("filters").innerHTML = h;

  $("fc").onchange = function () {
    cat = this.value;
    draw();
  };

  if ($("fy")) {
    $("fy").onchange = function () {
      yr = this.value;
      draw();
    };
  }
}

/* ==========================================================================
   YouTube URL Helper
   ========================================================================== */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
}

/* ==========================================================================
   Content Rendering Engine (draw)
   ========================================================================== */
function draw() {
  const q = $("q").value.toLowerCase().trim();
  const c = $("cls").value;

  // Search Clear button visibility
  if ($("search-clear")) {
    $("search-clear").style.display = q ? "flex" : "none";
  }

  const list = items.filter(
    (i) =>
      i.type === tab &&
      (!c || i.cls === c) &&
      (!cat || i.cat === cat) &&
      (!yr || i.year === yr) &&
      (!q || (i.title + " " + i.body + " " + i.cat + " " + (i.year || "")).toLowerCase().includes(q))
  );

  // Results meta badge
  let metaHtml = `
    <div>
      <span class="results-count-badge">${t("foundItems", list.length)}</span>
      ${c ? `<span>${t("forClass", c)}</span>` : ""}
      ${cat ? `<span>${t("inCat", cat)}</span>` : ""}
    </div>
  `;
  if (cat || yr || q || c) {
    metaHtml += `<button type="button" class="btn-reset-filters" id="btn-reset-filters">${esc(t("resetFilters"))}</button>`;
  }
  $("results-meta").innerHTML = metaHtml;

  const resetBtn = $("btn-reset-filters");
  if (resetBtn) {
    resetBtn.onclick = () => {
      $("q").value = "";
      $("cls").value = "";
      cat = "";
      yr = "";
      syncClassPills("");
      filters();
      draw();
    };
  }

  // Render Cards or Empty State
  if (!list.length) {
    $("view").innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📖</div>
        <h3>${esc(t("emptyTitle"))}</h3>
        <p>${esc(t("emptyDesc"))}</p>
        <button type="button" class="btn-primary-action" style="max-width:240px;margin:0 auto;" id="btn-empty-reset">
          ${esc(t("emptyShowAll"))}
        </button>
      </div>
    `;
    const btnEmptyReset = $("btn-empty-reset");
    if (btnEmptyReset) {
      btnEmptyReset.onclick = () => {
        $("q").value = "";
        $("cls").value = "";
        cat = "";
        yr = "";
        syncClassPills("");
        filters();
        draw();
      };
    }
    return;
  }

  let demoBannerHtml = "";
  if (role === "guest") {
    demoBannerHtml = `
      <div class="demo-banner-strip scroll-reveal is-revealed">
        <div style="display:flex;align-items:center;gap:8px;">
          <span>✨</span>
          <span>${esc(t("guestDemoNotice"))}</span>
        </div>
        <button type="button" class="btn-exit-demo" id="btn-exit-demo">${esc(t("exitDemoBtn"))}</button>
      </div>
    `;
  }

  $("view").innerHTML = `
    ${demoBannerHtml}
    <div class="cards-grid">
      ${list
        .map((i, idx) => {
          const isHw = i.type === "homework";
          const isDone = isHw && isHwDone(i.id);
          const classTag = `<span class="tag tag-class-${esc(i.cls)}">${esc(t("classPrefix", i.cls))}</span>`;
          const catTag = i.cat ? `<span class="tag">${esc(i.cat)}</span>` : "";
          const yrTag = i.year ? `<span class="tag ${isHw ? "tag-due" : "tag-year"}">${esc(isHw ? (i.year.startsWith("Due:") ? i.year : "Due: " + i.year) : t("yearPrefix", i.year))}</span>` : "";
          const hwTag = isHw ? `<span class="tag tag-homework">✍️ ${esc(t("tabHomework"))}</span>` : "";
          const hwStatusBtn = isHw
            ? `<button type="button" class="btn-hw-check ${isDone ? "done" : ""}" data-hw="${esc(i.id)}" title="Toggle completion status"><span>${isDone ? "✓" : "○"}</span> <span>${esc(isDone ? t("hwCompleted") : t("hwPending"))}</span></button>`
            : "";

          // PDF Box
          const pdfBox = i.fileId
            ? `
              <div class="pdf-action-box">
                <div class="pdf-info">
                  <span class="pdf-icon-badge">PDF</span>
                  <span class="pdf-title-text">${esc(i.fileName || "Document")}</span>
                </div>
                <button type="button" class="btn-open-pdf" data-file="${esc(i.fileId)}" data-title="${esc(i.title)}">
                  <span>📄</span>
                  <span>${esc(t("openPdf"))}</span>
                </button>
              </div>
            `
            : "";

          // Body Render
          let bodyContent = "";
          if (i.type === "lesson") {
            bodyContent = `
              <div class="notes-hint">
                <span class="chevron">▶</span>
                <span>${esc(t("readNotesHint"))}</span>
              </div>
              <div class="card-body-content">
                <div>${esc(i.body)}</div>
                <div class="notes-actions-bar">
                  <button type="button" class="btn-copy-note" data-copy="${esc(i.id)}">
                    <span>📋</span>
                    <span>${esc(t("copyNotes"))}</span>
                  </button>
                </div>
                ${pdfBox}
              </div>
            `;
          } else if (i.type === "homework") {
            bodyContent = `
              <div class="homework-body-text">${esc(i.body)}</div>
              <div class="homework-actions-row">
                <button type="button" class="btn-copy-note" data-copy="${esc(i.id)}">
                  <span>📋</span>
                  <span>${esc(t("copyNotes"))}</span>
                </button>
                <button type="button" class="btn-hw-check ${isDone ? "done" : ""}" data-hw="${esc(i.id)}">
                  <span>${isDone ? "✓" : "○"}</span>
                  <span>${esc(isDone ? t("hwCompleted") : t("hwPending"))}</span>
                </button>
              </div>
              ${pdfBox}
            `;
          } else if (i.type === "paper") {
            if (i.fileId) {
              bodyContent = pdfBox;
            } else {
              bodyContent = `
                <div style="margin-top:12px;">
                  <a target="_blank" rel="noopener noreferrer" href="${esc(safeUrl(i.body))}" class="btn-open-pdf" style="background:#2563eb;">
                    <span>⬇</span>
                    <span>${esc(t("downloadPaper"))}</span>
                  </a>
                </div>
              `;
            }
          } else if (i.type === "video") {
            const ytEmbed = getYouTubeEmbedUrl(i.body);
            if (ytEmbed) {
              bodyContent = `
                <div class="video-player-wrap">
                  <iframe src="${esc(ytEmbed)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="margin-top:8px;">
                  <a target="_blank" rel="noopener noreferrer" href="${esc(safeUrl(i.body))}" class="video-link-action">
                    <span>▶ ${esc(t("watchYt"))}</span>
                  </a>
                </div>
              `;
            } else {
              bodyContent = `
                <div style="margin-top:12px;">
                  <a target="_blank" rel="noopener noreferrer" href="${esc(safeUrl(i.body))}" class="video-link-action">
                    <span>▶ ${esc(t("watchVideo"))}</span>
                  </a>
                </div>
              `;
            }
          }

          return `
            <div class="card ${i.type === "lesson" ? "lesson-card" : ""} ${isHw ? "homework-card" : ""} ${isDone ? "is-done" : ""} scroll-reveal" data-id="${esc(i.id)}" style="--reveal-index:${idx};">
              <div class="card-header-row">
                <div class="card-tags">
                  ${classTag}
                  ${catTag}
                  ${yrTag}
                  ${hwTag}
                </div>
                ${hwStatusBtn}
              </div>
              <h3 class="card-title">${esc(i.title)}</h3>
              ${bodyContent}
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  // Bind exit demo button if active
  const exitDemoBtn = $("btn-exit-demo");
  if (exitDemoBtn) {
    exitDemoBtn.onclick = logout;
  }

  // Accordion Toggle for Lessons
  document.querySelectorAll(".card[data-id]").forEach((el) => {
    el.onclick = (e) => {
      if (e.target.closest("a, button, input, iframe")) return;
      el.classList.toggle("open");
    };
  });

  // Copy Note Action
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const item = items.find((i) => i.id === btn.dataset.copy);
      if (item && item.body) {
        navigator.clipboard.writeText(item.title + "\n\n" + item.body).then(
          () => showToast(item.type === "homework" ? t("hwCopied") : t("notesCopied"), "success"),
          () => showToast("Could not copy notes.", "error")
        );
      }
    };
  });

  // Homework Completion Toggle
  document.querySelectorAll("[data-hw]").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.hw;
      const done = toggleHwDone(id);
      showToast(
        done
          ? (currentLang === "ta" ? "வீட்டுப்பாடம் முடித்ததாகக் குறிக்கப்பட்டது! ✓" : "Homework marked as completed! ✓")
          : (currentLang === "ta" ? "வீட்டுப்பாடம் செய்ய வேண்டியதாக மாற்றப்பட்டது." : "Homework marked as pending."),
        done ? "success" : "info"
      );
      draw();
    };
  });

  // PDF Preview Action
  document.querySelectorAll("[data-file]").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      openPdf(btn.dataset.file, btn.dataset.title);
    };
  });

  initScrollReveal();
  initCardInteractions();
}

/* ==========================================================================
   Admin Studio Panel (Elizabeth Rathi)
   ========================================================================== */
const openKeys = new Set();

function adminView() {
  $("filters").innerHTML = "";
  $("results-meta").innerHTML = "";

  if (role !== "admin") {
    $("view").innerHTML = `<div class="empty-state"><h3>Admins only</h3><p>Please log in as Elizabeth Rathi to access this studio.</p></div>`;
    return;
  }

  const lessonCount = items.filter((i) => i.type === "lesson").length;
  const homeworkCount = items.filter((i) => i.type === "homework").length;
  const paperCount = items.filter((i) => i.type === "paper").length;
  const videoCount = items.filter((i) => i.type === "video").length;
  const pdfCount = items.filter((i) => Boolean(i.fileId)).length;

  let h = `
    <div class="admin-view-wrap">
      <!-- Admin Hero Welcome Banner -->
      <div class="admin-header-card">
        <div class="admin-teacher-badge">
          <div class="teacher-avatar">👩‍🏫</div>
          <div>
            <h3>${esc(t("adminWelcome"))}</h3>
            <p>${esc(t("adminSub"))}</p>
          </div>
        </div>
        <button id="lo" class="btn-logout">
          <span>🚪</span>
          <span>${esc(t("logout"))}</span>
        </button>
      </div>

      <!-- Quick Metrics Statistics Cards -->
      <div class="admin-stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div>
            <div class="stat-val">${lessonCount}</div>
            <div class="stat-label">${esc(t("statLessons"))}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✍️</div>
          <div>
            <div class="stat-val">${homeworkCount}</div>
            <div class="stat-label">${esc(t("statHomework"))}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📝</div>
          <div>
            <div class="stat-val">${paperCount}</div>
            <div class="stat-label">${esc(t("statPapers"))}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎬</div>
          <div>
            <div class="stat-val">${videoCount}</div>
            <div class="stat-label">${esc(t("statVideos"))}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📁</div>
          <div>
            <div class="stat-val">${pdfCount}</div>
            <div class="stat-label">${esc(t("statFiles"))}</div>
          </div>
        </div>
      </div>

      <!-- Create New Material Card -->
      <div class="admin-card">
        <h3 class="admin-card-title">
          <span>✨</span>
          <span>${esc(t("addNewTitle"))}</span>
        </h3>

        <div class="form-grid-2">
          <div class="form-field">
            <label for="nt">${esc(t("contentType"))}</label>
            <select id="nt" class="form-select">
              <option value="lesson">${esc(t("optLesson"))}</option>
              <option value="homework">${esc(t("optHomework"))}</option>
              <option value="paper">${esc(t("optPaper"))}</option>
              <option value="video">${esc(t("optVideo"))}</option>
            </select>
          </div>

          <div class="form-field">
            <label for="nc">${esc(t("classField"))}</label>
            <select id="nc" class="form-select">
              <option value="12">12-ஆம் வகுப்பு (Class 12)</option>
              <option value="11">11-ஆம் வகுப்பு (Class 11)</option>
            </select>
          </div>
        </div>

        <div class="form-field">
          <label for="ntl">${esc(t("titleField"))}</label>
          <input id="ntl" class="form-input" placeholder="${esc(t("titlePlaceholder"))}">
        </div>

        <div class="form-grid-2">
          <div class="form-field">
            <label for="ncat">${esc(t("catField"))}</label>
            <input id="ncat" class="form-input" placeholder="${esc(t("catPlaceholder"))}">
            <div class="category-suggestions">
              <button type="button" class="btn-cat-chip" data-cat-pick="செய்யுள்">செய்யுள்</button>
              <button type="button" class="btn-cat-chip" data-cat-pick="உரைநடை">உரைநடை</button>
              <button type="button" class="btn-cat-chip" data-cat-pick="துணைப்பாடம்">துணைப்பாடம்</button>
              <button type="button" class="btn-cat-chip" data-cat-pick="இலக்கணம்">இலக்கணம்</button>
              <button type="button" class="btn-cat-chip" data-cat-pick="பொதுத் தேர்வு வினாத்தாள்">பொதுத் தேர்வு</button>
            </div>
          </div>

          <div class="form-field">
            <label for="ny">${esc(t("yearField"))}</label>
            <input id="ny" class="form-input" placeholder="${esc(t("yearPlaceholder"))}">
          </div>
        </div>

        <div class="form-field">
          <label for="nb">${esc(t("notesField"))}</label>
          <textarea id="nb" class="form-textarea" placeholder="${esc(t("notesPlaceholder"))}"></textarea>
        </div>

        <div class="form-field">
          <label>${esc(t("pdfUploadLabel"))}</label>
          <div class="dropzone-box" id="dropzone">
            <input id="nf" type="file" accept="application/pdf">
            <div class="dropzone-icon">📄</div>
            <div class="dropzone-text">${esc(t("dropzoneText"))}</div>
            <div class="dropzone-sub">${esc(t("dropzoneSub"))}</div>
            <div id="file-chosen-name" class="dropzone-selected-file" style="display:none;"></div>
          </div>
        </div>

        <button class="btn-primary-action" id="add">
          <span>${esc(t("publishBtn"))}</span>
        </button>
      </div>

      <!-- Student Password Management Card -->
      <div class="admin-card">
        <h3 class="admin-card-title">
          <span>🔑</span>
          <span>${esc(t("studentPwTitle"))}</span>
        </h3>
        <p style="font-size:0.86rem;color:var(--ink-muted);margin-bottom:12px;">
          ${esc(t("studentPwDesc"))}
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <input id="sp" class="form-input" style="flex:1;min-width:220px;" placeholder="${esc(t("newPwPlaceholder"))}">
          <button id="sps" class="btn-primary-action" style="width:auto;padding:10px 20px;margin-top:0;">
            ${esc(t("changePwBtn"))}
          </button>
        </div>
      </div>

      <!-- Content Management Section -->
      <div class="admin-card">
        <h3 class="admin-card-title">
          <span>🗂️</span>
          <span>${esc(t("manageContentTitle"))}</span>
        </h3>
        <input id="df" class="form-input" placeholder="${esc(t("filterItemsPlaceholder"))}" style="margin-bottom:16px;">

        <div id="admin-items-tree">
  `;

  const T = {
    lesson: currentLang === "ta" ? "📚 பாடக் குறிப்புகள் (Lessons)" : "📚 Lesson Notes",
    homework: currentLang === "ta" ? "✍️ வீட்டுப்பாடங்கள் (Homework & Tasks)" : "✍️ Homework & Tasks",
    paper: currentLang === "ta" ? "📝 வினாத்தாள்கள் (Question Papers)" : "📝 Question Papers",
    video: currentLang === "ta" ? "🎬 காணொளிகள் (Videos)" : "🎬 Video Lectures"
  };

  Object.keys(T).forEach((t) => {
    const L = items.filter((i) => i.type === t);
    const tk = "t:" + t;
    h += `
      <details class="admin-accordion" data-k="${tk}"${openKeys.has(tk) ? " open" : ""}>
        <summary>
          <span><b>${T[t]}</b> (${L.length})</span>
          <span style="font-size:0.8rem;color:var(--ink-muted);">▼</span>
        </summary>
    `;

    const g = {};
    L.forEach((i) => {
      const k = `வகுப்பு ${i.cls} · ${i.cat || "பொது"}${i.year ? " · " + i.year : ""}`;
      (g[k] = g[k] || []).push(i);
    });

    Object.keys(g)
      .sort()
      .forEach((k) => {
        const gk = "g:" + t + "|" + k;
        h += `
          <div class="admin-sub-accordion">
            <details data-k="${esc(gk)}"${openKeys.has(gk) ? " open" : ""} style="padding:6px 0;">
              <summary style="background:transparent;padding:6px 10px;font-size:0.88rem;">
                <span>${esc(k)} (${g[k].length})</span>
                <span style="font-size:0.75rem;color:var(--ink-muted);">▼</span>
              </summary>
              <div>
                ${g[k]
                  .map(
                    (i) => `
                      <div class="admin-item-row dl">
                        <div>
                          <strong style="color:var(--ink-primary);">${esc(i.title)}</strong>
                          ${i.fileName ? `<span class="tag" style="margin-left:6px;font-size:0.7rem;">PDF: ${esc(i.fileName)}</span>` : ""}
                        </div>
                        <button type="button" class="btn-del-item" data-del="${esc(i.id)}" title="Delete item">
                          <span>🗑</span>
                          <span>${esc(i18n[currentLang]?.deleteBtn || "Delete")}</span>
                        </button>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </details>
          </div>
        `;
      });

    if (!L.length) {
      h += `<p style="padding:14px;color:var(--ink-muted);font-size:0.9rem;">Nothing added here yet.</p>`;
    }
    h += `</details>`;
  });

  h += `
        </div>
      </div>
    </div>
  `;

  $("view").innerHTML = h;

  // Category chip suggestions
  document.querySelectorAll("[data-cat-pick]").forEach((btn) => {
    btn.onclick = () => {
      $("ncat").value = btn.dataset.catPick;
    };
  });

  // Accordion open/close persistence
  document.querySelectorAll("#view details").forEach((d) => {
    d.ontoggle = () => {
      d.open ? openKeys.add(d.dataset.k) : openKeys.delete(d.dataset.k);
    };
  });

  // File chosen indicator
  const fileInput = $("nf");
  const chosenDisplay = $("file-chosen-name");
  fileInput.onchange = () => {
    const f = fileInput.files[0];
    if (f) {
      chosenDisplay.style.display = "inline-flex";
      chosenDisplay.textContent = `Selected: ${f.name} (${(f.size / (1024 * 1024)).toFixed(2)} MB)`;
    } else {
      chosenDisplay.style.display = "none";
    }
  };

  // Add Item Action
  $("add").onclick = async () => {
    const title = $("ntl").value.trim();
    if (!title) {
      showToast(currentLang === "ta" ? "தயவுசெய்து ஒரு தலைப்பை உள்ளிடவும்." : "Please enter a title for this material.", "error");
      $("ntl").focus();
      return;
    }

    $("add").disabled = true;
    const originalText = $("add").innerHTML;
    $("add").innerHTML = `<span>${esc(t("uploading"))}</span>`;

    try {
      let fileId = "",
        fileName = "";
      const f = $("nf").files[0];
      if (f) {
        if (f.type !== "application/pdf") throw new Error("Only PDF files are allowed.");
        const up = await uploadPdf(f);
        fileId = up.fileId;
        fileName = up.fileName;
      }

      await api("/api/items", "POST", {
        type: $("nt").value,
        cls: $("nc").value,
        title,
        cat: $("ncat").value.trim(),
        year: $("ny").value.trim(),
        body: $("nb").value.trim(),
        fileId,
        fileName,
      });

      showToast(t("publishedSuccess"), "success");
      await loadItems();
      adminView();
    } catch (e) {
      showToast(e.message, "error");
      $("add").disabled = false;
      $("add").innerHTML = originalText;
    }
  };

  $("lo").onclick = logout;

  // Change Student Password
  $("sps").onclick = async () => {
    const v = $("sp").value.trim();
    if (v.length < 4) {
      showToast(currentLang === "ta" ? "கடவுச்சொல் குறைந்தது 4 எழுத்துக்கள் இருக்க வேண்டும்." : "Password must be at least 4 characters.", "error");
      return;
    }
    try {
      await api("/api/student-password", "PUT", { password: v });
      showToast(t("pwUpdated"), "success");
      $("sp").value = "";
    } catch (e) {
      showToast(e.message, "error");
    }
  };

  // Search Filter for Items in Admin
  $("df").oninput = function () {
    const query = this.value.toLowerCase().trim();
    document.querySelectorAll(".dl").forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
    });
    if (query) {
      document.querySelectorAll("#view details").forEach((d) => (d.open = true));
    }
  };

  // Delete Action with Modal Confirmation
  document.querySelectorAll("[data-del]").forEach((b) => {
    b.onclick = async () => {
      const it = items.find((i) => i.id === b.dataset.del);
      if (!it) return;

      const confirmed = await showConfirm(
        t("confirmDeleteTitle"),
        t("confirmDeleteMsg", it.title)
      );
      if (!confirmed) return;

      try {
        await api("/api/items/" + encodeURIComponent(it.id), "DELETE");
        showToast(t("itemDeleted"), "info");
        await loadItems();
        adminView();
      } catch (e) {
        showToast(e.message, "error");
      }
    };
  });
}

/* ==========================================================================
   Page & Navigation Controller
   ========================================================================== */
function syncClassPills(val) {
  document.querySelectorAll(".class-pill-btn").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.class === val);
  });
}

function go() {
  if (!role) {
    gate();
    return;
  }

  $("search-controls").style.display = "";
  $("tabs").style.display = "flex";
  $("out").style.display = "inline-flex";

  // User badge
  const userBadge = $("user-badge");
  if (userBadge) {
    userBadge.style.display = "inline-flex";
    userBadge.textContent =
      role === "admin"
        ? (currentLang === "ta" ? "👩‍🏫 எலிசபெத் ராத்தி (ஆசிரியர்)" : "👩‍🏫 Elizabeth Rathi (Admin)")
        : role === "guest"
        ? t("guestDemoBadge")
        : (currentLang === "ta" ? "👨‍🎓 மாணவர் (Student)" : "👨‍🎓 Student");
  }

  // Admin tab visibility
  const adminTab = document.querySelector('[data-t="admin"]');
  if (adminTab) adminTab.style.display = role === "admin" ? "" : "none";

  // Tab active toggle
  document.querySelectorAll("#tabs button").forEach((x) => x.classList.toggle("on", x.dataset.t === tab));

  if (loadError) {
    $("filters").innerHTML = "";
    $("results-meta").innerHTML = "";
    $("view").innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>${currentLang === "ta" ? "சேவையகத் தொடர்பு துண்டிக்கப்பட்டது" : "Connection Error"}</h3>
        <p>${esc(loadError)}</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:16px;">
          <button class="btn-primary-action" style="max-width:200px;margin:0;" id="retry">
            ${currentLang === "ta" ? "மீண்டும் முயற்சிக்க (Try again)" : "Try again"}
          </button>
          <button type="button" class="btn-hero-demo" style="max-width:280px;" id="btn-fallback-demo">
            ✨ ${esc(t("heroDemoBtn"))}
          </button>
        </div>
      </div>
    `;
    $("retry").onclick = async () => {
      await loadItems();
      go();
    };
    $("btn-fallback-demo").onclick = () => {
      startGuestDemo();
    };
    return;
  }

  if (tab === "admin") {
    $("search-controls").style.display = "none";
    adminView();
  } else {
    $("search-controls").style.display = "";
    filters();
    draw();
  }
}

// Bind Tabs
document.querySelectorAll("#tabs button").forEach((b) => {
  b.onclick = () => {
    tab = b.dataset.t;
    cat = "";
    yr = "";
    go();
  };
});

// Bind Class Segmented Buttons
document.querySelectorAll(".class-pill-btn").forEach((pill) => {
  pill.onclick = () => {
    const val = pill.dataset.class;
    $("cls").value = val;
    syncClassPills(val);
    if (tab !== "admin" && role && !loadError) draw();
  };
});

// Search input
$("q").oninput = () => {
  if (tab !== "admin" && role && !loadError) draw();
};

if ($("search-clear")) {
  $("search-clear").onclick = () => {
    $("q").value = "";
    if (tab !== "admin" && role && !loadError) draw();
    $("q").focus();
  };
}

// Hotkey: press "/" to focus search bar
window.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== $("q") && !["input", "textarea"].includes(document.activeElement.tagName.toLowerCase())) {
    e.preventDefault();
    if ($("q")) $("q").focus();
  }
  if (e.key === "Escape") {
    const pdfModal = $("pdf-modal");
    if (pdfModal && pdfModal.style.display !== "none") {
      pdfModal.style.display = "none";
      $("pdf-modal-frame").src = "about:blank";
    }
  }
});

$("cls").onchange = () => {
  syncClassPills($("cls").value);
  if (tab !== "admin" && role && !loadError) draw();
};

$("out").onclick = logout;

/* ==========================================================================
   App Initialization
   ========================================================================== */
(async function start() {
  initTheme();
  setLanguage(currentLang);
  initScrollEffects();
  await checkServerHealth();
  if (role) await loadItems();
  go();
})();
