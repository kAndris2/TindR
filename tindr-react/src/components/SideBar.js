import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

class SideBar extends Component {
    constructor() {
      super();
    }

    render() {
        return (
            <>
            <ProSidebar>
                    <Menu iconShape="square">
                        <MenuItem >Dashboard</MenuItem>
                        <SubMenu title="Components" >
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>
                </ProSidebar>
                <div className="container">
                
                    <p>Dik</p>    
                </div>
            </>
        );
    }
}

export default SideBar;