import React from 'react';
import { uniqueId } from 'lodash';
import '../stylesheets/components/List.css'

export default class PageList extends React.Component {

  render() {
    return (
      <ul className= "pageList">
      	{
      		this.props.pages.map((item, index, arr) => {
      			return (
      				<li key={uniqueId()}>
      					<a href={item.fullurl} target="_blank">{item.title}</a>
      				</li>
      			)
      		})
      	}
      </ul>
    );
  }
}
