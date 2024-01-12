import { createBrowserRouter } from "react-router-dom";
import MainPage from "../page/MainPage";

const routers = createBrowserRouter([
    {
      path: "*",
      element: <MainPage />,
    },
  ]);

export default routers;
