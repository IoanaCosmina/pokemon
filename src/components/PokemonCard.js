import React from 'react';

const IMG_ADDRESS = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

const PokemonCard = ({ pokemon, id }) => {
    if (!pokemon) return null;

    const { name } = pokemon;

    return (
        <div className="section">
            <img
                src={`${IMG_ADDRESS}/${id}.png`}
                alt='pokemon-image'
                style={{
                    width: 96,
                    height: 96,
                    objectFit: 'cover'
                }}
            />
            <h4>{name}</h4>
        </div>
    )
}

export default PokemonCard;