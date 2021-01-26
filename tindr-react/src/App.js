import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

import WelcomePage from "./components/WelcomePage";
import Asd from './components/Asd'
import CreateTickets from './components/CreateTickets'
import ShowTickets from './components/ShowTickets'

import Loading from './components/Loading'
import SideBar from './components/SideBar'

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
    this.forceRender = this.forceRender.bind(this);
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

  async forceRender() {
    this.setState({
      isLoading : true
    });
    await this.componentDidMount();
  }

  async componentDidMount() {
    await this.checkLoginStatus();
  }

  render() {
    const {user, isLoggedIn, isLoading, doForce} = this.state;

    if (!isLoading) {
      return (
        <>
          {isLoggedIn === true &&
            <>
              <SideBar 
                removeCookie={this.removeCookie} 
                user={user} 
                pageWrapId={'page-wrap'} 
                outerContainerId={'outer-container'} 
                forceRender={this.forceRender}
              />

              <Router>
                <Switch>

                  <Route exact path="/tickets/:id">
                    <CreateTickets 
                      userID={user.id}
                    />
                  </Route>

                  <Route exact path="/">
                    <Asd
                      user={user}
                      removeCookie={this.removeCookie}
                    />
                  </Route>

                  <Route exact path="/tickets">
                    <ShowTickets 
                      userID={user.id}
                    />
                  </Route>

                </Switch>
              </Router>
            </>
          }
          {isLoggedIn === false &&
            <WelcomePage
              setUser={this.setUser}
            ></WelcomePage>
          }
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
