import React from 'react';
import PokemonCard from './PokemonCard';

const Pokemon = ({ pokemon, toggleDetails }) => {
    const { base_experience, abilities, types, weight } = pokemon;
    const abilitiesArray = [];
    const typesArray = [];

    return (
        <div>
            <PokemonCard key={pokemon.name} id={pokemon.id} pokemon={pokemon} />
            {
                toggleDetails ?
                    <div>  
                        {
                            types.map(t => { typesArray.push(t.type.name) })
                        }
                        <p>Types: {typesArray.join(", ")}</p>
                        {
                            abilities.map(a => { abilitiesArray.push(a.ability.name) })
                        }
                        <p>Abilities: {abilitiesArray.join(", ")}</p>
                        <p>Base experience: {base_experience}</p>
                        <p>Weight: {weight}</p>
                    </div>
                    :
                    <div></div>
            }
        </div>
    )
}

export default Pokemon;