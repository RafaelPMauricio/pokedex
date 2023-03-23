import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import PokemonCard from "../components/PokemonCard";

import "./Dex.css";

function Dex() {
  const { pageNumber } = useParams();
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
  const [pageCount, setPageCount] = useState();
  const P = new Pokedex();
  const [pokemonList, setPokemonList] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    `${apiUrl}?offset=${pageNumber * 45 - 45}&limit=45`
  );

  let array = [];

  for (let index = 0; index < pageCount; index++) {
    array.push(index + 1);
  }

  const getNationalDex = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setPageCount(Math.ceil(data.count / 45));
    return data.results;
  };

  useEffect(() => {
    getNationalDex(currentUrl).then((response) => setPokemonList(response));
  }, [currentUrl]);

  return (
    <div id="dexContainer">
      <div id="pokemonView">
        {pokemonList.length === 0 && <p>Carregando...</p>}
        {pokemonList.length > 0 &&
          pokemonList.map((pokemon, index) => {
            return (
              <PokemonCard key={index} pokemonName={pokemon.name} pokedex={P} />
            );
          })}
      </div>
      <div id="navButtons">
        {pageNumber > 1 && (
          <Link
            to={`/page/${+pageNumber - 1}`}
            onClick={() => {
              setCurrentUrl(
                `${apiUrl}?offset=${pageNumber * 45 - 45}&limit=45`.splice()
              );
            }}
          >
            <button id="prevButton">Prev</button>
          </Link>
        )}
        {array.map((number) => (
          <Link
            to={`/page/${number}`}
            key={number}
            onClick={() => {
              setCurrentUrl(
                `${apiUrl}?offset=${pageNumber * 45 - 45}&limit=45`.splice()
              );
            }}
          >
            <button className="numberButton">{number}</button>
          </Link>
        ))}
        {pageNumber < pageCount && (
          <Link
            to={`/page/${+pageNumber + 1}`}
            onClick={() => {
              setCurrentUrl(
                `${apiUrl}?offset=${pageNumber * 45 - 45}&limit=45`.splice()
              );
            }}
          >
            <button id="nextButton">Next</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Dex;
