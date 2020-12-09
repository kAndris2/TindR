
import { slide as Menu } from 'react-burger-menu';

import React, { Component } from 'react'

export default class SideBar extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <Menu>
      <a className="menu-item" href="/">
        {this.props.user.name}
      </a>
      <a class="navbar-brand" href="#">
        <img src="" width="30" height="30" alt=""/>
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
      <a className="menu-item" href="/" >
        Logout
      </a>
    </Menu>
    )
  }
}