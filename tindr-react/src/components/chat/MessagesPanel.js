import React from 'react';
import { Message } from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export class MessagesPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input_value: '',
            messages: []
        }
        
    }
    
    saveTimer = undefined;

    send = () => {
        clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(this.saveMessage, 1000*10);
        if (this.state.input_value && this.state.input_value != '') {
            this.props.onSendMessage(this.props.channel.id, this.state.input_value);

            const message = {
                "content" : this.state.input_value,
                "date" : Date.now(),
                "seen" : false,

            }

            const temp = this.state.messages;
            temp.push(message);

            this.setState({ 
                input_value: '',
                messages : temp
            });
        }
    }

    saveMessage = () => {
        const { messages } = this.state;
        
        axios.post(`${process.env.REACT_APP_IP}/api/send_message`, {
            "messages" : messages,
            "from_id" : this.props.userID,
            "to_id" : this.props.partnerID
        })
        .then(() => {
            this.setState({
                messages : []
            });
        })
    }

    handleInput = e => {
        this.setState({ input_value: e.target.value });
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
          this.send();
        }
      }
    

    render() {

        let list = <div className="no-content-message">There are no messages to show</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} senderImg={this.props.channel.img} text={m.text} username={this.props.username} />);
        }
        return (
            <div className="mesgs">
                <div className="msg_history">
                    {list}
                </div>
                {this.props.channel === null &&
                    <div className="type_msg">
                        <div className="input_msg_write">
                           Select a user first!
                        </div>
                    </div>
                }
                {this.props.channel !== null &&
                    <div className="type_msg">
                        <div className="input_msg_write">
                            <input type="text" onChange={this.handleInput} value={this.state.input_value} onKeyDown={this.handleKeyDown} className="write_msg" placeholder="Type a message" />
                            <button className="msg_send_btn" type="button" onClick={this.send}><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    </div>
                }
                
            </div>
            // <div className='messages-panel'>
            //     <div className="meesages-list">{list}</div>
            //     {this.props.channel &&
            //         <div className="messages-input">
            //             <input type="text" onChange={this.handleInput} value={this.state.input_value} />
            //             <button onClick={this.send}>Send</button>
            //         </div>
            //     }
            // </div>
        );
    }
}