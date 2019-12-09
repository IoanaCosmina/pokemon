import React from 'react';

const IMG_ADDRESS = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

const PokemonCard = ({ pokemon, id, handlePokemonClick }) => {
    if (!pokemon) return null;

    const { name } = pokemon;

    let handleClick = () => {
        handlePokemonClick(name);
    }

    return (
        <div className="section">
            <div onClick={handleClick}>
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
        </div>
    )
}

export default PokemonCard;