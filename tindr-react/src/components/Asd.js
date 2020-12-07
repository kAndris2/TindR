import React, { Component } from 'react'
import SideBar from './SideBar'
import './css/side.css'

export default class Asd extends Component {
    render() {
        return (
          <div className="App" id="outer-container">
            <SideBar user={this.props.user} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <div id="page-wrap">
            <h1>Huzogass</h1>
            <h2>Jobbrabalra stb</h2>
          </div>
        </div>
        );
    }
}
