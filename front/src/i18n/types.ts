/* ── i18n 타입 정의 ── */

export type Locale = "ko" | "en" | "ja";

export interface Translation {
  /* ── 공통 / 브랜드 ── */
  brand: {
    name: string;
    description: string;
    slogan: string;
  };

  /* ── 네비게이션 & 헤더 ── */
  nav: {
    home: string;
    work: string;
    production: string;
    studio: string;
    insights: string;
    story: string;
    contact: string;
    menuOpen: string;
    menuClose: string;
    mainMenu: string;
    mobileMenu: string;
    productionInquiry: string;
    studioInquiry: string;
  };

  /* ── 푸터 ── */
  footer: {
    desc1: string;
    desc2: string;
    trustBadges: { value: string; label: string }[];
    address: string;
    bizNumber: string;
    ceo: string;
    groupOfferings: string;
    groupCompany: string;
    groupPolicy: string;
    linkContact: string;
    linkTerms: string;
    linkPrivacy: string;
    linkFaq: string;
  };

  /* ── 홈 ── */
  home: {
    viewPortfolio: string;
    projectInquiry: string;
    section2Heading: string;
    section2Sub: string;
    viewAllPortfolio: string;
    section3Heading: string;
    section3Sub: string;
    cardProductionTitle: string;
    cardProductionDesc: string;
    cardProductionCheck1: string;
    cardProductionCheck2: string;
    cardProductionCheck3: string;
    cardProductionCta: string;
    cardStudioTitle: string;
    cardStudioDesc: string;
    cardStudioCheck1: string;
    cardStudioCheck2: string;
    cardStudioCheck3: string;
    cardStudioCta: string;
    notSure: string;
    contactUs: string;
    trustProjectsDone: string;
    trustSatisfaction: string;
    trustSpeedUp: string;
    /* AI 기술 차별화 섹션 */
    techEdgeHeading: string;
    techEdgeSub: string;
    techEdgeItems: { icon: string; title: string; stat: string; desc: string }[];
    /* 인사이트 프리뷰 */
    insightsPreviewHeading: string;
    insightsPreviewSub: string;
    insightsPreviewCta: string;
    /* 하단 CTA */
    closingCtaHeading: string;
    closingCtaSub: string;
    closingCtaLabel: string;
  };

  /* ── Work ── */
  work: {
    heading: string;
    sub: string;
    srHeading: string;
    categoryAll: string;
    categoryProduction: string;
    categoryStudio: string;
    categoryProductionDesc: string;
    categoryStudioDesc: string;
    filterIndustry: string;
    filterStyle: string;
    filterPurpose: string;
    noResults: string;
    resetFilter: string;
    all: string;
    industries: string[];
    styles: string[];
    purposes: string[];
    titles: Record<string, string>;
    /* 적용 기술 */
    detailTechApplied: string;
    /* 케이스 상세 */
    detailChallenge: string;
    detailApproach: string;
    detailResult: string;
    detailCta: string;
    detailBackToList: string;
    caseDetails: Record<string, { challenge: string; approach: string; result: string }>;
    /* 하단 CTA */
    closingCtaHeading: string;
    closingCtaLabel: string;
  };

  /* ── Production ── */
  production: {
    metaDesc: string;
    heading: string;
    headingSub: string;
    desc1: string;
    desc2: string;
    projectInquiry: string;
    whyChooseHeading: (brand: string) => string;
    whyChooseSub: string;
    legacyLabel: string;
    brandLabel: (brand: string) => string;
    /* AI 기술 적용 섹션 */
    aiTechHeading: string;
    aiTechSub: string;
    aiTechItems: { icon: string; title: string; stat: string; desc: string }[];
    processHeading: string;
    expertHeading: string;
    steps: { step: string; title: string; desc: string }[];
    compare: { label: string; before: string; after: string }[];
    experts: { role: string; desc: string }[];
    featuredWorksHeading: string;
    featuredWorksCta: string;
    /* 하단 CTA */
    closingCtaHeading: string;
    closingCtaLabel: string;
  };

  /* ── Studio ── */
  studio: {
    metaDesc: string;
    heading: string;
    headingSub: string;
    desc1: string;
    desc2: string;
    cta: string;
    placeholder: string;
    /* Engine Advantage 섹션 */
    engineHeading: string;
    engineSub: string;
    engineItems: { icon: string; title: string; desc: string }[];
    featuresHeading: string;
    impactHeading: string;
    impactCta: string;
    features: { icon: string; title: string; desc: string }[];
    impacts: { value: string; label: string; desc: string }[];
    useCasesHeading: string;
    useCasesCta: string;
    /* 하단 CTA */
    closingCtaHeading: string;
    closingCtaLabel: string;
  };

