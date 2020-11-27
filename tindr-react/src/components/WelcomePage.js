import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";

class WelcomePage extends Component {
    constructor() {
      super();

      this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        'Enter your username',
        'Enter your e-mail address',
        'Enter your phone number',
        'Enter your password',
        'Enter your confirm password'
      ]).then((result) => {
        if (result.value) {
          const answers = JSON.stringify(result.value)
          Swal.fire({
            title: 'All done!',
            html: `
              Your answers:
              <pre><code>${answers}</code></pre>
            `,
            confirmButtonText: 'Lovely!'
          })
        }
      })
    }
  
    render() {
      return (
        <>
          <Helmet>
              <title>Tinder | Dating, Make Friends & Meet New People</title>
          </Helmet>
  
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
                <a className="btn btn-success rounded-pill"
                    onClick={this.handleLogin}
                >
                    LOG IN
                </a>
              </div>
            </nav>
  
            <div className="container d-flex h-100 align-items-center">
              <div className="mx-auto text-center">
                <h1 className="mx-auto my-0" style={{fontSize:"800%"}}>
                  Swipe Right®
                </h1>
                <a className="btn btn-danger js-scroll-trigger rounded-pill" href="/registration">
                  CREATE ACCOUNT 
                </a>
              </div>
            </div>
  
          </section>
        </>
      );
    }
  }
  
  export default WelcomePage;