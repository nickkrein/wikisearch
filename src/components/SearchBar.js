import React from 'react';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
    	gacprefix: ''
    }
  }

  handleChange = (e) => {
  	
  	const userInput = e.target.value;
  	
  	this.setState({
  	 	gacprefix: userInput
  	 }); 

  	this.props.getCategories(userInput);
  }

  render() {
    return (
      <input 
      	onChange={this.handleChange} 
      	value={this.state.text}
      	placeholder='Search for a category!'
      />
    );
  }
}
