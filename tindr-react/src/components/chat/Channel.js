import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
export class Channel extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active:false
        }
    }
    click = () => {
        this.props.onClick(this.props.id);
        this.setState({active:true});
    }

    render() {
        return (
            <>
                <div class="inbox_chat">
                    <div class={this.state.active ? 'chat_list active_chat' : 'chat_list'}>
                    <div class="chat_people" onClick={this.click}>
                        <div class="chat_img"> <img class="rounded-circle" src={this.props.image} alt="ppl"/> </div>
                        <div class="chat_ib">
                        <h5>{this.props.name} <span class="chat_date">date</span></h5>
                        <p>{this.props.lastMessage.content}</p>
                        {this.props.participants === 2 &&
                        <p>Online <FontAwesomeIcon size="xs" color="green" icon={faCircle} /></p>
                        }
                        {this.props.participants !== 2 &&
                        <p>Last seen: date</p>
                        }
                        </div>
                    </div>
                    </div>
                </div>
            </>

            /* <div className='card' onClick={this.click}>
                <div>{this.props.name}</div>
                <div>{this.props.lastMessage.content}</div>
                <span>{this.props.participants}</span>
            </div> */
        )
    }
}