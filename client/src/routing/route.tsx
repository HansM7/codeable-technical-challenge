import IndexPage from "@/components/pages/index.page";
import LoginPage from "@/components/pages/login.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "",
    element: <IndexPage />,
  },
]);
