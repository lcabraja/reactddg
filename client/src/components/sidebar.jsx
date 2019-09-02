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

  async handleButtonClick(data) {
    await this.props.fillText(data.query);
    this.props.getResults();
  }

  async handleButtonDelete() {
    await this.props.deleteHistory();
    this.props.getResults()
  }

  makeButton(data) {
    return (
          <button
          key={data._id}
            className="list-group-item list-group-item-action list-group-item-light mx-auto text-center text-capitalize"
            onClick={() => this.handleButtonClick(data)}
          >
            {data.query}
          </button>
    );
  }

  renderPersistance() {
    if (!this.props.persistance.length)
      this.props.getHistory();
    const delButton = (
      <button
        key="delete"
        className="list-group-item list-group-item-action list-group-item-dark mx-auto text-center text-capitalize"
        onClick={() => this.handleButtonDelete()}
      >
        Delete All Entries
      </button>
    );
    return (
      <div
        className="list-group">
        {this.props.persistance.map(this.makeButton)}
        {this.props.persistance.length ? delButton : ''}  
      </div>
    );
  }

  render() {
    return (
      <div className="col-sm-2">
        {this.renderPersistance()}
      </div>
    );
  }
}

export default sidebar;
