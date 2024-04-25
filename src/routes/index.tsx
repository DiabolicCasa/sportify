import {
    createBrowserRouter,
    
   
  } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import ErrorPage from "../pages/error";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../pages/landing";
import ProfileHome from "../pages/profile";
import ArticlePage from "../pages/articles";
  
  

export  const mainRouter = createBrowserRouter([
    {
      path: "/home",
      element: <ProtectedRoute component={LandingPage}/>,
     
    },  {
      path: "/articles",
      element: <ProtectedRoute component={ArticlePage}/>,
     
    },
    
    {
      path: "/profile",
      element: <ProtectedRoute component={ProfileHome}/>,
     
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
  