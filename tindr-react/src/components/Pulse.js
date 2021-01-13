import React, { Component } from 'react'
import "./css/pulse.css";
import axios from 'axios';

import Loading from './Loading'

export default class Pulse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            userImg: ''
        }

        this.getProfilePicture = this.getProfilePicture.bind(this);
    }

    async getProfilePicture() {
        await axios.get(`https://${process.env.REACT_APP_IP}:8443/api/pictures/${this.props.userID}`)
        .then(response => {
            Promise.all(response.data.map(p => {
                this.setState({
                    isLoading : false,
                    userImg : p.route
                });
              }))
        });
    }

    async componentDidMount() {
        await this.getProfilePicture();
    }

    render() {
        const { isLoading, userImg } = this.state;

        if(!isLoading) {
            return(
                <>
                    <div class="load">
                        <img src={userImg} style={{borderRadius:"50%", width:"100%"}}></img>
                    </div>
                    <p>We are unable to find any potential matches right now. Try changing your preferences to see who is nearby.</p>
                </>
            );
        }
        else {
            return(
                <Loading />
            );
        }
    }
}