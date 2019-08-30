import React, { Component } from 'react';

class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persistance: this.props.persistance
    };
    this.renderPersistance = this.renderPersistance.bind(this);
    this.makeButton = this.makeButton.bind(this);
  }

  makeButton(data) {
    console.log(data)
    return (
      <li key={data._id}>
        <p>
          <button
            onClick={() => {
              this.props.fillText(data.query);
              this.props.getResults();
            }}
          >
            {data.query}
          </button>
        </p>
      </li>
    );
  }

  renderPersistance() {
    if (this.props.persistance === null)
      return <p>No history</p>;
    return (
      <ul>
        {this.props.persistance.map(this.makeButton)}
      </ul>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderPersistance()}
      </div>
    );
  }
}

export default sidebar;
