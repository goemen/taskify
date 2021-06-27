import { RouteConfig } from "react-router-config";
import App from "./App";
import { AddTaskPage } from "./pages/AddTaskPage";
import { HomePage } from "./pages/HomePage";
import { OnBoardingPage } from "./pages/OnBoardingPage";
import { TaskDetailsPage } from "./pages/TaskDetailsPage";

export const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: HomePage,
      },
      {
        path: "/onboarding",
        component: OnBoardingPage,
      },
      {
        component: TaskDetailsPage,
        path: "/task/:id",
      },
      {
        path: "/task",
        component: AddTaskPage,
      },
    ],
  },
];
