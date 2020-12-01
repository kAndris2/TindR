import React, {Component} from 'react';
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
