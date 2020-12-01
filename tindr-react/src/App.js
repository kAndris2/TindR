import React, {Component} from 'react';
<<<<<<< HEAD
import './App.css';
import Login from './components/auth/Login';
import Test from './components/Test';
import { BrowserRouter as Router, Switch,
  Route
} from "react-router-dom";
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,

      loggedInStatus: "NOT_LOGGED_IN",
      user: undefined,

    }

    this.handleLogin = this.handleLogin.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkLoginStatus(){
    //FUCKIN GARBAGE, DON'T DO THIS EVER. SHOULD BE REFACTORED
    console.log(document.cookie);
    if (document.cookie){
      let uname = document.cookie.split("=")[1];
      let all = [];
      let id = uname;

      await axios.get("http://172.31.1.57:3000/api/user/"+id)
          .then(resp => {
            this.setState({
              loggedInStatus: "LOGGED_IN",
              user: resp.data,
              isLoading:false
            })
          })
    }
    else{
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      })
    }
  }


  updateUser(newUser) {
    this.setState({user: newUser});
  }

  logout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  async componentDidMount() {
    await this.checkLoginStatus();
  }

  render() {
    const {isLoading, loggedInStatus} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Test></Test>
          </Route>
            
          <Route
            exact
            path="/login"
            render={props => (
                <Login
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.loggedInStatus}
                    getCurrentTitle={this.getCurrentTitle}
                />
            )}
            >
          </Route>
        </Switch>
      </Router>
      
    )
  }
}
=======
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import WelcomePage from "./components/WelcomePage";
import SideBar from "./components/SideBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: undefined
    }

    this.setUser = this.setUser.bind(this);
    this.isLoggedIn = this. isLoggedIn.bind(this);
  }

  setUser(user) {
    this.setState({user : user});
  }

  isLoggedIn() {
    return this.state.user !== undefined;
  }

  render() {
    return (
      <>
        <Router>
          <Switch>

            <Route exact path="/">
              {this.isLoggedIn() === false &&
                <WelcomePage
                  setUser={this.setUser}
                ></WelcomePage>
              }
              {this.isLoggedIn() === true &&
                <SideBar
                  user={this.state.user}
                ></SideBar>
              }
            </Route>

          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
>>>>>>> c800b0ccae1783f80447105b4a5a145a75a4a23c
