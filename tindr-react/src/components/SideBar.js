import { bubble as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import axios from 'axios';
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane';
export default class SideBar extends Component {
  constructor(props){
    super(props);

    this.state={
      profilePath:'',
      isLoading:true,
      "mysettings.general.name": "Dennis Stücken",
      "mysettings.general.username": "dstuecken",
      "mysettings.general.color-theme": "purple",
      "mysettings.general.email": "dstuecken@react-settings-pane.com",
      "mysettings.general.picture": "earth",
      "mysettings.profile.firstname": "Dennis",
      "mysettings.profile.lastname": "Stücken"
    }

     // Save settings after close
     this._leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
      // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.

      if (wasSaved && newSettings !== oldSettings) {
        // do something with the settings, e.g. save via ajax.
        this.setState(newSettings);
      }

      this.hidePrefs();
    };

    // React if a single setting changed
    this._settingsChanged = ev => {};

    // Settings menu definition
    this._menu = [
      {
        title: "General", // Title that is displayed as text in the menu
        url: "/settings/general" // Identifier (url-slug)
      },
      {
        title: "Profile",
        url: "/settings/profile"
      },
      {
        title: "Notifications",
        url: "/settings/notifications"
      },
      {
        title: "Language",
        url: "/settings/language"
      },
      {
        title: "Appearance",
        url: "/settings/appearance"
      },
      {
        title: "Plugins",
        url: "/settings/plugins"
      },
      {
        title: "About",
        url: "/settings/about"
      }
    ];

  }

  hidePrefs() {
    this.prefs.className = "md-modal";
    this.overlay.style.visibility = "";
  }

  showPrefs() {
    this.prefs.className = "md-modal show";
    this.overlay.style.visibility = "visible";
  }

  async getProfilePictures(user) {
    await axios.get(`http://${process.env.REACT_APP_IP}:8000/api/pictures/${user.id}`)
    .then(response => {
      /*
      Promise.all(response.data.map(p => {
        this.setState({
          profilePath: p,
          isLoading: false
      });
      }))
      */
        this.setState({
            profilePath: response.data,
            isLoading: false
        });
    })
  }

  async componentDidMount(){
    await this.getProfilePictures(this.props.user);
  }

  render() {
    const {isLoading, profilePath} = this.state;
    let settings = this.state;
    let user = this.props;
    if(isLoading){
      return(<p>Loading...</p>)
    }
    return (
      <>
        <Menu>
          <div className="menu-item" href="/">
            {user.name}
          </div>
          <a className="navbar-brand text-center" href="#">
            <img src={profilePath[0].route} height="80" alt=""/>
          </a>
          <a className="menu-item" href="/">
            Home
          </a>
          <p className="menu-item" style={{cursor:"pointer"}} onClick={this.showPrefs.bind(this)}>
            Settings
          </p>
          <a className="menu-item" href="#">
            Asd
          </a>
          <a className="menu-item" href="/" onClick={this.props.removeCookie} >
            Logout
          </a>
        </Menu>
        <div ref={ref => (this.overlay = ref)} className="overlay" />
            <div ref={ref => (this.prefs = ref)} className="md-modal">
              <SettingsPane
                items={this._menu}
                index="/settings/general"
                settings={settings}
                onChange={this._settingsChanged}
                onPaneLeave={this._leavePaneHandler}
              >
                <SettingsMenu headline="General Settings" />
                <SettingsContent header>
                  <SettingsPage handler="/settings/general">
                    <fieldset className="form-group">
                      <label htmlFor="generalName">Name: </label>
                      <input
                        type="text"
                        className="form-control"
                        name={this.props.user.name}
                        placeholder="Name"
                        id="generalName"
                        onChange={this._settingsChanged}
                        defaultValue={this.props.user.name}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="generalUsername">Username: </label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="mysettings.general.username"
                          className="form-control"
                          placeholder="Username"
                          aria-describedby="basic-addon1"
                          onChange={this._settingsChanged}
                          defaultValue={settings["mysettings.general.username"]}
                        />
                      </div>
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="generalMail">E-Mail address: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mysettings.general.email"
                        placeholder="E-Mail Address"
                        id="generalMail"
                        onChange={this._settingsChanged}
                        defaultValue={settings["mysettings.general.email"]}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="generalPic">Picture: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mysettings.general.picture"
                        placeholder="Picture"
                        id="generalPic"
                        onChange={this._settingsChanged}
                        defaultValue={settings["mysettings.general.picture"]}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="profileColor">Color-Theme: </label>
                      <select
                        name="mysettings.general.color-theme"
                        id="profileColor"
                        className="form-control"
                        defaultValue={settings["mysettings.general.color-theme"]}
                      >
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                      </select>
                    </fieldset>
                  </SettingsPage>
                  <SettingsPage handler="/settings/profile">
                    <fieldset className="form-group">
                      <label htmlFor="profileFirstname">Firstname: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mysettings.profile.firstname"
                        placeholder="Firstname"
                        id="profileFirstname"
                        onChange={this._settingsChanged}
                        defaultValue={settings["mysettings.profile.firstname"]}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="profileLastname">Lastname: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mysettings.profile.lastname"
                        placeholder="Lastname"
                        id="profileLastname"
                        onChange={this._settingsChanged}
                        defaultValue={settings["mysettings.profile.lastname"]}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="profileBiography">Biography: </label>
                      <textarea
                        className="form-control"
                        name="mysettings.profile.biography"
                        placeholder="Biography"
                        id="profileBiography"
                        onChange={this._settingsChanged}
                        defaultValue={settings["mysettings.profile.biography"]}
                      />
                    </fieldset>
                  </SettingsPage>
                </SettingsContent>
              </SettingsPane>
            </div>

      </>
    )
  }
}