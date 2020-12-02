import React, {Component} from 'react';
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
