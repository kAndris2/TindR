import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';

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
        <section style={{ height:"100vh",
                          background: 'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url("https://tinder.com/static/build/m/b07fe760ab4714aa3e932a15657494e5.webp")',
                          backgroundRepeat:"no-repeat"}}
        >
          <nav className="navbar navbar-light bg-transparent justify-content-between">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                  <span className="sr-only">TindR</span>
                  <img src="logo.svg" width="55%"></img>
              </a>
            </div>   

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="/login" 
                  className="btn btn-primary">
                  Log in
              </a>
              <a href="/registration" 
                  className="btn btn-success">
                  Sign up
              </a>
            </div>
          </nav>
        </section>
      </>
    );
  }
}

export default App;