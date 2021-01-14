import React, { Component } from 'react'
import SideBar from './SideBar'
import Loading from './Loading'
import './css/side.css'
import Deck from './Deck';
import Pulse from "./Pulse";
import axios from 'axios';

export default class Asd extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchData: [],
      menuIsLoading: true,
      deckIsLoading: true,
      deck: []
    }

    this.getSearchData = this.getSearchData.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.forceRender = this.forceRender.bind(this);
    this.getDeck = this.getDeck.bind(this);
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

  async getSearchData() {
    await axios.get(`${process.env.REACT_APP_IP}/api/profile_data/${this.props.user.id}`)
    .then(this.handleSearchData)
  }  

  handleSearchData(response) {
    this.setState({
      searchData: response.data,
      menuIsLoading: false
    });
  }

  async getDeck() {
    await fetch(`${process.env.REACT_APP_IP}/api/profiles/${this.props.user.id}`,
    {mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          deck : response,
          deckIsLoading: false
        });
      })
  }

  async componentDidMount() {
    await this.getSearchData();
    await this.getDeck();
  }

  forceRender() {
    this.setState({menuIsLoading : true});
    this.componentDidMount();
  }

  render() {
    const { menuIsLoading, deckIsLoading, searchData, deck } = this.state;

    if(!menuIsLoading) {
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

          {(deckIsLoading === false && deck.length !== 0) &&
            <Deck 
              userID={this.props.user.id}
              data={deck}
            />
          }

          {(deckIsLoading === false && deck.length === 0) &&
            <Pulse 
              userID={this.props.user.id}
            />
          }

          {deckIsLoading === true &&
            <div className="container" style={{height: '100vh'}}>
              <div className="flex-container">
                <div className="unit">
                  <div className="heart">
                    <div className="heart-piece-0"></div>
                    <div className="heart-piece-1"></div>
                    <div className="heart-piece-2"></div>
                    <div className="heart-piece-3"></div>
                    <div className="heart-piece-4"></div>
                    <div className="heart-piece-5"></div>
                    <div className="heart-piece-6"></div>
                    <div className="heart-piece-7"></div>
                    <div className="heart-piece-8"></div>
                  </div>
                  <p>Please wait...</p>
                </div>
              </div>
            </div>
          }
        </>
      );
    }
    else {
      return (
        <Loading />
      );
    }
  }
}
