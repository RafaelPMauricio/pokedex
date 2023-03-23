import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

function PokemonCard({ pokemonName, pokedex }) {
  const [pokemonInfo, setPokemonInfo] = useState(null);

  const getPokemonInfo = async () => {
    const res = await pokedex.getPokemonByName(pokemonName);
    await setPokemonInfo(res);
  };

  useEffect(() => {
    try {
      getPokemonInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Link to={`/pokemon/${pokemonName}`}>
      <div className="CardBox">
        {pokemonInfo === null && <p>Carregando...</p>}
        {pokemonInfo !== null && (
          <img
            src={pokemonInfo.sprites.front_default}
            alt="pokemon-front-sprite"
            className="pokemonSprite"
          />
        )}
        <div className="descBox">
          <span className="pokemonName">
            {pokemonInfo !== null && pokemonInfo.name}
          </span>
          <div className="types">
            {pokemonInfo !== null && (
              <img
                src={require(`../Images/pokemon-type-icons/Pokemon_Type_Icon_${pokemonInfo.types[0].type.name}.png`)}
                alt="Primeiro-Tipo"
                className="type1"
              />
            )}
            {pokemonInfo !== null && pokemonInfo.types.length > 1 && (
              <img
                src={require(`../Images/pokemon-type-icons/Pokemon_Type_Icon_${pokemonInfo.types[1].type.name}.png`)}
                alt="Segundo-Tipo"
                className="type2"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
