import React, { Component } from 'react';

class Search extends Component {
    state = { pokemonQuery: '' };
    
    updatePokemonQuery = event => {;
        this.setState({ pokemonQuery: event.target.value.toLowerCase() });
    }

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.searchPokemon();
        }
    }

    searchPokemon = () => {
        this.props.searchPokemon(this.state.pokemonQuery);
    }

    clearSearch = () => {
        document.getElementById('searchField').value = '';
    }

    handleClear = () => {
        this.clearSearch();
        this.props.clearResult();
    }

    render() {
        return (
            <div className="search">
                <input
                    id="searchField"
                    onChange={this.updatePokemonQuery}
                    onKeyPress={this.handleKeyPress}
                    placeholder="Search for a Pokemon" />
                <button className="button button--search" onClick={this.searchPokemon}>Search</button>
                <button className="button button--danger" onClick={this.handleClear}>Clear</button>
            </div>
        )
    }
}

export default Search;