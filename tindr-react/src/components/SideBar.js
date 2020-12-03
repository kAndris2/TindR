import React, {Component} from 'react';
import { Helmet } from 'react-helmet';

class SideBar extends Component {
    constructor() {
      super();
    }

    render() {
        return (
            <>
                <h1>{this.props.user.name}</h1>
                <div class="wrapper d-flex align-items-stretch">
                <nav id="sidebar" class="">
                    <div class="custom-menu">
                        <button type="button" id="sidebarCollapse" class="btn btn-primary">
                        <i class="fa fa-bars"></i>
                        <span class="sr-only">Toggle Menu</span>
                        </button>
                    </div>
                    <div class="p-4 pt-5">
                        <h1><a href="index.html" class="logo">Splash</a></h1>
                        <ul class="list-unstyled components mb-5">
                            <li class="active">
                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle collapsed">Home</a>
                            <ul class="list-unstyled collapse" id="homeSubmenu">
                                <li>
                                    <a href="#">Home 1</a>
                                </li>
                                <li>
                                    <a href="#">Home 2</a>
                                </li>
                                <li>
                                    <a href="#">Home 3</a>
                                </li>
                            </ul>
                            </li>
                            <li>
                            <a href="#">About</a>
                            </li>
                            <li>
                            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle collapsed">Pages</a>
                            <ul class="list-unstyled collapse" id="pageSubmenu">
                                <li>
                                    <a href="#">Page 1</a>
                                </li>
                                <li>
                                    <a href="#">Page 2</a>
                                </li>
                                <li>
                                    <a href="#">Page 3</a>
                                </li>
                            </ul>
                            </li>
                            <li>
                            <a href="#">Portfolio</a>
                            </li>
                            <li>
                            <a href="#">Contact</a>
                            </li>
                        </ul>
                        <div class="mb-5">
                            <h3 class="h6">Subscribe for newsletter</h3>
                            <form action="#" class="colorlib-subscribe-form">
                            <div class="form-group d-flex">
                                <div class="icon"><span class="icon-paper-plane"></span></div>
                                <input type="text" class="form-control" placeholder="Enter Email Address"/>
                            </div>
                            </form>
                        </div>
                        <div class="footer">
                            <p>
                            Copyright ©<script>document.write(new Date().getFullYear());</script>2020 All rights reserved | This template is made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a>
                            </p>
                        </div>
                    </div>
                </nav>
                <div id="content" class="p-4 p-md-5 pt-5">
                    <h2 class="mb-4">Sidebar #02</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                </div>
            </>
        );
    }
}

export default SideBar;