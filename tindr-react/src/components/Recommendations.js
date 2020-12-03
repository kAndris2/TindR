import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Recommendations extends Component {
    constructor() {
      super();

      this.state = {
          recommendations: [],
          isLoading: true,
          current: {
              index: undefined,
              user: undefined
          }
      }

      this.getRecommendations = this.getRecommendations.bind(this);
      this.getNext = this.getNext.bind(this);
    }

    async componentDidMount() {
        await this.getRecommendations();
    }

    async getRecommendations() {
        await axios.get("http://localhost:8000/api/recommendations/" + this.props.userID)
        .then(response => {
            let updCurrent = {
                index: 0,
                user: response.data[0]
            }

            this.setState({
                isLoading : false,
                recommendations : response.data,
                current : updCurrent
            });
        })
    }

    getNext() {
        const { recommendations, current } = this.state;

        if (recommendations[current.index + 1] !== undefined) {
            let updCurrent = {
                index: current.index + 1,
                user: recommendations[current.index + 1]
            }
            this.setState({current : updCurrent})
        }
    }

    render() {
        const { isLoading, current } = this.state;

        if (!isLoading) {
            return (
                <>
                    <div className="container d-flex h-100 align-items-center">
                        <div className="mx-auto text-center">
                            <h1 className="mx-auto my-0 text-red" style={{fontSize:"800%"}}>
                            {current.user.name}
                            </h1>
                            <button onClick={this.getNext}>Next</button>
                        </div>
                    </div>
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