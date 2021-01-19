import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

import WelcomePage from "./components/WelcomePage";
import Asd from './components/Asd'
import Recommendations from "./components/Recommendations";

import Loading from './components/Loading'
import Pulse from './components/Pulse'

import Deck from './components/Deck';
import Test from './components/Test';


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
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.saveCoordinates = this.saveCoordinates.bind(this);
  }

  setCookie(id) {
    Cookies.set('userid', id);
  }
  removeCookie(){
    Cookies.remove('userid');
  }
  setUser(user) {
    this.setCookie(user.id);
    this.setState({
      user : user,
      isLoggedIn : true,
      isLoading: false
    });
    this.saveCoordinates(user.id);
  }

  saveCoordinates(id) {
    navigator.geolocation.getCurrentPosition(response => {
      axios.post(`${process.env.REACT_APP_IP}/api/save_position/${id}`,{
        latitude: response.coords.latitude,
        longitude: response.coords.longitude
    })
    .then(() => {
      this.setState({
        isLoading: false
      });
    });
    })
  }

  async checkLoginStatus() {
    const id = Cookies.get('userid');
    if (id !== undefined) {
      this.setState({isLoading : true})
      await axios.get(process.env.REACT_APP_IP+"/api/user/" + id)
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
                  <Asd
                    user={user}
                    removeCookie={this.removeCookie}
                  ></Asd>
                }
              </Route>

              <Route exact path="/recom">
                {isLoggedIn === true &&
                  <Recommendations
                    userID={user.id}
                  ></Recommendations>
                }
              </Route>

              <Route exact path="/recom2">
                {isLoggedIn === true &&
                <div id="recommendations">
                  <Deck
                    userID={user.id}
                  ></Deck>
                </div>
                }
              </Route>

              <Route exact path="/test">
                <Test></Test>
              </Route>

              <Route exact path='/pulse'>
                <Pulse />
              </Route>

            </Switch>
          </Router>
        </>
      );
    }
    else
      return (
        <Loading />
      );
  }
}

export default App;
