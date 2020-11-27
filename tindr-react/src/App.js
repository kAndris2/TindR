import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import WelcomePage from "./components/WelcomePage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      user: undefined
    }
  }

  render() {
    return (
      <>
        <Router>
          <Switch>

            <Route exact path="/">
              <WelcomePage></WelcomePage>
            </Route>

          </Switch>
        </Router>
      </>
    );
  }
}

export default App;