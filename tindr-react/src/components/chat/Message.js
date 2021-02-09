import React from 'react';
import moment from 'moment';
export class Message extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            formattedDate:''
        }
    }

    handleDate = (date) => {
        this.setState({formattedDate:new Date(date)})
    }

    render() {
        return (
            <>
            {this.props.senderName !== this.props.username &&
                <div className="incoming_msg">
                    <div className="incoming_msg_img"> 
                        <img className="rounded-circle" src={this.props.senderImg} alt="dood"/> 
                    </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                        <p>{this.props.text}</p>
                        <span className="time_date"> {moment(this.props.id).fromNow()}</span></div>
                    </div>
                </div>
            }
            {this.props.senderName === this.props.username &&
                <div className="outgoing_msg">
                    <div className="sent_msg">
                        <p>{this.props.text}</p>
                        <span className="time_date"> {moment(this.props.id).fromNow()}</span> 
                    </div>
                </div>
            }
            </>
        )
    }
}