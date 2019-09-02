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
    this.deleteHistory = this.deleteHistory.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getHistory = this.getHistory.bind(this);
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

  async deleteHistory() {
    await axios.get('/api/history', {
      params: { q: 'delete', format: 'json' }
    });
    await this.setState({ persistance: [], results: [] });
  }

  renderResults() {
    if (this.state.results === 0)
      return <Results value={[]} results={[]} />;
    return <Results value={this.state.value} results={this.state.results} />;
  }

  renderHistory() {
    if (this.state.persistance === 0)
      return <Sidebar persistance={[]}/>;
    return (
    <Sidebar
      persistance={this.state.persistance} 
      fillText={this.fillText} 
      getResults={this.getResults} 
      getHistory={this.getHistory} 
      deleteHistory={this.deleteHistory} 
      reload={this.renderHistory}
    />
    );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar 
          fillText={this.fillText}
          getResults={this.getResults}
          value={this.state.value}
          handleChange={this.handleChange}
        />
        <div className='container-fluid'>
          <div className='row'>
            {this.renderResults()}
            {this.renderHistory()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
