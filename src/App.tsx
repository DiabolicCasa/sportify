
import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import ErrorPage from "./pages/error";


const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <DashBoard />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Home />,
  //     },
  //     {
  //       path: "/posters",
  //       element: <Posters />,
  //     },
  //   ],
  // },
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