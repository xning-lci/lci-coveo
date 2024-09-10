import React, {useEffect} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { coveoAdvancedSearch } from "../common/utils";
import SearchBox from './SearchBox';
import QuerySummary from './QuerySummary';
import ResultList from './ResultList';
import Pager from './Pager';
import Sort from './Sort';
import FacetList from './FacetList';
import ResultsPerPage from './ResultsPerPage';
import {SearchEngine, loadSearchAnalyticsActions} from '@coveo/headless';
import { CategoryTabs, Tab } from "./Tab";

interface ISearchPageProps {
  engine: SearchEngine;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const {engine} = props;
  const { logInterfaceLoad } = loadSearchAnalyticsActions(engine);

  useEffect(() => {
    coveoAdvancedSearch([{
      isNewsEvents: false,
      query: "lci_category",
      value: ""
    }], engine, 'en')
    engine.executeFirstSearch(logInterfaceLoad());
  }, [engine]);

  return (

      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          <Grid item md={8}>
            <SearchBox />
          </Grid>
        </Grid>
        <CategoryTabs engine={engine} />
        <Box my={4}>
          <Grid container>
            <Grid item md={3} sm={12}>
              <FacetList />
            </Grid>
            <Grid item md={9} sm={12}>
              <Box pl={3}>
                <Grid container alignItems="flex-end">
                  <Grid item md={10}>
                    <QuerySummary />
                  </Grid>
                  <Grid item md={2}>
                    <Sort />
                  </Grid>
                </Grid>
                <ResultList />
              </Box>
              <Box my={4}>
                <Grid container>
                  <Grid item md={6}>
                    <Pager />
                  </Grid>
                  <Grid item md={6}>
                    <ResultsPerPage />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
  );
};

export default SearchPage;
