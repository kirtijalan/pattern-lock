import React, { Component } from 'react';
import { connect } from "react-redux";
import { setLockPattern } from "./actions/setPatternAction";
import { validatePattern } from "./actions/validatePatternAction";
import './App.css';
import { readCookie } from './utils/cookie';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      code : "",
      confirmCode: "",
      showNextPage: false,
      errorMsg: "",
      auth: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateCode = this.validateCode.bind(this);    
  }

  setCodetoProceed = (e) => {
    this.setState({
      "code" : e.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.setLockPattern(this.state.code, () => {
      let codeValueSet = readCookie("code");
      if(this.props.codeSet === true || codeValueSet ){  
        this.setState({
          showNextPage: true,
          errorMsg: ""
        })
      }
      else{
        this.setState({errorMsg: "Invalid Pattern"})
      }
    });
  }
  /*function to that dispatches the action 
  to validate the entered code*/
  validateCode(event){
    event.preventDefault();
    this.props.validatePattern(this.state.confirmCode, () => {
      if(this.props.success === true || readCookie('A') ){  
        console.log("pattern validated");
        this.setState({
          showNextPage: false,
          auth: true,
          errorMsg: ""
        })
      }
      else{
        this.setState({errorMsg: "Incorrect Pattern"})
      }
    });
  }

  render() {
    if(this.state.showNextPage){
      return (
        <div className="App">
          <header> 
            <h1> Android Pattern Locker </h1>
            <img src="unlocking.gif" alt="unlocking"/>
          </header>
          <p className="App-intro">
          Enter code to proceed: </p>
          <form name = "code-form" 
            onSubmit={this.validateCode}>
          <input  
            type="text" 
            name="code" 
            autoFocus = {true}
            value = {this.state.confirmCode}
            onChange={(e) => {
              this.setState({
                confirmCode: e.target.value
              })
            }}
          />
          {this.state.errorMsg? <p> {this.state.errorMsg} </p> : null}
          <div>
            <input type="submit" name="submit" value="UNLOCK" />
          </div>
          </form>
        </div>
      );
    }else if(this.state.auth){
      return(
        <div className="App"> 
          <header> Android Pattern Locker  </header>
          Authenticated!
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <header> 
            <h1> Android Pattern Locker </h1>
            {/* <img src="./assets/unlocking.gif" alt="unlocking"/> */}
          </header>
          <p className="App-intro">
          Enter your code: </p>
          <form name = "code-form" 
            onSubmit={this.handleSubmit}>
          <input  
            type="text" 
            name="code" 
            autoFocus = {true}
            value = {this.state.code}
            onChange={(e) => {
              this.setCodetoProceed(e)
            }}
          />
          {this.state.errorMsg? <p> {this.state.errorMsg} </p> : null}
          <div>
            <input type="submit" name="submit" value="SET MY CODE" />
          </div>
          </form>
        </div>
      );
    }
  }
}


const mapStateToProps = (state, ownProps) => {
  const { pattern = {} } = state;
  const { codeSet = false, success = false } = pattern;
  return{
    codeSet,
    success
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLockPattern: (formData, callback) => {
      dispatch(setLockPattern(formData, callback));
    },
    validatePattern: (formData, callback) => {
      dispatch(validatePattern(formData, callback));
    }
  };
}

export default App = connect(mapStateToProps, mapDispatchToProps)(App);
