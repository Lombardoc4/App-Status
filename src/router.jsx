import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Dashboard from "./pages/dashboard.jsx";
import Layout from "./pages/layout";
import Account from "./pages/account";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <App />,
        },
        {
          path: "account",
          element: <Account/>,
        },
        {
          path: "dashboard",
          element: <Dashboard/>,
        },
        {
          path: "login",
          element: <Login/>,
        },
      ],
    },
  ]);


export default router;