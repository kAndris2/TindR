import React, { Component } from 'react'
import axios from 'axios';
//import hash from "./hash";
import { encoded,authEndpoint } from "./spotify_config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

export default class Test extends Component {
    constructor(props){
        super(props);
        
        this.state={
            baseAPI:"https://api.spotify.com/v1/tracks/",
            token:'',
            isLoading:true,
            externalWindow:'',
            song:'',
            isPlaying:false
        }
        this.player = React.createRef();
        
    }
    audio=null;

    async getToken(){
        await axios.post(authEndpoint,"grant_type=client_credentials",{
            headers:{
                "Authorization": "Basic "+encoded
            }
        })
        .then(resp=>{
            this.setState({token:resp.data.access_token});
        })
        await this.getSong();
    }

    async getSong(){
        if (this.props.songID === null){
            return console.log('%c -------ERROR-------\n SongID was null! \n Refusing to send request. \nAsk the user to set an anthem \n---------------------', 'background: #222; color: red');
        }
        await axios.get(this.state.baseAPI+this.props.songID,{
            headers: {
                'Authorization':'Bearer '+this.state.token
            }
        })
        .then(resp=>{
            this.setState({song:resp.data,isLoading:false});
        })
        this.audio = new Audio(this.state.song.preview_url);
    }

    playClicked(){
        this.setState({ isPlaying: !this.state.isPlaying }, () => {
            this.state.isPlaying ? this.audio.play() : this.audio.pause();
        });
    }

    componentDidMount(){
        this.getToken();
    }

    render() {
        if (this.props.songID === null) {
            return null;
        }
        if(this.state.isLoading){
            return("haggyámátőteni");
        }
        
        return (
            <>
                <div className="card bg-secondary text-white" style={{width:"100%"}}>
                    <div className="row">
                        <div className="col-sm-2" style={{position:"relative"}}>
                            <img height="80" src={this.state.song.album.images[0].url}></img>
                        </div>
                        <div className="col-sm-2" style={{position:"absolute",top:"30%",left:"3%"}}>
                            {this.state.isPlaying ? <FontAwesomeIcon onClick={this.playClicked.bind(this)} icon={faPause} size="2x" /> : <FontAwesomeIcon onClick={this.playClicked.bind(this)} icon={faPlay} size="2x" />}
                        </div>
                        <div style={{zIndex:"-100"}} className="col-sm-1"></div>
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col">{this.state.song.artists[0].name} - {this.state.song.name}</div>
                            </div>
                            <div className="row">
                                <div className="col"></div>
                            </div>
                            <div className="row">
                                <div className="col"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}