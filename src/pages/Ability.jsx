import { Pokedex } from "pokeapi-js-wrapper";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Ability.css";

function Ability() {
  const { abilityName } = useParams();
  const [abilityInfo, setAbilityInfo] = useState(null);
  const P = new Pokedex();
  const getAbilityInfo = async () => {
    const res = await P.getAbilityByName(abilityName);
    console.log(res);
    setAbilityInfo(res);
  };

  useEffect(() => {
    getAbilityInfo();
  }, []);
  return (
    abilityInfo !== null && (
      <div>
        <p id="abilityName">{abilityName}</p>
        {abilityInfo.effect_entries.length > 1 && (
          <div id="abilityEffect">{abilityInfo.effect_entries[1].effect}</div>
        )}
        <ul id="pokemonWhichHave">
          {abilityInfo.pokemon.map((pokemon, index) => (
            <li key={index}>
              <Link to={`/pokemon/${pokemon.pokemon.name}`} className="pokemon">
                {pokemon.pokemon.name}
              </Link>{" "}
              Is Hidden:{" "}
              {pokemon.is_hidden ? <span>true</span> : <span>false</span>}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default Ability;
