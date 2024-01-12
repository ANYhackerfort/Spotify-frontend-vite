import './App.css'
import routers from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={routers} />;
}

export default App
