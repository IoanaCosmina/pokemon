import React, { Component } from 'react';
import Search from './Search';
import Pokemon from './Pokemon';
import PokemonCard from './PokemonCard';

const API_ADDRESS = 'https://pokeapi.co/api/v2';

class App extends Component {
    state = { pokemon: null, pokemonArray: [], toggleDetails: false, search: "empty" };

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(response => response.json())
            .then(json => this.setState({ pokemonArray: json.results }))
            .catch(error => alert(error.message));
    }

    searchPokemon = pokemonQuery => {
        fetch(`${API_ADDRESS}/pokemon/${pokemonQuery}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ pokemon: json, search: "resultFound", toggleDetails: false });
            })
            .catch(error => {
                this.setState({ pokemon: null, search: "noResult" });
                console.log(error.message);
            });
    }

    getIdFromUrl = url => {
        return url.split('/')[6];
    }

    toggleView = () => {
        this.setState({ toggleDetails: !this.state.toggleDetails });
    }

    clearResult = () => {
        this.setState({ search: "empty" });
    }

    render() {
        const text = this.state.toggleDetails ? "Hide details" : "Show details";
        return (
            <div>
                <h2>Pokemon Database</h2>
                <Search searchPokemon={this.searchPokemon} clearResult={this.clearResult} />
                {
                    this.state.search == "noResult" ?
                        <div>
                            No pokemon to display
                            </div>
                        :
                        (this.state.search == "resultFound" ?
                            <div>
                                <Pokemon pokemon={this.state.pokemon} toggleDetails={this.state.toggleDetails} />
                                <button onClick={this.toggleView}>{text}</button>
                            </div>
                            :
                            ""
                        )
                }
                <hr />
                <h2>Random Pokemons</h2>
                {
                    this.state.pokemonArray.map(pokemon =>
                        (<PokemonCard
                            key={pokemon.name}
                            id={this.getIdFromUrl(pokemon.url)}
                            pokemon={pokemon} />))
                }
            </div>
        )
    }
}

export default App;