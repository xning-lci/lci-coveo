import { SearchBoxOptions } from '@coveo/headless';
import isEmpty from 'lodash/isEmpty';
import {
  BreadcrumbManager as BreadcrumbManagerType,
  buildBreadcrumbManager,
  buildCategoryFacet,
  buildContext,
  buildFacet,
  buildFacetManager,
  buildInteractiveResult,
  buildResultList,
  buildSearchBox,
  buildSearchStatus,
  buildSort,
  buildTab,
  buildUrlManager,
  CategoryFacetOptions,
  CategoryFacet as CategoryFacetType,
  Context as ContextType,
  FacetManager as FacetManagerType,
  FacetOptions,
  Facet as FacetType,
  InteractiveResult as InteractiveResultType,
  loadAdvancedSearchQueryActions,
  loadSearchAnalyticsActions,
  loadSearchConfigurationActions,
  ResultList as ResultListType,
  Result as ResultType,
  SearchBox as SearchBoxType,
  SearchEngine as SearchEngineType,
  SearchStatus as SearchStatusType,
  SortInitialState as SortInitialStateTypes,
  Sort as SortType,
  TabOptions,
  Tab as TabType,
  UrlManager as UrlManagerType,
  loadSearchActions,
} from '@coveo/headless';
import { campusData } from "./campusData";

export const fetchMetaContent = (MetaName: string): string => {
  if (typeof document === 'undefined') return '';

  const metaTag = document.querySelector(`meta[name="${MetaName}"]`);

  if (metaTag) {
    return metaTag.getAttribute('content') || '';
  }
  return '';
};


export const searchBoxOptions: SearchBoxOptions = {
  numberOfSuggestions: 10,
  highlightOptions: {
    notMatchDelimiters: {
      open: '<span>',
      close: '</span>',
    },
    exactMatchDelimiters: {
      open: '<strong>',
      close: '</strong>',
    },
  },
};

export const COVEO_CAMPUS = 'lci_campus';
export const COVEO_CATEGORY = 'lci_category';
export const COVEO_CATEGORY_EVENTS = 'Events';
export const COVEO_CATEGORY_NEWS = 'News';
export const COVEO_CATEGORY_PROGRAM = 'Programs';
export const COVEO_CATEGORY_THOUGHT_LEADERSHIP = 'ThoughtLeadership';
export const COVEO_LANGUAGE = 'lci_lang_code';
export const tabList = {
  all: 'tabAll',
  news: 'tabNews',
  events: 'tabEvents',
  programs: 'tabPrograms',
};

/*
 * Fetch campus from meta tag, if there is no data, then check the URL
 * */
export const getCampus = () => {
  const campus = fetchMetaContent('campus');
  if (campus) {
    return campus;
  }
  const { host } = window.location;
  for (const item of campusData) {
    if (host === item.domain) {
      return item.campus;
    }
  }
  // return Global as default (for Storybook)
  return campusData[0].campus;
};

export type CoveoAdvancedQueryProps = Array<{ query: string; value: string; isNewsEvents?: boolean; isSort?: boolean }>;

/*
  * Coveo advanced search query is the hidden query for end user
  * Filter the campus based on the different institution,
  * */
export const coveoAdvancedSearch = (queryList: CoveoAdvancedQueryProps, searchEngine:SearchEngineType , locale: string) => {
  if (!isEmpty(queryList)) {
    const loadAdvancedSearchQuery = loadAdvancedSearchQueryActions(searchEngine);
    const aqLocale = `@${COVEO_LANGUAGE}==${locale}`;
    const campus = getCampus();

    /* Add additional advanced query */
    const otherQueryArray: Array<string> = [];
    let hasNewsEvents = 0;
    queryList.forEach(({ query, value, isNewsEvents = false, isSort }) => {
      if (!isEmpty(value)) {
        if (isNewsEvents) {
          hasNewsEvents += 1;
        }
        if (isSort) {
          otherQueryArray.unshift(`$sort(criteria: 'field${value}', field: '@${query}')`);
        } else {
          otherQueryArray.push(`@${query}==${value}`);
        }
      }
    });
    const aqOther = otherQueryArray.join(' AND ');

    /* Add the campus as default advanced search query for all query,
     *  if the campus is empty, means need to fetch data through all institutions
     */
    const aqCampus = () => {
      if (campus === 'Global' && hasNewsEvents === 0) {
        return '';
      }
      return `@${COVEO_CAMPUS}==${campus}`;
    };

    let aqFinal: string;

    if (!isEmpty(aqCampus())) {
      if (!isEmpty(aqOther)) {
        aqFinal = `${aqLocale} AND ${aqCampus()} AND ${aqOther}`;
      } else {
        aqFinal = `${aqLocale} AND ${aqCampus()}`;
      }
    } else {
      /* No campus mean global website, and need to fetch data through all institutions by different locales */
      const globalLocales = [];

      for (const eachCampus of campusData) {
        let currentLocale = locale;
        if (!eachCampus.locales.includes(locale)) {
          currentLocale = eachCampus.globalDefaultLocales;
        }
        if (!isEmpty(aqOther)) {
          globalLocales.unshift(
            `(@${COVEO_CAMPUS}==${eachCampus.campus} AND @${COVEO_LANGUAGE}==${currentLocale} AND ${aqOther})`,
          );
        } else {
          globalLocales.unshift(`(@${COVEO_CAMPUS}==${eachCampus.campus} AND @${COVEO_LANGUAGE}==${currentLocale})`);
        }
      }
      aqFinal = globalLocales.join(' OR ');
    }

    /* Add other advanced search query as additional query */
    const action = loadAdvancedSearchQuery.registerAdvancedSearchQueries({
      aq: aqFinal,
    });
    searchEngine.dispatch(action);
  }
}
