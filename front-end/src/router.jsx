import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import Services from "./views/Services";
import Schedules from "./views/Schedules";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    children:[
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"/home/atendimentos",
        element:<Services/>
      },
      {
        path:"/home/horarios",
        element:<Schedules/>
      }
    ]
  },
]);

export default router;