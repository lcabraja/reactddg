import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      radioState: "get"
    }

    this.handleRadio = this.handleRadio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRadio(event) {
    this.setState({
      radioState: event.target.value
    });
  };

  handleSubmit(event) {
    this.props.getResults(this.state.radioState);
    this.props.fillText('');
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
          <div 
            className="btn-group btn-group-toggle m-2" 
            data-toggle="buttons"
          > 
            <label className={"btn btn-secondary " + ((this.state.radioState === "get") && "active")}>
              <input 
                type="radio" 
                name="options" 
                value="get" 
                autoComplete="off" 
                checked={this.state.radioState === "get"}
                //onClick={this.handleClick}
                onChange={this.handleRadio}  
              /> 
                GET
            </label>
              <label className={"btn btn-secondary " + ((this.state.radioState === "post") && "active")}>
                <input 
                  type="radio" 
                  name="options" 
                  value="post" 
                  autoComplete="off" 
                  checked={this.state.radioState === "post"}
                  //onClick={this.handleClick}
                  onChange={this.handleRadio} 
                /> 
              POST
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
 
export default Navbar;