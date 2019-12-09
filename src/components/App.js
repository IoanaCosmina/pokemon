import React, { Component } from 'react';
import Search from './Search';
import Pokemon from './Pokemon';
import PokemonCard from './PokemonCard';

const API_ADDRESS = 'https://pokeapi.co/api/v2';

const EMPTY_SEARCH = "empty";
const NO_RESULT_SEARCH = "noResult";
const RESULT_FOUND_SEARCH = "resultFound";

const LIMIT = 15;
let OFFSET = 0;

class App extends Component {
    state = { pokemon: null, pokemonArray: [], toggleDetails: false, search: EMPTY_SEARCH };

    componentDidMount() {
        this.loadPokemonSet();
    }

    loadPokemonSet = () => {
        fetch(`${API_ADDRESS}/pokemon/?limit=${LIMIT}&offset=${OFFSET}`)
            .then(response => response.json())
            .then(json => this.setState({ pokemonArray: json.results }))
            .catch(error => alert(error.message));
    }

    searchPokemon = pokemonQuery => {
        if (pokemonQuery === "") return;

        fetch(`${API_ADDRESS}/pokemon/${pokemonQuery}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ pokemon: json, search: RESULT_FOUND_SEARCH, toggleDetails: false });
            })
            .catch(error => {
                this.setState({ pokemon: null, search: NO_RESULT_SEARCH });
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
        this.setState({ search: EMPTY_SEARCH });
    }

    handlePokemonClick = name => {
        this.searchPokemon(name);
    }

    loadPreviousSet = () => {
        OFFSET <= LIMIT ? OFFSET = 0 : OFFSET -= LIMIT;
        this.loadPokemonSet();
    }

    loadNextSet = () => {
        OFFSET += LIMIT;
        this.loadPokemonSet();
    }

    render() {
        const buttonText = this.state.toggleDetails ? "Hide details" : "Show details";
        return (
            <div>
                <h1>Pokemon Database</h1>
                <Search searchPokemon={this.searchPokemon} clearResult={this.clearResult} />
                {
                    this.state.search == NO_RESULT_SEARCH ?
                        <div>
                            <div className="message message--warning">
                                This Pokemon escaped from our database. Please try a different name.
                            </div>
                        </div>
                        :
                        (this.state.search == RESULT_FOUND_SEARCH ?
                            <div>
                                <Pokemon
                                    pokemon={this.state.pokemon}
                                    toggleDetails={this.state.toggleDetails}
                                />
                                <button className="button button--small" onClick={this.toggleView}>{buttonText}</button>
                            </div>
                            :
                            ""
                        )
                }
                <hr />
                <h2>Random Pokemons</h2>
                <div>
                    <button className="button button--small" onClick={this.loadPreviousSet}>Previous</button>
                    <button className="button button--small" onClick={this.loadNextSet}>Next</button>
                </div>
                <div className="container">
                    {
                        this.state.pokemonArray.map(pokemon =>
                            (<PokemonCard
                                key={pokemon.name}
                                id={this.getIdFromUrl(pokemon.url)}
                                pokemon={pokemon}
                                handlePokemonClick={this.handlePokemonClick}
                            />))
                    }
                </div>
            </div>
        )
    }
}

export default App;