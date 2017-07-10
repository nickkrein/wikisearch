import React from 'react';
import { uniqueId } from 'lodash';

export default class CategoryList extends React.Component {

	constructor() {
		super()
		this.state = {
			activeItem: ""
		}
	}

	handleClick = (item) => {
		this.props.getPages(item.pageid);
		this.setState({
			activeItem: item.title 
		});
	}

	isActive = (item) => {
		return 'listItem ' + (item === this.state.activeItem ? 'active': '');
	}

  render() {
    return (
      <ul className="categoryList">
      	{
      		this.props.categories.map((item, index, arr) => {
      			return (
      				<li className={this.isActive(item.title)} key={uniqueId()}>
      					<a id={item.pageid} onClick={() => this.handleClick(item)}>{item.title}</a>
      				</li>
      			)
      		})
      	}
      </ul>
    );
  }
}
