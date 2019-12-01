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
                <h1>Pokemon Database</h1>
                <Search searchPokemon={this.searchPokemon} clearResult={this.clearResult} />
                {
                    this.state.search == "noResult" ?
                        <div>
                            <div className="message message--warning">
                                This Pokemon escaped from our database. Please try a different name.
                            </div>
                        </div>
                        :
                        (this.state.search == "resultFound" ?
                            <div>
                                <Pokemon pokemon={this.state.pokemon} toggleDetails={this.state.toggleDetails} />
                                <button className="button button--small" onClick={this.toggleView}>{text}</button>
                            </div>
                            :
                            ""
                        )
                }
                <hr />
                <h2>Random Pokemons</h2>
                <div className="container">
                    {
                        this.state.pokemonArray.map(pokemon =>
                            (<PokemonCard
                                key={pokemon.name}
                                id={this.getIdFromUrl(pokemon.url)}
                                pokemon={pokemon} />))
                    }
                </div>
            </div>
        )
    }
}

export default App;