import React, { Component } from 'react'
import SideBar from './SideBar'
import './css/side.css'

export default class Asd extends Component {
  constructor(props){
    super(props);


  }

  render() {
      return (
        <div className="App" id="outer-container">
          <SideBar removeCookie={this.props.removeCookie} user={this.props.user} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="page-wrap">
          <h1>Huzogass</h1>
          <h2>Jobbrabalra stb</h2>
        </div>
      </div>
      );
  }
}
