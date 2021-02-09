import React from 'react';
import { ChannelList } from './ChannelList';
import './chat.scss';
import './Chat2.css';
import { MessagesPanel } from './MessagesPanel';
import socketClient from "socket.io-client";
import axios from 'axios';
const SERVER = process.env.REACT_APP_CHAT_SERVER_IP;


export class Chat extends React.Component {
    state = {
        channels: null,
        socket: null,
        channel: null,
        currentUserID: undefined
    }
    socket;
    componentDidMount() {
        this.load();
        //this.loadChannels();
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('channel', channel => {
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {
            let channels = this.state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    load(){
        axios.get(`${process.env.REACT_APP_CHAT_SERVER_IP}/getChannels/${this.props.userID}`)
        .then(res => {
            let temp = [];
            res.data.channels.map(r => {
                temp.push(r);
            })
            this.setState({channels : temp})
        })
    }

    handleChannelSelect = (chanelID, userID) => {
        let channel = this.state.channels.find(c => {
            return c.id === chanelID;
        });
        this.setState({ 
            channel,
            currentUserID : userID
         });
        this.socket.emit('channel-join', chanelID, ack => {
        });
    }

    handleSendMessage = (channel_id, text) => {
        this.socket.emit('send-message', { channel_id, text, senderName: this.props.user, id: Date.now() });
    }

    render() {
        console.log(this.state.channels);

        return (
            <div className='container'>
                <h3 class=" text-center">Messaging</h3>
                <div class="messaging">
                    <div class="inbox_msg">
                        <div class="inbox_people">
                            <div class="headind_srch">
                                <div class="recent_heading">
                                <h4>Recent</h4>
                                </div>
                            </div>
                            <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                        </div>  
                        <MessagesPanel userID={this.props.userID} partnerID={this.state.currentUserID} username={this.props.user} onSendMessage={this.handleSendMessage} channel={this.state.channel} />
                    </div>
                </div>
            </div>
        );
    }
}
