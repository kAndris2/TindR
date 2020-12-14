import React, { Component } from 'react'
import SideBar from './SideBar'
import './css/side.css'
import Helmet from 'react-helmet';
import ReactCodeInput from 'react-code-input';
export default class Asd extends Component {
  constructor(props){
    super(props);

  }

  
  // -- Request a PIN --
  //apikey1 = 6259e30396ee22afa1b50ed0d8468bd7be1204de
  //appkey1 = a1yqe5e4o6a6eborahy7
  // curl -X "POST" "https://api.ringcaptcha.com/APP_KEY/code/sms" \
  // -d "api_key=API_KEY" \
  // -d "phone=TO_NUMBER"

  // -- Verify Phone Number --

  // curl -X "POST" "https://api.ringcaptcha.com/APP_KEY/verify" \
  // -d "api_key=API_KEY" \
  // -d "phone=TO_NUMBER" \
  // -d "code=PIN"

  render() {
    
      return (
        <>
       
        <div className="App" id="outer-container">
          <SideBar removeCookie={this.props.removeCookie} user={this.props.user} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="page-wrap">
          <h1>Huzogass</h1>
          <h2>Jobbrabalra stb</h2>
        </div>
      </div>
      </>
      );
  }
}
