import { Pokedex } from "pokeapi-js-wrapper";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Move.css";

function Move() {
  const { moveName } = useParams();
  const [moveInfo, setMoveInfo] = useState(null);
  const P = new Pokedex();
  const getMoveInfo = async () => {
    const res = await P.getMoveByName(moveName);
    console.log(res);
    setMoveInfo(res);
  };

  useEffect(() => {
    getMoveInfo();
  }, []);
  return (
    moveInfo !== null && (
      <div id="moveContainer">
        <div id="moveInfo1">
          <p>{moveName}</p>
          <div>
            <span>Type:</span>
            <Link to={`/type/${moveInfo.type.name}`}>
              <img
                src={require(`../Images/pokemon-type-icons/Pokemon_Type_Icon_${moveInfo.type.name}.png`)}
                alt="Tipo"
                className="type"
              />
            </Link>
          </div>
        </div>
        <div id="moveInfo2">
          <p>
            <span>Power:</span> {moveInfo.power}
          </p>
          <p>
            <span>Accuracy:</span> {moveInfo.accuracy}
          </p>
          <p>
            <span>PP:</span> {moveInfo.pp}
          </p>
          <p>
            <span>{moveInfo.damage_class.name}</span>
          </p>
          <p>
            <span>Priority:</span> {moveInfo.priority}
          </p>
        </div>
        <p id="moveEffect">
          {moveInfo.effect_entries[0].effect.replace("$effect_chance%", "")}
        </p>

        <ul id="pokemonWhichLearn">
          {moveInfo.learned_by_pokemon.map((pokemon, index) => (
            <li key={index}>
              <Link to={`/pokemon/${pokemon.name}`} className="pokemon">
                {pokemon.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default Move;
