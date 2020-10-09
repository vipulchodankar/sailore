import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/home")),
  },
  {
    path: "/sailor",
    component: lazy(() => import("../pages/sailor")),
  },
  {
    path: "/sailor/:id",
    component: lazy(() => import("../pages/sailor/single")),
  },
];

export default routes;
