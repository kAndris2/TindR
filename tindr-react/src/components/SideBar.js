import React, {Component} from 'react';
import { Helmet } from 'react-helmet';

class SideBar extends Component {
    constructor() {
      super();
    }

    render() {
        return (
            <>
                <h1>{this.props.user.name}</h1>
            </>
        );
    }
}

export default SideBar;