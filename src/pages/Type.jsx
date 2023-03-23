import { Pokedex } from "pokeapi-js-wrapper";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Type.css";

function Type() {
  const { typeName } = useParams();
  const [typeInfo, setTypeInfo] = useState(null);
  const P = new Pokedex();
  const getTypeInfo = async () => {
    const res = await P.getTypeByName(typeName);
    console.log(res);
    setTypeInfo(res);
  };

  useEffect(() => {
    getTypeInfo();
  }, []);
  return (
    typeInfo !== null && (
      <div>
        <p id="typeName">{typeName.toUpperCase()}</p>
        <div id="typeRelations">
          <div>
            <p className="relationName">Super-effective from:</p>
            {typeInfo.damage_relations.double_damage_from.map((type, index) => (
              <p key={index}>
                <Link to={`/type/${type.name}`}>{type.name}</Link> moves are
                super-effective against {typeName} type pokemon
              </p>
            ))}
          </div>
          <div>
            <p className="relationName">Super-effective to:</p>
            {typeInfo.damage_relations.double_damage_to.map((type, index) => (
              <p key={index}>
                {typeName} moves are super-effective against{" "}
                <Link to={`/type/${type.name}`}>{type.name}</Link> type pokemon
              </p>
            ))}
          </div>
          <div>
            <p className="relationName">Not very effective from:</p>
            {typeInfo.damage_relations.half_damage_from.map((type, index) => (
              <p key={index}>
                <Link to={`/type/${type.name}`}>{type.name}</Link> moves are not
                very effective against {typeName} type pokemon
              </p>
            ))}
          </div>
          <div>
            <p className="relationName">Not very effective to:</p>
            {typeInfo.damage_relations.half_damage_to.map((type, index) => (
              <p key={index}>
                {typeName} moves are not very effective against{" "}
                <Link to={`/type/${type.name}`}>{type.name}</Link> type pokemon
              </p>
            ))}
          </div>
          <div>
            <p className="relationName">No effect from:</p>
            {typeInfo.damage_relations.no_damage_from.map((type, index) => (
              <p key={index}>
                <Link to={`/type/${type.name}`}>{type.name}</Link> moves have no
                effect on {typeName} type pokemon
              </p>
            ))}
          </div>
          <div>
            <p className="relationName">No effect to:</p>
            {typeInfo.damage_relations.no_damage_to.map((type, index) => (
              <p key={index}>
                {typeName} moves have no effect on{" "}
                <Link to={`/type/${type.name}`}>{type.name}</Link> type pokemon
              </p>
            ))}
          </div>
        </div>
        {/* <ul id="moveWhichAre">
          {typeInfo.moves.map((move, index) => (
            <li key={index}>
              <Link to={`/move/${move.name}`} className="move">
                {move.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul id="pokemonWhichAre">
          {typeInfo.pokemon.map((pokemon, index) => (
            <li key={index}>
              <Link to={`/pokemon/${pokemon.pokemon.name}`} className="pokemon">
                {pokemon.pokemon.name}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
    )
  );
}

export default Type;
