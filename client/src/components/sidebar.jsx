import React, { Component } from 'react';

class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { persistance: [{ count: 1 }] };
    this.renderPersistance = this.renderPersistance.bind(this);
  }

  renderPersistance() {
    if (this.state.results === 0)
      return (
        <ul>
          {this.props.persistance.map((result, index) => (
            <li key={result.count}>
              <p>
                {result.search}
                <button onClick={this.props.fillText} />
              </p>
            </li>
          ))}{' '}
        </ul>
      );
  }

  render() {
    return (
      <div className="container bg-primary float-right">
        {this.renderPersistance()}
      </div>
    );
  }
}

export default sidebar;
