import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Recommendations extends Component {
    constructor() {
      super();

      this.state = {
          recommendations: [],
          isLoading: true
      }

      this.getRecommendations = this.getRecommendations.bind(this);
    }

    async componentDidMount() {
        await this.getRecommendations();
    }

    async getRecommendations() {
        await axios.get("http://172.31.1.57:8000/api/recommendations/" + this.props.userID)
        .then(response => {
            console.log(response);
            this.setState({
                isLoading : false,
                recommendations : response.data
            });
        })
    }

    render() {
        const { isLoading, recommendations } = this.state;

        if (!isLoading) {
            console.log(recommendations)
            return (
                <>
                    {recommendations.map((asd) => 
                        <p>{asd.name}</p>
                    )}
                </>
            );
        }
        else
            return (
                <h1>Loading...</h1>
            );
    }
}

export default Recommendations;