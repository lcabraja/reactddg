import React, { Component } from 'react';
import axios from 'axios';
import Results from './results.jsx';

class navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchDone: 0,
      value: '',
      results: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  async getResults() {
    const resp = await axios.get('/api/ddg', {
      params: { q: this.state.value, format: 'json' }
    });
    this.setState({ results: resp.data || null });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ searchDone: this.state.searchDone + 1 });
    this.getResults();
    event.preventDefault();
  }

  renderResults() {
    if (this.state.results === 0)
      return (
        <p className="h1">No Results from API</p>,
        console.log('Got Empty Array')
      );
    return <Results value={this.state.value} results={this.state.results} />;
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
              value={this.state.value}
              onChange={this.handleChange}
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
        {this.renderResults()}
      </React.Fragment>
    );
  }
}

export default navbar;
