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
import NewSide from './components/NewSide';

import CreateTickets from './components/CreateTickets'
import ShowTickets from './components/ShowTickets'
import InvalidPage from "./components/InvalidPage"
import UserList from "./components/UserList"

import SideBar from './components/SideBar'
import { Chat } from './components/chat/Chat';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      user: undefined,
      isLoggedIn: false,
      isLoading: false,
      role: undefined
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
          isLoggedIn : true//,
          //isLoading : false
        });
      })
    }
  }

  async forceRender() {
    this.setState({
      isLoading : true
    });
    await this.componentDidMount();
  }

  async checkUserRole() {
    if(this.state.user !== undefined) {
      await axios.get(`${process.env.REACT_APP_IP}/api/get_role/${this.state.user.id}`)
      .then(response => {
          this.setState({
              role : response.data.role,
              isLoading : false
          });
      })
    }
  }

  async componentDidMount() {
    await this.checkLoginStatus();
    await this.checkUserRole();
  }

  render() {
    const {user, isLoggedIn, isLoading, role} = this.state;

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

              <Route exact path='/temp'>
                <NewSide></NewSide>
              </Route>


            </Switch>
          </Router>
          {isLoggedIn === true ?
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
                  <Route exact path="/chat">
                    <Chat user={user.name}></Chat>
                  </Route>

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

                  {role === true ?
                    <>
                      <Route exact path="/tickets">
                        <ShowTickets 
                          userID={user.id}
                        />
                      </Route>

                      <Route exact path="/userlist">
                        <UserList />
                      </Route>
                    </>
                  :
                    <InvalidPage />
                  }

                </Switch>
              </Router>
            </>
          :
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
