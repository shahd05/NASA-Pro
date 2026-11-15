const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
let lang = "ar";
try {lang =
    localStorage.getItem("lg") ||((navigator.language || "").startsWith("en") ? "en" : "ar");
} catch (e) {}
const IC = {
  pin: '<circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',
  lay: '<path d="M12 2 2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5"/>',
  clk: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 12h8"/>',
  sat: '<rect x="9" y="9" width="6" height="6" rx="1"/><path d="M3 9l4 4M17 11l4 4M12 3v4M12 17v4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
  rep: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
};
const svg = (n) =>
  `<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${IC[n]}</svg></span>`;
const TY = [
  ["eq", "#ef4444", "GUNW", 0],
  ["fl", "#3b82f6", "GCOV", 1],
  ["sub", "#a855f7", "GUNW", 0],
  ["ag", "#eab308", "GCOV", 1],
  ["ls", "#22c55e", "GCOV", 0],
];
const D = {
  ar: {
    nAbout: "عن الموقع",
    nHow: "طريقة العمل",
    nTypes: "أنواع التغير",
    nMission: "عن المهمة",
    open: "افتح الخريطة",
    badge: "بدعم مهمة NISAR المشتركة بين ناسا وISRO",
    h1a: "راقب تغيّرات الأرض.",
    h1b: "افهم كوكبك.",
    sub: "حوّل ملاحظات الرادار الفضائي إلى معلومات مفهومة: ارسم منطقة على الخريطة، وقارن بين تاريخين، واحصل على صور قبل وبعد وأرقام حقيقية فقط.",
    cta1: "افتح خريطة الرصد",
    cta2: "اكتشف طريقة العمل",
    cta3: "افتح مساحة الرصد الآن",
    cta4: "افتح خريطة الرصد",
    stats: [
      ["12 يومًا", "تكرار مدار NISAR"],
      ["24 سم", "طول موجة النطاق L"],
      ["ليلًا ونهارًا", "يخترق السحب"],
      ["747 كم", "ارتفاع المدار"],
    ],
    illu: "توضيحي",
    illuN:"رسم توضيحي لفكرة المقارنة، وليس بيانات فعلية. النتائج الحقيقية تظهر في صفحة الخريطة.",
    before: "قبل",
    after: "بعد",
    chg: "التغير",
    aTag: "القدرة الأساسية",
    aH: "أربعة أسئلة يجيب عنها الموقع",
    aP: "يقارن الموقع مشهدين لنفس المنطقة ليكشف تغيرات سطح الأرض. الرادار يعمل ليلًا ونهارًا ويخترق السحب، لذلك يناسب مقارنة «قبل وبعد».",
    qs: [
      [
        "pin",
        "أين حدث التغير؟",
        "مربع تحدده على الخريطة، مع حدود مشاهد NISAR الحقيقية التي تغطيه.",
      ],
      [
        "lay",
        "ما حجمه؟",
        "مساحة المياه أو الغطاء النباتي المتغير بالكيلومتر المربع، من صور Sentinel-2.",
      ],
      [
        "clk",
        "متى حدث؟",
        "الفاصل الزمني بين تاريخي «قبل» و«بعد»، مع تكرار مدار NISAR كل 12 يومًا.",
      ],
      [
        "scan",
        "ما نوعه المحتمل؟",
        "نوع التغير الذي تختاره يحدد المنتج وطريقة التحليل، والنتيجة «محتملة» وليست مؤكدة.",
      ],
    ],
    hTag: "خط العمل",
    hH: "كيف يعمل الموقع",
    hP: "من رسم المنطقة على خريطة القمر الصناعي إلى تقرير PDF جاهز للحفظ.",
    sts: [
      [
        "حدد المنطقة",
        "ارسم مربعًا على خريطة القمر الصناعي حول المكان المطلوب.",
        "المساحة والإحداثيات",
      ],
      [
        "اختر نوع التغير",
        "زلزال أو فيضان أو هبوط أو زراعة أو انهيار، وتُضبط الواجهة على المنتج المناسب.",
        "GCOV أو GUNW",
      ],
      [
        "قارن تاريخين",
        "نبحث في NASA CMR عن مشاهد NISAR الحقيقية ونعرض حدودها على الخريطة.",
        "مشاهد من ASF DAAC",
      ],
      [
        "اقرأ النتيجة",
        "صور قبل/بعد بسلايدر، وأرقام، وأصول قريبة، ثم احفظ التقرير PDF.",
        "سلايدر + PDF",
      ],
    ],
    tTag: "مجالات الرصد",
    tH: "أنواع التغير المدعومة",
    tP: "اضغط على أي نوع لفتح الخريطة به مباشرة.",
    tn: {
      eq: "زلزال",
      fl: "فيضان",
      sub: "هبوط",
      ag: "أراضٍ زراعية",
      ls: "انهيار",
    },
    ta: {
      eq: "إزاحة سطح الأرض بين تاريخين بالتداخل الراداري (InSAR).",
      fl: "مساحة المياه المضافة بين تاريخين، بمؤشر NDWI من Sentinel-2.",
      sub: "إشارة هبوط أو تشوه على خط النظر قرب الأصول العامة (InSAR).",
      ag: "تغير الغطاء النباتي بين تاريخين بمؤشر NDVI من Sentinel-2.",
      ls: "مناطق تغير حاد في المنحدرات تحتاج تحققًا ميدانيًا.",
    },
    tm: ["مشاهد NISAR + سياق بصري", "قياس بالأرقام (Sentinel-2)"],
    honT: "ما الذي يُقاس فعليًا؟",
    honP: "الفيضان والأراضي الزراعية تُحسب أرقامهما من صور Sentinel-2 البصرية. أما الزلزال والهبوط والانهيار فتحتاج InSAR من NISAR (منتج GUNW) ومعالجة ملفات كاملة وتسجيل دخول Earthdata، لذلك نعرض لها المشاهد المتاحة وحدودها وصور السياق والأصول القريبة وبيانات USGS دون أي رقم إزاحة مُختلَق.",
    mTag: "عن المهمة",
    mH: "مهمة NISAR بين ناسا وISRO",
    mP: "NISAR قمر صناعي برادار الفتحة التركيبية طورته ناسا ووكالة الفضاء الهندية معًا لرصد تغيرات سطح الأرض بشكل متكرر.",
    spec: "مواصفات رئيسية",
    sp: [
      ["ارتفاع المدار", "747 كم"],
      ["فترة التكرار", "12 يومًا"],
      ["عاكس الرادار", "12 مترًا"],
      ["النطاقان", "L وS"],
    ],
    pil: [
      [
        "sun",
        "رؤية في كل الطقس",
        "الرادار يضيء السطح بنفسه، فلا تعطله السحب ولا الليل، ويصلح لمواسم الأمطار.",
      ],
      [
        "lay",
        "اختراق النطاق L",
        "طول موجة 24 سم يخترق الأوراق جزئيًا ويصل لما تحتها، فيفيد في رصد المياه تحت الغطاء النباتي ورطوبة التربة.",
      ],
      [
        "rep",
        "رصد متكرر",
        "العودة لنفس المسار كل 12 يومًا تعطي صورًا أساسية منتظمة تصلح للمقارنة وللتداخل الراداري.",
      ],
    ],
    fH: "جاهز لرصد سطح الأرض؟",
    fP: "افتح الخريطة وارسم منطقتك واختر تاريخين، وسترى صور قبل وبعد وأرقامًا حقيقية وتقرير PDF.",
    foot: "بيانات حقيقية من مصادر مفتوحة. لا نعرض أرقامًا مُختلَقة.",
  },
  en: {
    nAbout: "About",
    nHow: "How it works",
    nTypes: "Change types",
    nMission: "Mission",
    open: "Open map",
    badge: "Powered by the NASA–ISRO NISAR mission",
    h1a: "Monitor Earth’s changes.",
    h1b: "Understand our planet.",
    sub: "Turn space-radar observations into clear insight: draw an area on the map, compare two dates, and get before/after images with real numbers only.",
    cta1: "Open the monitoring map",
    cta2: "See how it works",
    cta3: "Open the workspace now",
    cta4: "Open the monitoring map",
    stats: [
      ["12 days", "NISAR orbit repeat"],
      ["24 cm", "L-band wavelength"],
      ["Day & night", "Sees through clouds"],
      ["747 km", "Orbit altitude"],
    ],
    illu: "ILLUSTRATIVE",
    illuN:
      "An illustration of the comparison idea, not real data. Real results appear on the map page.",
    before: "Before",
    after: "After",
    chg: "Change",
    aTag: "Core capability",
    aH: "Four questions the site answers",
    aP: "The site compares two scenes of the same area to reveal surface change. Radar works day and night and sees through clouds, which suits before/after comparison.",
    qs: [
      [
        "pin",
        "Where did it change?",
        "A box you draw on the map, with the real NISAR scene footprints that cover it.",
      ],
      [
        "lay",
        "How big is it?",
        "Changed water or vegetation area in square kilometres, from Sentinel-2 imagery.",
      ],
      [
        "clk",
        "When did it happen?",
        "The time gap between your “before” and “after” dates, on NISAR’s 12-day repeat orbit.",
      ],
      [
        "scan",
        "What type is it likely?",
        "The change type you pick sets the product and method; the result is “likely”, not confirmed.",
      ],
    ],
    hTag: "The workflow",
    hH: "How the site works",
    hP: "From drawing an area on the satellite map to a PDF report ready to save.",
    sts: [
      [
        "Select an area",
        "Draw a box on the satellite map around the place you care about.",
        "Area & coordinates",
      ],
      [
        "Pick a change type",
        "Earthquake, flood, subsidence, agriculture or landslide; the UI sets the right product.",
        "GCOV or GUNW",
      ],
      [
        "Compare two dates",
        "We search NASA CMR for real NISAR scenes and show their footprints on the map.",
        "Scenes from ASF DAAC",
      ],
      [
        "Read the result",
        "Before/after slider, numbers and nearby assets, then save the PDF report.",
        "Slider + PDF",
      ],
    ],
    tTag: "Observation domains",
    tH: "Supported change types",
    tP: "Click any type to open the map with it preselected.",
    tn: {
      eq: "Earthquake",
      fl: "Flood",
      sub: "Subsidence",
      ag: "Agricultural land",
      ls: "Landslide",
    },
    ta: {
      eq: "Ground displacement between two dates using radar interferometry (InSAR).",
      fl: "Water area added between two dates, using the NDWI index from Sentinel-2.",
      sub: "Subsidence or deformation signal along line-of-sight near public assets (InSAR).",
      ag: "Vegetation change between two dates, using the NDVI index from Sentinel-2.",
      ls: "Areas of sharp slope change that need field verification.",
    },
    tm: ["NISAR scenes + visual context", "Measured figures (Sentinel-2)"],
    honT: "What is actually measured?",
    honP: "Flood and agriculture figures are computed from optical Sentinel-2 imagery. Earthquake, subsidence and landslide need NISAR InSAR (GUNW product), full-file processing and an Earthdata login, so for those we show available scenes and footprints, context imagery, nearby assets and USGS data, with no invented displacement values.",
    mTag: "The mission",
    mH: "The NISAR mission by NASA and ISRO",
    mP: "NISAR is a synthetic aperture radar satellite built jointly by NASA and the Indian space agency to observe changes in Earth’s surface repeatedly.",
    spec: "Key specifications",
    sp: [
      ["Orbit altitude", "747 km"],
      ["Repeat interval", "12 days"],
      ["Radar reflector", "12 m"],
      ["Bands", "L & S"],
    ],
    pil: [
      [
        "sun",
        "All-weather vision",
        "The radar illuminates the surface itself, so clouds and night don’t block it, including during rainy seasons.",
      ],
      [
        "lay",
        "L-band penetration",
        "A 24 cm wavelength partly passes through foliage to what lies beneath, helping detect water under vegetation and soil moisture.",
      ],
      [
        "rep",
        "Repeat observation",
        "Returning to the same track every 12 days gives regular baseline imagery suited to comparison and interferometry.",
      ],
    ],
    fH: "Ready to monitor Earth’s surface?",
    fP: "Open the map, draw your area and pick two dates to get before/after images, real numbers and a PDF report.",
    foot: "Real data from open sources. We never show invented numbers.",
  },
};
const g = (k) => D[lang][k];
function paint() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang == "ar" ? "rtl" : "ltr";
  $$("[data-i]").forEach((e) => (e.textContent = g(e.dataset.i)));
  $("#lang").textContent = lang == "ar" ? "English" : "العربية";
  $("#stats").innerHTML = g("stats").map(
      (s, i) =>
        `<div><div class="text-xl font-bold font-mono ${["text-white", "text-cyan-400", "text-white", "text-emerald-400"][i]}">${s[0]}</div><div class="text-xs text-slate-400">${s[1]}</div></div>`,
    ).join("");
  $("#qs").innerHTML = g("qs").map(
      (q) =>
        `<div class="card h">${svg(q[0])}<h3 class="text-lg font-bold text-white mb-2">${q[1]}</h3><p class="text-sm text-slate-400 leading-relaxed">${q[2]}</p></div>`,
    ).join("");
  $("#sts").innerHTML = g("sts").map(
      (s, i) =>
        `<div class="card flex flex-col justify-between"><div><span class="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400 text-cyan-300 font-bold grid place-items-center font-mono mb-4">${i + 1}</span><h3 class="text-lg font-bold text-white mb-2">${s[0]}</h3><p class="text-sm text-slate-400 leading-relaxed">${s[1]}</p></div><div class="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">${s[2]}</div></div>`,
    ).join("");
  $("#tys").innerHTML = TY.map(
    ([id, c, p, m]) =>
      `<a href="app.html?type=${id}" class="card block" style="border-inline-start:4px solid ${c}"><div class="flex items-center justify-between mb-3"><span class="font-mono text-xs font-semibold" style="color:${c}">${p}</span><span class="chip" style="${m ? "color:#34d399;border-color:rgba(16,185,129,.5)" : ""}">${g("tm")[m]}</span></div><h3 class="text-lg font-bold text-white mb-2">${g("tn")[id]}</h3><p class="text-sm text-slate-400 leading-relaxed">${g("ta")[id]}</p></a>`,
  ).join("");
  $("#specs").innerHTML = g("sp")
    .map(
      (s) =>
        `<div class="p-3 rounded-lg bg-slate-900/80 border border-slate-800"><div class="text-slate-400">${s[0]}</div><div class="text-white font-bold text-sm font-mono">${s[1]}</div></div>`,
    )
    .join("");
  $("#pil").innerHTML = g("pil")
    .map(
      (p) =>
        `<div class="card h">${svg(p[0])}<h3 class="text-lg font-bold text-white mb-2">${p[1]}</h3><p class="text-sm text-slate-300 leading-relaxed">${p[2]}</p></div>`,
    )
    .join("");
}
$("#lang").onclick = () => {
  lang = lang == "ar" ? "en" : "ar";
  try {
    localStorage.setItem("lg", lang);
  } catch (e) {}
  paint();
};
paint();