  /* ── Insights ── */
  insights: {
    heading: string;
    sub: string;
    searchPlaceholder: string;
    srHeading: string;
    noResults: string;
    resetFilter: string;
    all: string;
    tags: string[];
    techHighlightHeading: string;
    techHighlightItems: { value: string; label: string }[];
    articles: { title: string; summary: string; tag: string; date: string }[];
    detailBackToList: string;
    detailToc: string;
    detailRelated: string;
    detailCta: string;
    /* 하단 CTA */
    closingCtaHeading: string;
    closingCtaLabel: string;
    articleDetails: Record<string, {
      title: string;
      summary: string;
      sections: { heading: string; body: string }[];
    }>;
  };

  /* ── Story ── */
  story: {
    metaDesc: (brand: string) => string;
    heading: (brand: string) => string;
    headingSub: string;
    desc1: string;
    desc2: string;
    timelineHeading: string;
    techCapHeading: string;
    techCapStats: { value: string; label: string }[];
    techCapItems: { icon: string; title: string; desc: string }[];
    teamHeading: string;
    timeline: { year: string; title: string; desc: string }[];
    team: { name: string; role: string; desc: string }[];
    partnersHeading: string;
    partners: { name: string; type: string }[];
    /* 하단 CTA */
    closingCtaHeading: string;
    closingCtaLabel: string;
  };

  /* ── Contact ── */
  contact: {
    heroHeading: string;
    heroSub: string;
    trustStats: { value: string; label: string }[];
    tabBenefitProduction: string;
    tabBenefitStudio: string;
    whyHeading: string;
    whyItems: string[];
    processHeading: string;
    processSteps: { step: string; desc: string }[];
    loading: string;
    successHeading: string;
    successSub: string;
    formTitle: string;
    tabProduction: string;
    tabStudio: string;
    company: string;
    managerName: string;
    email: string;
    phone: string;
    goal: string;
    deadline: string;
    deadlinePh: string;
    budget: string;
    budgetPh: string;
    reference: string;
    referencePh: string;
    teamSize: string;
    teamSizePh: string;
    monthly: string;
    monthlyPh: string;
    usePurpose: string;
    usePurposePh: string;
    features: string;
    featuresPh: string;
    message: string;
    messagePh: string;
    fileAttach: string;
    fileOptional: string;
    fileHelp: string;
    fileAction: string;
    submit: string;
    submitting: string;
    submitError: string;
    ctaHeading: (brand: string) => string;
    mapPlaceholder: string;
    faqHeading: string;
    faqSub: string;
    officeAddress: string;
    officeAddressValue: string;
    officeHours: string;
    officeHoursValue: string;
    officeEmail: string;
    officeEmailValue: string;
    officePhone: string;
    officePhoneValue: string;
    faqs: { q: string; a: string }[];
  };

  /* ── VideoModal ── */
  videoModal: {
    close: string;
    videoNotSupported: string;
    videoNotReady: string;
    ctaProduction: string;
    ctaStudio: string;
  };

  /* ── ContactModal ── */
  contactModal: {
    ariaLabel: string;
    heading: string;
    close: string;
    successHeading: string;
    successSub: string;
    tabProduction: string;
    tabStudio: string;
    company: string;
    name: string;
    email: string;
    phone: string;
    goal: string;
    deadline: string;
    deadlinePlaceholder: string;
    budget: string;
    budgetPlaceholder: string;
    reference: string;
    referencePlaceholder: string;
    teamSize: string;
    teamSizePlaceholder: string;
    monthly: string;
    monthlyPlaceholder: string;
    usePurpose: string;
    usePurposePlaceholder: string;
    features: string;
    featuresPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    fileLabel: string;
    fileOptional: string;
    fileHint: string;
    fileDrop: string;
    errorDefault: string;
    submitting: string;
    submit: string;
  };

  /* ── 이용약관 ── */
  terms: {
    heading: string;
    lastUpdated: string;
    sections: { title: string; content: string }[];
  };

  /* ── 개인정보처리방침 ── */
  privacy: {
    heading: string;
    lastUpdated: string;
    sections: { title: string; content: string }[];
  };

  /* ── Floating CTA ── */
  floatingCta: {
    productionLabel: string;
    productionAria: string;
    studioLabel: string;
    studioAria: string;
  };

  /* ── FAQ ── */
  faq: {
    heading: string;
    description: string;
    faqs: { q: string; a: string }[];
    contactPrompt: string;
    contactLink: (brandName: string) => string;
  };
}
