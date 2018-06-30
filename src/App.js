import React, { Component } from 'react';
import { connect } from "react-redux";
import { setLockPattern } from "./actions/setPatternAction";
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      code : "",
      showNextPage: false,
      errorMsg: ""
    }
  }

  setCodetoProceed = (e) => {
    this.setState({
      "code" : e.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setLockPattern(this.state.code, () => {
      if(this.props.setPatternStatus === true){  
        console.log("pattern created");
        this.setState({
          showNextPage: true
        })
      }
      else{
        this.setState({errorMsg: "Invalid Pattern"})
      }
    });
  }

  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>*/}
        <p className="App-intro">
         Enter your code: </p>
        <form name = "code-form" 
          onSubmit={(e) => {this.handleSubmit(e)}}>
        <input  
          type="text" 
          name="code" 
          autoFocus = {true}
          value = {this.state.code}
          onChange={(e) => {
            this.setCodetoProceed(e)
          }}
        />
        <div>
          <input type="submit" name="submit" value="SET MY CODE" />
        </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { pattern = {} } = state;
  const { success = false } = pattern;
  return{
    setPatternStatus: success
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLockPattern: (formData, callback) => {
      dispatch(setLockPattern(formData, callback));
    }
  };
}

export default App = connect(mapStateToProps, mapDispatchToProps)(App);
