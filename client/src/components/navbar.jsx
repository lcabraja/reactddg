import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.getResults();
    if(event.preventDefault) event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={this.handleSubmit}
          >
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              name="searchField"
              value={this.props.value}
              onChange={this.props.handleChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              value="Submit"
            >
              Search
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
 
export default Navbar;