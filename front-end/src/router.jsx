import { createBrowserRouter } from "react-router-dom";
import HomeHandler from "./views/HomeHandler";
import Login from "./views/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomeHandler />,
  },
]);

export default router;