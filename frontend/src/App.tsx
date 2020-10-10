import React, { Fragment, Suspense } from "react";
import { Router } from "react-router-dom";
import history from "./utils/history";

// Redux
// Redux
import { Provider } from "react-redux";
import store, { persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";

// Mui
import { MuiThemeProvider } from "@material-ui/core";

// Custom Components
import Layout from "./components/Layout";
import Loader from "./components/Loader";

import theme from "./config/theme";

function App() {
  return (
    <Fragment>
      <Suspense fallback={<Loader fullscreen />}>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <MuiThemeProvider theme={theme}>
              <Router history={history}>
                <Layout />
              </Router>
            </MuiThemeProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </Fragment>
  );
}

export default App;
