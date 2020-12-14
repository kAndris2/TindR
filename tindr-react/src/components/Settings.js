import React, { Component } from 'react';
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane';

export default class Settings extends Component {
    constructor(props) {
        super(props);
    
        // You will maybe receive your settings from this.props or do a fetch request in your componentWillMount
        // but here is an example of how it should look like:
        this.state = {
          "mysettings.general.name": "Dennis Stücken",
          "mysettings.general.username": "dstuecken",
          "mysettings.general.color-theme": "purple",
          "mysettings.general.email": "dstuecken@react-settings-pane.com",
          "mysettings.general.picture": "earth",
          "mysettings.profile.firstname": "Dennis",
          "mysettings.profile.lastname": "Stücken"
        };
    
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
    
        // Define your menu
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
    
      render() {
        // Get settings
        let settings = this.state;
    
        // Define one of your Settings pages
        /*
         const dynamicOptionsForGeneralPage = [
           {
             key: null
             label: 'Account',
             type: 'headline',
           },
           {
             key: 'mysettings.general.email',
             label: 'E-Mail address',
             type: 'text',
           },
           {
             key: 'mysettings.general.password',
             label: 'Password',
             type: 'password',
           },
           {
             key: 'mysettings.general.password-repeat',
             label: 'Password repeat',
             type: 'password',
           },
           {
             key: null,
             label: 'Appearance',
             type: 'headline',
           },
           {
             key: 'mysettings.general.color-theme',
             label: 'Color Theme',
             type: 'custom',
             component: <select><option value="blue">Blue</option><option value="red">Red</option></select>,
           }
         ];
         // Then use with:
         // <SettingsPage handler="/settings/general" options={dynamicOptionsForGeneralPage} />
         */
    
        // Return your Settings Pane
        return (
          <div className="container">
            <div className="page-header">
              <h1>
                Settings
              </h1>
            </div>
            <div style={{ margin: "30px 0 90px 0" }}>
              <button
                onClick={this.showPrefs.bind(this)}
                className="btn btn-info"
              >
                Show Preferences
              </button>
            </div>
            
          </div>
        );
      }
}
