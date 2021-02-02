import React, { Component } from 'react';

import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader,SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem,faHeart } from '@fortawesome/free-solid-svg-icons'

export default class NewSide extends Component {
    
    render() {
        
        return (
            <>
            <div style={{height:''}}>
            <ProSidebar>
                <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    >
                    tindr
                </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<FontAwesomeIcon icon={faGem}></FontAwesomeIcon>}>Dashboard</MenuItem>
                        <SubMenu title="Components" icon={<FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                    >
    
                    <span> aaa</span>
                
                    </div>
                </SidebarFooter>
            </ProSidebar>
            </div>
            <div>asd</div>
            </>
        );
    }
}
