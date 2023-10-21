import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import User from "./User";
import Home from "./Home.jsx";
import Messages from "./Messages.jsx";
import Profile from "./Profile.jsx";
import ErrorPage from "./ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "user/:name",
      element: <User />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "messages",
          element: <Messages />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
