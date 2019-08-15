import React, { Component } from 'react';

class searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container float-left">
        <ul>
          {this.props.results.map((result, index) => (
            <li key={index}>
              <a href={result.FirstURL || result.URL}>
                {result.Text || this.props.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default searchbar;
