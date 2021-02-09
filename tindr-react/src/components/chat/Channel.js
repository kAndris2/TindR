import React from 'react';

export class Channel extends React.Component {

    click = () => {
        this.props.onClick(this.props.id, this.props.userData.id);
    }

    render() {
        return (
            <div className='channel-item' onClick={this.click}>
                <div>{this.props.userData.name}</div>
                <div>{this.props.lastMessage.content}</div>
                <span>{this.props.participants}</span>
            </div>
        )
    }
}