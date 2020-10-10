import React, { FC, lazy, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

// Custom Components
import NavBar from "./NavBar";
import Notification from "./Notification";

import routes from "../config/routes";

const Layout: FC = () => {
  return (
    <Fragment>
      <NavBar />
      <Switch>
        {routes.map((route) => (
          <Route
            exact
            path={route.path}
            component={route.component}
            key={route.path}
          />
        ))}

        <Route component={lazy(() => import("../pages/404"))} />
      </Switch>
      <Notification />
    </Fragment>
  );
};

export default Layout;
