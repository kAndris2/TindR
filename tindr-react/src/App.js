import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

import WelcomePage from "./components/WelcomePage";
import SideBar from "./components/SideBar";
import Recommendations from "./components/Recommendations";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: undefined,
      isLoggedIn: false,
      isLoading: false
    }

    this.setCookie = this.setCookie.bind(this);
    this.setUser = this.setUser.bind(this);
    this.checkLoginStatus = this. checkLoginStatus.bind(this);
  }

  setCookie(id) {
    Cookies.set('userid', id);
  }

  setUser(user) {
    this.setCookie(user.id);
    this.setState({
      user : user,
      isLoggedIn : true
    });
  }

  async checkLoginStatus() {
    const id = Cookies.get('userid');
    if (id !== undefined) {
      this.setState({isLoading : true})
      await axios.get("http://172.31.1.57:8000/api/user/" + id)
      .then(response => {
        this.setState({
          user : response.data,
          isLoggedIn : true,
          isLoading : false
        })
      })
    }
  }

  async componentDidMount() {
    await this.checkLoginStatus();
  }

  render() {
    const {user, isLoggedIn, isLoading} = this.state;

    if (!isLoading) {
      return (
        <>
          <Router>
            <Switch>

              <Route exact path="/">
                {isLoggedIn === false &&
                  <WelcomePage
                    setUser={this.setUser}
                  ></WelcomePage>
                }
                {isLoggedIn === true &&
                  <SideBar
                    user={user}
                  ></SideBar>
                }
              </Route>

              <Route exact path="/recom">
                {isLoggedIn === true &&
                  <Recommendations
                    userID={user.id}
                  ></Recommendations>
                }
              </Route>

            </Switch>
          </Router>
        </>
      );
    }
    else
      return (
        <h1>Loading...</h1>
      );
  }
}

export default App;
