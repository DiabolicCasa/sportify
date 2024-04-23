import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./routes";



function App() {
  return (
    <div className="app">
      <RouterProvider router={mainRouter} />
    </div>
  );
}

export default App;