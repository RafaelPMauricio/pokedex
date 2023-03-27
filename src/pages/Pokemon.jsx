import { Pokedex } from "pokeapi-js-wrapper";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Pokemon.css";

function Pokemon() {
  const { pokemonName } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [moveMethod, setMoveMethod] = useState("level-up");
  const P = new Pokedex();
  const getPokemonInfo = async () => {
    const res = await P.getPokemonByName(pokemonName);
    console.log(res);
    setPokemonInfo(res);
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  return (
    pokemonInfo !== null && (
      <div className="container">
        <div className="group1">
          <div id="sprites">
            <img src={pokemonInfo.sprites.front_default} alt="front-sprite" />
            <img src={pokemonInfo.sprites.back_default} alt="back-sprite" />
          </div>
          <p id="name">{pokemonName}</p>

          <div id="types">
            <Link to={`/type/${pokemonInfo.types[0].type.name}`}>
              <img
                src={require(`../Images/pokemon-type-icons/Pokemon_Type_Icon_${pokemonInfo.types[0].type.name}.png`)}
                alt="Primeiro-Tipo"
                className="type1"
              />
            </Link>
            {pokemonInfo.types.length > 1 && (
              <Link to={`/type/${pokemonInfo.types[1].type.name}`}>
                <img
                  src={require(`../Images/pokemon-type-icons/Pokemon_Type_Icon_${pokemonInfo.types[1].type.name}.png`)}
                  alt="Segundo-Tipo"
                  className="type2"
                />
              </Link>
            )}
          </div>
        </div>

        <div className="group2">
          <p>
            <span>National Dex Number:</span> {pokemonInfo.id}
          </p>
          <div id="abilities">
            {pokemonInfo.abilities.map((ability) => (
              <p key={ability.slot}>
                <span>{ability.is_hidden && <span>Hidden </span>}Ability:</span>{" "}
                <Link to={`/ability/${ability.ability.name}`}>
                  {ability.ability.name}
                </Link>
              </p>
            ))}
          </div>
          <p>
            <span>Height:</span> {(pokemonInfo.height / 10).toFixed(1)}m
          </p>
          <p>
            <span>Weight:</span> {(pokemonInfo.weight / 10).toFixed(1)}Kg
          </p>
        </div>
        <ul id="stats">
          <li className="stat">
            <span>HP:</span> {pokemonInfo.stats[0].base_stat}
          </li>
          <li className="stat">
            <span>Attack:</span> {pokemonInfo.stats[1].base_stat}
          </li>
          <li className="stat">
            <span>Defense:</span> {pokemonInfo.stats[2].base_stat}
          </li>
          <li className="stat">
            <span>Sp. Atk:</span> {pokemonInfo.stats[3].base_stat}
          </li>
          <li className="stat">
            <span>Sp. Def:</span> {pokemonInfo.stats[4].base_stat}
          </li>
          <li className="stat">
            <span>Speed:</span> {pokemonInfo.stats[5].base_stat}
          </li>
        </ul>

        <ul className="moves">
          <div id="learnMethod">
            <button onClick={() => setMoveMethod("level-up")}>Level up</button>
            <button onClick={() => setMoveMethod("machine")}>TM</button>
            <button onClick={() => setMoveMethod("tutor")}>Move Tutor</button>
          </div>
          {pokemonInfo.moves.map(
            (move, index) =>
              move.version_group_details[move.version_group_details.length - 1]
                .move_learn_method.name === moveMethod && (
                <li key={index} className="move">
                  <span className="moveLevel">
                    {
                      move.version_group_details[
                        move.version_group_details.length - 1
                      ].level_learned_at
                    }{" "}
                    :
                  </span>
                  <Link to={`/move/${move.move.name}`} className="moveName">
                    {move.move.name}
                  </Link>
                  |
                  <span className="moveVersion">
                    {
                      move.version_group_details[
                        move.version_group_details.length - 1
                      ].version_group.name
                    }
                  </span>
                </li>
              )
          )}
        </ul>
      </div>
    )
  );
}

export default Pokemon;
