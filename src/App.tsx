
import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import ErrorPage from "./pages/error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Landing Page</h1>,
   
  },
  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/signup",
    element: <Signup />,
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

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;