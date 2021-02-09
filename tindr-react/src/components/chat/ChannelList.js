import React from 'react';
import { Channel } from './Channel';

export class ChannelList extends React.Component {

    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    render() {

        let list = <div className="no-content-message">There is no user to show... U are not so attractive, are you?</div>;
        if (this.props.channels && this.props.channels.map) {
            list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.userName} participants={c.participants} lastMessage={c.lastMessage[0]} image={c.img} onClick={this.handleClick} />);
        }
        return (
            <>
                {list}
            </>
        )
            
    }

}