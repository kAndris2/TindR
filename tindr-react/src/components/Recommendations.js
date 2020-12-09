import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import moment from "moment";

class Recommendations extends Component {
    constructor() {
      super();

      this.state = {
          recommendations: [],
          pictures: [],
          currentPictureIndex: 0,
          isLoading: true,
          showProfile: false,
          current: {
              index: undefined,
              user: undefined
          }
      }

      this.getRecommendations = this.getRecommendations.bind(this);
      this.getProfilePictures = this.getProfilePictures.bind(this);
      this.getNextProfile = this.getNextProfile.bind(this);
      this.getCurrentData = this.getCurrentData.bind(this);
      this.handleLike = this.handleLike.bind(this);
      this.handleDislike = this.handleDislike.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.getPictures = this.getPictures.bind(this);
      this.setNextPicture = this.setNextPicture.bind(this);
      this.setPreviousPicture = this.setPreviousPicture.bind(this);
      this.showProfile = this.showProfile.bind(this);
    }

    async componentDidMount() {
        await this.getRecommendations();
    }

    async getRecommendations() {
        await axios.get(`http://${process.env.REACT_APP_IP}:8000/api/recommendations/${this.props.userID}`)
        .then(response => {
            let updCurrent = {
                index: 0,
                user: response.data.length === undefined ? response.data : response.data[0]
            }

            this.setState({
                recommendations : response.data,
                current : updCurrent
            });

            if (response.data.length !== 0)
                response.data.map(this.getProfilePictures);
        })
    }

    getProfilePictures(user) {
        axios.get(`http://${process.env.REACT_APP_IP}:8000/api/pictures/${user.id}`)
        .then(response => {
            this.setState({
                pictures: response.data,
                isLoading: false
            });
        })
    }

    getNextProfile() {
        const { recommendations, current } = this.state;

        if (recommendations[current.index + 1] !== undefined) {
            let updCurrent = {
                index: current.index + 1,
                user: recommendations[current.index + 1]
            }
            this.setState({current : updCurrent})
        }
        else
            this.setState({
                current : {
                    index: 0,
                    user: undefined
                }
            })
    }

    getPictures(id) {
        const { pictures } = this.state;
        let result = [];

        pictures.forEach(p => {
            if (p.id === id) {
                result.push(p);
            }
        })
        return result;
    }

    setNextPicture(id) {
        const { currentPictureIndex } = this.state;
        const max = this.getPictures(id).length -1;
        const next = currentPictureIndex + 1;
        
        if (next <= max)
            this.setState({currentPictureIndex: next})
        else
            this.setState({currentPictureIndex: 0});
    }

    setPreviousPicture(id) {
        const { currentPictureIndex } = this.state;
        const max = this.getPictures(id).length -1;
        const previous = currentPictureIndex - 1;

        if (previous < 0) 
            this.setState({currentPictureIndex : max});
        else
            this.setState({currentPictureIndex : previous});
    }

    showProfile() {
        const { current, showProfile } = this.state;
        const user = current.user;

        if(showProfile) {
            return (
                <>
                    <p>Description: {user.description !== null ? user.description : "N/A"}</p>
                    <p>Birthdate: {user.birthdate !== null ? moment(user.birthdate).format('MMMM Do YYYY') : "N/A"}</p>
                    <p>School: {user.school !== null ? user.school : "N/A"}</p>
                    <p>Works at: {user.company !== null ? user.company : "N/A"}</p>
                    <p>Position: {user.job_title !== null ? user.job_title : "N/A"}</p>
                    <p>Gender: {user.gender !== null ? user.gender : "N/A"}</p>
                    <p>Passions: {user.passion !== null ? user.passion : "N/A"}</p>
                    <p>Sexual Orientation: {user.sexual_orientation !== null ? user.sexual_orientation : "N/A"}</p>
                </>
            );
        }
    }

    getCurrentData() {
        const { current, currentPictureIndex } = this.state;

        if (current.user !== undefined) {
            const route = this.getPictures(current.user.id)[currentPictureIndex].route;
            return(
                <>
                    <img src={route} />
                    <h1 className="mx-auto my-0 text-red">
                        {current.user.name}
                    </h1>
                    <button onClick={this.handleDislike}>Dislike</button>
                    <button onClick={this.handleLike}>Like</button>
                    {this.showProfile()}
                </>
            );
        }
        else {
            return(
                <>
                    No more!
                </>
            );
        }
    }

    handleLike() {
        const { current } = this.state;
        axios.post(`http://${process.env.REACT_APP_IP}:8000/api/add_like`, {
            giverid: this.props.userID,
            receiverid: current.user.id
        }).then(() => {
            this.getNextProfile();
        })
    }

    handleDislike() {
        const { current } = this.state;
        axios.post(`http://${process.env.REACT_APP_IP}:8000/api/add_dislike`, {
            giverid: this.props.userID,
            receiverid: current.user.id
        }).then(() => {
            this.getNextProfile();
        })
    }

    handleKeyDown(event) {
        const { current } = this.state;

        switch(event.key) {
            case "ArrowRight": {
                this.handleLike();
                break;
            }
            case "ArrowLeft": {
                this.handleDislike();
                break;
            }
            case " ": { //Space
                this.setNextPicture(current.user.id);
                break;
            }
            case "Backspace": {
                this.setPreviousPicture(current.user.id);
                break;
            }
            case "ArrowUp": {
                this.setState({showProfile : true});
                break;
            }
            case "ArrowDown": {
                this.setState({showProfile : false});
                break;
            }
            default:
        }
    }

    render() {
        const { isLoading, current } = this.state;

        if (!isLoading) {
            return (
                <>
                    <div onKeyDown={this.handleKeyDown} tabIndex="0" className="container d-flex h-100 align-items-center">
                        <div className="mx-auto text-center">
                            {this.getCurrentData()}
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