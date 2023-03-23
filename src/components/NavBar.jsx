import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div id="NavBar">
      <Link to="/">
        <h2 id="HomeLink">Little Dex</h2>
      </Link>
      <div id="filter"></div>
    </div>
  );
}

export default NavBar;
