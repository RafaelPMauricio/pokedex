import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  return (
    <div id="container">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
