import React, { Component } from 'react'
import DeckLoading from './DeckLoading'
import './css/side.css'
import Deck from './Deck';
import Pulse from "./Pulse";

export default class Asd extends Component {
  constructor(props){
    super(props);

    this.state = {
      deckIsLoading: true,
      deck: []
    }

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
    await this.getDeck();
  }

  render() {
    const { deckIsLoading, deck } = this.state;

    return (
      <>
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
          <>
            <video
              autoPlay={true} 
              loop={true}
              muted
              style={{
                position: "absolute",
                width: "100%",
                left: "50%",
                top: "50%",
                height: "120%",
                objectFit: "cover",
                transform: "translate(-50%, -50%)",
                zIndex: "-1",
                filter: "blur(10px)"
              }}
            >
              <source src="https://mradmin.hu/vid/Tindr.mp4" />
            </video>
            <DeckLoading />
          </>
        }
      </>
    );
  }
}
