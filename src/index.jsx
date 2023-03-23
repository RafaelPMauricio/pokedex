import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Dex from "./pages/Dex";
import Pokemon from "./pages/Pokemon";
import Move from "./pages/Move";
import Ability from "./pages/Ability";
import Type from "./pages/Type";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/page/:pageNumber" element={<Dex />} />
          <Route path="/pokemon/:pokemonName" element={<Pokemon />} />
          <Route path="/move/:moveName" element={<Move />} />
          <Route path="/ability/:abilityName" element={<Ability />} />
          <Route path="/type/:typeName" element={<Type />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
