import React, { Component } from 'react';
import Navbar from './components/navbar.jsx';
// import Sidebar from './components/Sidebar.jsx';

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    );
  }
}

export default App;

/*
<React.Fragment>
  <Navbar />
  <Sidebar />
  <Results />
</React.Fragment>
*/
