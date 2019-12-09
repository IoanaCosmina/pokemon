import React from 'react';
import PokemonCard from './PokemonCard';

const Pokemon = ({ pokemon, toggleDetails, handlePokemonClick }) => {
    const { base_experience, abilities, types, weight } = pokemon;
    const abilitiesArray = [];
    const typesArray = [];

    return (
        <div>
            <PokemonCard key={pokemon.name} id={pokemon.id} pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
            {
                toggleDetails ?
                    <div className="section">  
                        {
                            types.map(t => { typesArray.push(t.type.name) })
                        }
                        <p>Types: <strong>{typesArray.join(", ")}</strong></p>
                        {
                            abilities.map(a => { abilitiesArray.push(a.ability.name) })
                        }
                        <p>Abilities: <strong>{abilitiesArray.join(", ")}</strong></p>
                        <p>Base experience: <strong>{base_experience}</strong></p>
                        <p>Weight: <strong>{weight}</strong></p>
                    </div>
                    :
                    <div></div>
            }
        </div>
    )
}

export default Pokemon;