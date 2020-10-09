import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Mui
import { MuiThemeProvider } from "@material-ui/core";

// Custom Components
import Layout from "./components/Layout";

import theme from "./config/theme";

function App() {
  return (
    <Fragment>
      <Suspense fallback={<p>Loading</p>}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Layout />
          </Router>
        </MuiThemeProvider>
      </Suspense>
    </Fragment>
  );
}

export default App;
