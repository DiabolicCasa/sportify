import {
    createBrowserRouter,
    
   
  } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import ErrorPage from "../pages/error";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home";
import LandingPage from "../pages/landing";
  
  

export  const mainRouter = createBrowserRouter([
    {
      path: "/home",
      element: <ProtectedRoute component={Home}/>,
     
    },
    {
        path: "/",
        element: <LandingPage/>,
       
      },
    {
      path: "/signin",
      element: <Signin />,
    },
  
    {
      path: "/signup",
      element: <Signup/>,
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  