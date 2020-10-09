import React, { FC, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import routes from "../config/routes";

const Layout: FC = () => {
  return (
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
  );
};

export default Layout;
