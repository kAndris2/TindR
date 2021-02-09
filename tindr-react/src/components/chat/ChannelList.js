import React from 'react';
import { Channel } from './Channel';

export class ChannelList extends React.Component {

    handleClick = (chanelID, userID) => {
        this.props.onSelectChannel(chanelID, userID);
    }

    render() {

        let list = <div className="no-content-message">There is no channels to show</div>;
        if (this.props.channels && this.props.channels.map) {
            list = this.props.channels.map(c => 
                <Channel 
                    key={c.id} 
                    id={c.id} 
                    userData={c.userData}
                    participants={c.participants} 
                    lastMessage={c.lastMessage} 
                    onClick={this.handleClick} 
                />);
        }
        return (
            <div className='channel-list'>
                {list}
            </div>);
    }

}