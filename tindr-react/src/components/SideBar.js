import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  
  return (
    <Menu>
      <a className="menu-item" href="/">
        {props.user.name}
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
      <a className="menu-item" href="/" onClick={
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        })}>
        Logout
      </a>
    </Menu>
  );
};