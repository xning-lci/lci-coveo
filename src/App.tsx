import React, { useContext, useEffect } from 'react';
import Alert from '@mui/material/Alert';

import EngineContext, { EngineProvider } from "./common/engineContext";
import { bindUrlManager } from "./common/urlManager";
import SearchBox from "./Components/SearchBox";
import SearchPage from './Components/SearchPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {Grid, Typography, Box} from '@mui/material';
import {initializeHeadlessEngine} from './common/Engine';
import {SearchEngine} from '@coveo/headless';

export default function App() {
  const [engine, setEngine] = React.useState<SearchEngine | null>(null);

  useEffect(() => {
    initializeHeadlessEngine().then((engine) => {
      bindUrlManager(engine)
      setEngine(engine);
    });
  }, []);

  return (
    <EngineProvider value={engine}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isEnvValid() === true ? '/home' : '/error'} replace />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<Error />} />
        <Route path="/news" element={<News />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </Router>
    </EngineProvider>
  );
}

const isEnvValid = () => {
  const variables = [
    'REACT_APP_PLATFORM_URL',
    'REACT_APP_ORGANIZATION_ID',
    'REACT_APP_API_KEY',
    'REACT_APP_USER_EMAIL',
    'REACT_APP_SERVER_PORT',
    'REACT_APP_PLATFORM_ENVIRONMENT',
  ];
  const reducer = (previousValue: boolean, currentValue: string) =>
    previousValue && Boolean(process.env[currentValue]);
  return variables.reduce(reducer, true);
};

const Home = () => {
  const engine = useContext(EngineContext)!;
  if (engine) {
    return (
      <>
        <meta name={'campus'} content={'Montreal'}/>
        <Alert  severity="info"> You can search with `art` or `fashion`</Alert>

        <div className="App">
          <SearchBox />
        </div>
      </>
    );
  } else {
    return <div>Waiting for engine</div>;
  }
};

const SearchResult = () => {
  const engine = useContext(EngineContext)!;

  if (engine) {
    return (
      <>
        <meta name={'campus'} content={'Montreal'}/>
        <div className="App">
          <Alert  severity="error">Do not refresh, because I did not add the logic to keep the query. Your urlManager.state.fragment is not update when register with existing hash </Alert>
          <Alert  severity="info"> {`  const fragment = () => window.location.hash.slice(1);
            const urlManager = buildUrlManager(engine, {
              initialState: {fragment: fragment()},
            });`}</Alert>
          <Alert  severity="success">Now you might have at least one Error: signal is aborted in your console</Alert>
          {engine && <SearchPage engine={engine}/>}
        </div>
      </>
    );
  } else {
    return <div>Waiting for engine</div>;
  }
};

const Error = () => {
  return (
    <Box height="100vh" display="flex" align-items="center">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={9} sm={11}>
          <div className="container">
            <Typography variant="h4" color="error">
              Invalid Environment variables
            </Typography>
            <Typography variant="body1">
              You should have a valid <code>.env</code> file at the root of this
              project. You can use <code>.env.example</code> as starting point
              and make sure to replace all placeholder variables
              <code>&#60;...&#62;</code> by the proper information for your
              organization.
            </Typography>
            <p>
              Refer to the project <b>README</b> file for more information.
            </p>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

const News = ()=>{
return <div>test</div>
}
