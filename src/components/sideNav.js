import 'rsuite/dist/styles/rsuite-default.css';
import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import React from 'react';

export const SideNav = () => {
    return(
        <div style={{ width: 250 }}>
    <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
            Dashboard
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
            User Group
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </div>
    );
} 