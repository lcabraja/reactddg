import React, { Component } from 'react';
import Navbar from './components/navbar.jsx';
import Results from './components/results.jsx'
import Sidebar from './components/sidebar.jsx';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.renderHistory = this.renderHistory.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  state = {
    value: '',
    results: [],
    persistance: []
  };

  fillText = (searchterm) => {
    this.setState({value: searchterm});
  } 

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async getResults() {
    console.log(`Getting results for: ${this.state.value}...`)
    const resp = await axios.get('/api/ddg', {
      params: { q: this.state.value, format: 'json' }
    });
    this.setState({ results: resp.data || null });
    this.getHistory()
  }

  async getHistory() {
    const resp = await axios.get('/api/history');
    await this.setState({ persistance: resp.data || null });
  }

  renderResults() {
    if (this.state.results === 0)
      return (
        <p className="h1">No Results from API</p>,
        console.log('Got Empty Array')
      );
    return <Results value={this.state.value} results={this.state.results} />;
  }

  renderHistory() {
    if (this.state.persistance === 0)
      return (
        <p className="h1">No Results from API</p>,
        console.log('Got Empty Array')
      );
    return <Sidebar persistance={this.state.persistance} fillText={this.fillText} getResults={this.getResults}/>;
  }

  render() {
    return (
      <React.Fragment>
        <Navbar 
          getResults={this.getResults}
          value={this.state.value}
          handleChange={this.handleChange}/>
        {this.renderResults()}
        {this.renderHistory()}
      </React.Fragment>
    );
  }
}

export default App;
