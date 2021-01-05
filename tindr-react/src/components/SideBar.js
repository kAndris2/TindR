import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react';
import axios from 'axios';
import {Badge} from 'react-bootstrap';
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane';
import { InputTags } from 'react-bootstrap-tagsinput';
import 'react-bootstrap-tagsinput/dist/index.css';
export default class SideBar extends Component {
  constructor(props){
    super(props);

    this.state={
      profilePath:'',
      isLoading:true,
      details:'',
      formData: '',
      tags:this.props.user.passion.split(","),
      finalTags:[]
    }

     // Save settings after close
     this._leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
    // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.

      if (wasSaved && (newSettings !== oldSettings)) {
        // do something with the settings, e.g. save via ajax.

        //this.setState({formData:newSettings});
        //https://open.spotify.com/track/0vWUhCPxpJOJR5urYbZypB

        let songID='';
        if ((newSettings.anthem) && newSettings.anthem.length > 22){
          songID = newSettings.anthem.split("track/")[1];
        }
        else songID = oldSettings.anthem;
        axios.put("http://"+process.env.REACT_APP_IP+":8000/api/update_user/"+this.props.user.id,{
          name:newSettings.name,
          description:newSettings.description,
          anthem:songID
        });
        axios.put("http://"+process.env.REACT_APP_IP+":8000/api/update_account/"+this.props.user.id,{
          email:newSettings.email,
          phone_number:newSettings.phone_number
        });
        if (this.state.finalTags.length >= 1){
          axios.put("http://"+process.env.REACT_APP_IP+":8000/api/update_user/"+this.props.user.id,{
            passion:newSettings.finalTags.join()
          });
        }
      }

      this.hidePrefs();
    };

    // React if a single setting changed
    this._settingsChanged = ev => {
      
    };

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
        title: "Pictures",
        url: "/settings/pictures"
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

  async getDetails(userid){
    await axios.get("http://"+process.env.REACT_APP_IP+":8000/api/details/"+userid)
    .then(resp => {
      this.setState({details:resp.data})
    })
  }

  async componentDidMount(){
    await this.getProfilePictures(this.props.user);
    await this.getDetails(this.props.user.id);
  }

  render() {
    const {isLoading, profilePath,details,tags} = this.state;
    let settings = this.state;
    if(isLoading){
      return(<p>Loading...</p>)
    }
    
    return (
      <>
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
                      <label htmlFor="generalUsername">Username: </label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Username"
                          aria-describedby="basic-addon1"
                          onChange={this._settingsChanged}
                          defaultValue={this.props.user.name}
                        />
                      </div>
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="generalMail">E-Mail address: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="E-Mail Address"
                        id="generalMail"
                        onChange={this._settingsChanged}
                        defaultValue={details.email}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="generalPic">Mobile number: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone_number"
                        placeholder="Mobile number"
                        id="generalPic"
                        onChange={this._settingsChanged}
                        defaultValue={details.phone_number}
                      />
                    </fieldset>
                  </SettingsPage>
                  <SettingsPage handler="/settings/profile">
                  <fieldset className="form-group">
                      <label htmlFor="profileFirstname">Company: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mysettings.profile.firstname"
                        placeholder="Add a company"
                        id="profileFirstname"
                        onChange={this._settingsChanged}
                        defaultValue={this.props.user.copmany}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="profileFirstname">Job Title: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mysettings.profile.firstname"
                        placeholder="Job title"
                        id="profileFirstname"
                        onChange={this._settingsChanged}
                        defaultValue={settings["mysettings.profile.firstname"]}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="profileLastname">Your passions: </label>
                      <InputTags values={tags} onTags={(value) => this.setState({finalTags:value.values})} />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="profileBiography">Details: </label>
                      <textarea
                        className="form-control"
                        name="description"
                        placeholder="Tell us something about yourself"
                        id="profileBiography"
                        onChange={this._settingsChanged}
                        defaultValue={this.props.user.description}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="profileLastname">Anthem: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="anthem"
                        placeholder="ex.: https://open.spotify.com/track/0vWUhCPxpJOJR5urYbZypB"
                        onChange={this._settingsChanged}
                        
                      />
                    </fieldset>
                  </SettingsPage>
                  <SettingsPage handler="/settings/pictures">
                    <h1>Uploaded pics</h1>
                  </SettingsPage>
                </SettingsContent>
              </SettingsPane>
            </div>
      </>
    )
  }
}