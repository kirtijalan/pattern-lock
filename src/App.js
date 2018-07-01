import React, { Component } from 'react';
import { connect } from "react-redux";
import { setLockPattern } from "./actions/setPatternAction";
import { validatePattern } from "./actions/validatePatternAction";
import './App.css';
import './_style/patternlock.css';
import './_script/patternlock.js';
import { readCookie } from './utils/cookie';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showNextPage: false,
      errorMsg: "",
      auth: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateCode = this.validateCode.bind(this);    
  }

  handleSubmit(event){
    event.preventDefault();
    let pwdSet = readCookie("pwd");
    alert("You entered " + pwdSet);
    this.props.setLockPattern(pwdSet, () => {
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
    let confirmPwd = readCookie("confPwd");
    alert("Confirmation Password" + confirmPwd);
    this.props.validatePattern(confirmPwd, () => {
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
          </header>
          <p className="App-intro">
          Enter previously set code to proceed: </p>
          <form name = "confirm-code-form" 
            onSubmit={this.validateCode}>
            <div>
              <input type="password" id="password2" name="conf-password" className="patternlock" />
            </div>
            {this.state.errorMsg? <p> {this.state.errorMsg} </p> : null}
            <div>
              <input type="submit" name="btnSubmit" value="UNLOCK" className="sbmt-btn" />
            </div>
          </form>
        </div>
      );
    }else if(this.state.auth){
      return(
        <div className="App"> 
          <header> 
            <h1> Android Pattern Locker </h1>
          </header>
          Welcome, Authenticated User!
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <header> 
            <h1> Android Pattern Locker </h1>
          </header>
          <p className="App-intro">
          Enter your code: </p>
          <form name = "code-form" 
            onSubmit={this.handleSubmit}>
            <div>
              <input type="password" id="password" name="password" className="patternlock" />
            </div>
            {this.state.errorMsg? <p> {this.state.errorMsg} </p> : null}
            <div>
              <input type="submit" name="btnSubmit" value="SET MY CODE" className="sbmt-btn"/>
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
