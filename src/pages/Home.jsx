import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div id="homeContainer">
      <h1>Little Dex</h1>
      <Link to="/page/1">Go to Dex</Link>
    </div>
  );
}

export default Home;
