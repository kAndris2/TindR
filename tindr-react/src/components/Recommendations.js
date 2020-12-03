import React, {Component} from 'react';
import { Helmet } from 'react-helmet';

class Recommendations extends Component {
    constructor() {
      super();
    }

    render() {
        return (
            <h1>{this.props.userID}</h1>
        );
    }
}

export default Recommendations;