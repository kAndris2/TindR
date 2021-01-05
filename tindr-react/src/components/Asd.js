import React, { Component } from 'react'
import SideBar from './SideBar'
import './css/side.css'
import Deck from './Deck';
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
        <SideBar removeCookie={this.props.removeCookie} user={this.props.user} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="recommendations">
          <Deck userID={this.props.user.id}></Deck>
        </div>
      </>
      );
  }
}
