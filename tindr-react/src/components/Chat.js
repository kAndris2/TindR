import React, { Component } from 'react'
import "./css/chat.css";
import axios from 'axios';

import Loading from './Loading'

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }

        this.getMessages = this.getMessages.bind(this);
    }

    getMessages() {
        axios.get(`${process.env.REACT_APP_IP}/api/get_messages/${this.props.userID}/6`)
        .then(response => {
            this.setState({
                messages : response.data
            });
        })
    }

    componentDidMount() {
        this.getMessages();
    }

    render() {
        const { messages } = this.state;

        return (
            <>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                <div class="container bootstrap snippets bootdey">
                    <div class="row">
                        <div class="col-md-4 bg-white ">
                            <div class=" row border-bottom padding-sm" style={{height: "40px"}}>
                                Member
                            </div>
                            
                            <ul class="friend-list">
                                <li class="active bounceInDown">
                                    <a href="#" class="clearfix">
                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle" />
                                        <div class="friend-name">	
                                            <strong>John Doe</strong>
                                        </div>
                                        <div class="last-message text-muted">Hello, Are you there?</div>
                                        <small class="time text-muted">Just now</small>
                                        <small class="chat-alert label label-danger">1</small>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="clearfix">
                                        <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" class="img-circle" />
                                        <div class="friend-name">	
                                            <strong>Jane Doe</strong>
                                        </div>
                                        <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                                        <small class="time text-muted">5 mins ago</small>
                                    <small class="chat-alert text-muted"><i class="fa fa-check"></i></small>
                                    </a>
                                </li>      
                            </ul>
                        </div>
                        
                        <div class="col-md-8 bg-white ">
                            <div class="chat-message">
                                <ul class="chat">
                                    <li class="left clearfix">
                                        <span class="chat-img pull-left">
                                            <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar" />
                                        </span>
                                        <div class="chat-body clearfix">
                                            <div class="header">
                                                <strong class="primary-font">John Doe</strong>
                                                <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                            </div>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            </p>
                                        </div>
                                    </li>
                                    <li class="right clearfix">
                                        <span class="chat-img pull-right">
                                            <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar" />
                                        </span>
                                        <div class="chat-body clearfix">
                                            <div class="header">
                                                <strong class="primary-font">Sarah</strong>
                                                <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                                            </div>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. 
                                            </p>
                                        </div>
                                    </li>       
                                </ul>
                            </div>
                            <div class="chat-box bg-white">
                                <div class="input-group">
                                    <input class="form-control border no-shadow no-rounded" placeholder="Type your message here" />
                                    <span class="input-group-btn">
                                        <button class="btn btn-success no-rounded" type="button">Send</button>
                                    </span>
                                </div>
                            </div>            
                        </div>        
                    </div>
                </div>
            </>
        );      
    }
}