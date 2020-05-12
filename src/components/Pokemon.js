import React from 'react';
import PokemonCard from './PokemonCard';

const Pokemon = ({ pokemon, toggleDetails, handlePokemonClick }) => {
    const { base_experience, abilities, types, weight } = pokemon;
    const abilitiesArray = [];
    const typesArray = [];

    types.map(t => { typesArray.push(t.type.name) });
    abilities.map(a => { abilitiesArray.push(a.ability.name) });

    return (
        <div className="pokemon-info">
            <PokemonCard key={pokemon.name} id={pokemon.id} pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
            {
                toggleDetails ?
                    <div className="section">
                        <p>Types: <strong>{typesArray.join(", ")}</strong></p>
                        <p>Abilities: <strong>{abilitiesArray.join(", ")}</strong></p>
                        <p>Base experience: <strong>{base_experience}</strong></p>
                        <p>Weight: <strong>{weight}</strong></p>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Pokemon;