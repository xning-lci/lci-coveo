/*
 * defaultLocales: default language for the campus
 * globalDefaultLocales: default language for the campus based on global website (COVEO search result)
 * */
export const campusData = [
  {
    campus: 'Global',
    domain: 'www.lcieducation.com',
    defaultLocales: 'en',
    globalDefaultLocales: 'en',
    locales: ['fr', 'en', 'es'],
    /* The truth is N/A, but this is using in facets dictionary */
    institution: 'LCI Global Network',
    projectName: 'web-www',
  },
  {
    campus: 'Montreal',
    domain: 'lasallecollege.lcieducation.com',
    defaultLocales: 'fr',
    globalDefaultLocales: 'en',
    locales: ['fr', 'en'],
    institution: 'lasalle-college-montreal',
    projectName: 'web-lasallecollege',
  },
  {
    campus: 'Vancouver',
    domain: 'lasallecollegevancouver.lcieducation.com',
    defaultLocales: 'en',
    globalDefaultLocales: 'en',
    locales: ['en'],
    institution: 'lasalle-college-vancouver',
    projectName: 'web-lasallecollegevancouver',
  },
  {
    campus: 'Melbourne',
    domain: 'melbourne.lcieducation.com',
    defaultLocales: 'en',
    globalDefaultLocales: 'en',
    locales: ['en'],
    institution: 'lci-melbourne',
    projectName: 'web-melbourne',
  },
  {
    campus: 'Barcelona',
    domain: 'barcelona.lcieducation.com',
    defaultLocales: 'en',
    globalDefaultLocales: 'es',
    locales: ['en', 'es', 'ca'],
    institution: 'lci-barcelona',
    projectName: 'web-barcelona',
  },
  {
    campus: 'Colombia',
    domain: 'colombia.lcieducation.com',
    defaultLocales: 'es',
    globalDefaultLocales: 'es',
    locales: ['es'],
    institution: 'lci-bogota',
    projectName: 'web-colombia',
  },
  {
    campus: 'Monterrey',
    domain: 'monterrey.lcieducation.com',
    defaultLocales: 'es',
    globalDefaultLocales: 'es',
    locales: ['es'],
    institution: 'lci-monterrey',
    projectName: 'web-monterrey',
  },
  {
    campus: 'Veritas',
    domain: 'veritas.lcieducation.com',
    defaultLocales: 'es',
    globalDefaultLocales: 'es',
    locales: ['es'],
    institution: 'universidad-lci-veritas',
    projectName: 'web-veritas',
  },
  {
    campus: 'Tunis',
    domain: 'collegelasalletunis.lcieducation.com',
    defaultLocales: 'fr',
    globalDefaultLocales: 'fr',
    locales: ['fr'],
    institution: 'college-lasalle-tunis',
    projectName: 'web-collegelasalletunis',
  },
  {
    campus: 'Maroc',
    domain: 'collegelasallemaroc.lcieducation.com/',
    defaultLocales: 'fr',
    globalDefaultLocales: 'fr',
    locales: ['fr'],
    institution: 'college-lasalle-maroc',
    projectName: 'web-collegelasallemaroc',
  },
  {
    campus: 'Hem',
    domain: 'hem.lcieducation.com',
    defaultLocales: 'fr',
    globalDefaultLocales: 'fr',
    locales: ['fr'],
    institution: 'hem',
    projectName: 'web-hem',
  },
  {
    campus: 'Istanbul',
    domain: 'lasallecollegeistanbul.lcieducation.com',
    defaultLocales: 'en',
    globalDefaultLocales: 'en',
    locales: ['en', 'tr'],
    institution: 'lasalle-college-istanbul',
    projectName: 'web-lasallecollegeistanbul',
  },
  {
    campus: 'Indonesia',
    domain: 'lasallecollegeindonesia.lcieducation.com',
    defaultLocales: 'en',
    globalDefaultLocales: 'en',
    locales: ['en', 'id'],
    institution: 'lasalle-college-jakarta',
    projectName: 'web-lasallecollegeindonesia',
  },
];

export type FacetsDictionaryType = {
  [FacetID: string]: {
    [Institution: string]: {
      [Locale: string]: string;
    };
  };
};
