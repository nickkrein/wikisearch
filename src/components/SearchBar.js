import React from 'react';
import '../stylesheets/components/SearchBar.css'

export default class SearchBar extends React.Component {

	componentDidMount() {
		this.textInput.focus();
	}

  handleChange = (e) => {
  	let userInput = e.target.value;
  	if (!userInput) {
  		this.props.clearCategories()
  		return;
  	}
  	this.props.getCategories(e.target.value)
  }

  render() {
    return (
      <input className="searchbar"
      	onChange={this.handleChange} 
      	placeholder='Search for a category!'
      	ref={(input) => {this.textInput = input;}}
      />
    );
  }
}
