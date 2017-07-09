import React, { Component } from 'react';
import SearchBar from './SearchBar.js';

class App extends Component {

  constructor() {
    super();

    this.state = {
      categories: []
    }
  }

  getCategories = (userInput) => {
    fetch(`/categories?gacprefix=${userInput}`)
      .then(response => response.json())
      .then(categories => this.setState({ categories }, console.log(this.state.categories)))
  }

  render() {
    return (
      <div className="App">
        <SearchBar getCategories={this.getCategories} /> 
      </div>
    );
  }
}

export default App;
