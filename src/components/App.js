import React from 'react';
import SearchBar from './SearchBar.js';
import CategoryList from './CategoryList.js';
import PageList from './PageList.js';
import '../stylesheets/components/App.css';

export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      categories: [],
      pages: []
    }
  }

  getCategories = (userInput) => {
    fetch(`/categories?gacprefix=${userInput}`)
      .then(response => response.json())
      .then(categories => this.setState({ categories }))
  } 

  getPages = (categoryId) => {
    fetch(`/pages?categoryId=${categoryId}`)
      .then(response => response.json())
      .then(pages => this.setState({ pages }))
  }

  clearCategories = () => {
    this.setState({
      categories: [] 
    });
  }

  render() {
    return (
      <div className="app">
        <SearchBar getCategories={this.getCategories} clearCategories={this.clearCategories} />
        <div className="list-container"> 
          <CategoryList categories={this.state.categories} getPages={this.getPages} /> 
          <PageList pages={this.state.pages} />
        </div>
      </div>
    );
  }
}
