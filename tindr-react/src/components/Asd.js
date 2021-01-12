import React, { Component } from 'react'
import SideBar from './SideBar'
import './css/side.css'
import Deck from './Deck';
import axios from 'axios';

export default class Asd extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchData: [],
      isLoading: true
    }

    this.getSearchData = this.getSearchData.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.forceRender = this.forceRender.bind(this);
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

  getSearchData() {
    axios.get(`http://${process.env.REACT_APP_IP}:8000/api/profile_data/${this.props.user.id}`)
    .then(this.handleSearchData)
  }  

  handleSearchData(response) {
    console.log('yep')
    this.setState({
      searchData: response.data,
      isLoading: false
    });
  }

  componentDidMount() {
    this.getSearchData();
  }

  forceRender() {
    this.setState({isLoading : true});
    this.componentDidMount();
  }

  render() {
    const { isLoading, searchData } = this.state;

    if(!isLoading) {
      return (
        <>
          <SideBar 
            removeCookie={this.props.removeCookie} 
            user={this.props.user} 
            pageWrapId={'page-wrap'} 
            outerContainerId={'outer-container'} 
            searchData={searchData}
            forceRender={this.forceRender}
          />

          <Deck 
            userID={this.props.user.id}
          />
        </>
      );
    }
    else {
      return (
        <h1>Loading...</h1>
      );
    }
  }
}
