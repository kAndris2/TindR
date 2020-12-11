import { bubble as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import axios from 'axios';

export default class SideBar extends Component {
  constructor(props){
    super(props);

    this.state={
      profilePath:'',
      isLoading:true
    }

  }

  async getProfilePictures(user) {
    await axios.get(`http://${process.env.REACT_APP_IP}:8000/api/pictures/${user.id}`)
    .then(response => {
      Promise.all(response.data.map(p => {
        this.setState({
          profilePath: p,
          isLoading: false
      });
      }))
      /*
        this.setState({
            profilePath: response.data,
            isLoading: false
        });
        */
    })
  }

  async componentDidMount(){
    await this.getProfilePictures(this.props.user);
  }

  render() {
    const {isLoading, profilePath} = this.state;
    if(isLoading){
      return(<p>Loading...</p>)
    }
    return (
    <Menu>
      <div className="menu-item" href="/">
        {this.props.user.name}
      </div>
      <a className="navbar-brand text-center" href="#">
        <img src={profilePath[0].route} height="80" alt=""/>
      </a>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="#">
        Link
      </a>
      <a className="menu-item" href="#">
        Asd
      </a>
      <a className="menu-item" href="/" onClick={this.props.removeCookie} >
        Logout
      </a>
    </Menu>
    )
  }
}