
import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Container, Header, Content, Dropdown, Icon, Nav, Navbar, Sidebar, Sidenav } from 'rsuite';

import Dashboard from './Dashboard';
import { Settings } from "./../components/settings";
import { Entity } from "./../components//entities";
import { Details } from "./../components/Details";
import {Revenue}  from './../components/revenue';
import {Expense}  from './../components/expense';
import {Payroll}  from './../components/payroll';
import { Inventory }  from './../components/inventory/inventory';


const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const iconStyles = {
  width: 56,
  height: 56,
  lineHeight: '56px',
  textAlign: 'center'
};

const contentStyle = {
  "padding-top": "20px",
  "padding-right": "30px",
  "padding-bottom": "50px",
  "padding-left": "20px",
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Dropdown
            placement="topStart"
            trigger="click"
            renderTitle={children => {
              return <Icon style={iconStyles} icon="cog" />;
            }}
          >
            <Dropdown.Item onClick={() => this.handleNav(1)}>Settings</Dropdown.Item>
            {/* <Dropdown.Item onClick={}>Logout</Dropdown.Item> */}
          </Dropdown>
        </Nav>

        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            <Icon icon={expand ? 'angle-left' : 'angle-right'} />
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

const Top = ({ expand, onChange }) => {
  const user = useContext(UserContext);

  return (
    <Header>
      <Navbar>
        <Navbar.Header>
          {/* <a href="#" className="navbar-brand logo">RSUITE</a> */}
        </Navbar.Header>
        <Navbar.Body>
          <Nav pullRight>
            <Dropdown icon={<Icon icon="cog" />} title="Options">
              <Dropdown.Item onClick={() => user.logout()}>Logout</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </Header>
  );
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true,
      page: 1,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }
  handleToggle() {
    this.setState({
      expand: !this.state.expand
    });
  }

  isActive(key) {
    if (this.state.page === key) { return true }
    return false;
  }
  handleNav(key) {

    this.setState({
      page: key
    });
  }
  render() {
    const { expand } = this.state;
    return (
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav expanded={expand} defaultOpenKeys={['3']} style={{ height: (window.outerHeight - 150) }} appearance="inverse">
            <Sidenav.Header>
              <div style={headerStyles}>
                <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: "center" }} />
                <span style={{ marginLeft: 12 }}> BRAND</span>
              </div>
            </Sidenav.Header>
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active={this.state.active0} onClick={() => this.handleNav(1)} icon={<Icon icon="dashboard" />}>
                  Dashboard
                </Nav.Item>
                <Dropdown
                  eventKey="3"
                  trigger="hover"
                  title="Menu"
                  icon={<Icon icon="magic" />}
                  placement="rightStart"
                >
                  {/* <Dropdown.Item eventKey="3-1" active={this.state.active1} onClick={() => this.handleNav(0)}>History</Dropdown.Item> */}
                  <Dropdown.Item eventKey="" active={this.isActive(2)} onClick={() => this.handleNav(2)}>Revenue</Dropdown.Item>
                  <Dropdown.Item eventKey="" active={this.isActive(3)} onClick={() => this.handleNav(3)}>Expense</Dropdown.Item>
                  <Dropdown.Item eventKey="" active={this.isActive(4)} onClick={() => this.handleNav(4)}>Payroll</Dropdown.Item>
                  <Dropdown.Item eventKey="" active={this.isActive(5)} onClick={() => this.handleNav(5)}>Inventory</Dropdown.Item>
                </Dropdown>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={this.handleToggle} />
        </Sidebar>

        <Container>
          <Top />
          <Content>
            <div style={(contentStyle)}>
              {/* Payroll */}
              { 
              this.state.page === 1 ? <Dashboard /> : 
              this.state.page === 2 ? <Entity title="Revenue"> <Revenue /></Entity> : 
              this.state.page === 3 ?  <Entity title="Expense"> <Expense /></Entity> : 
              this.state.page === 4 ? <Entity title="Payroll"> <Payroll /></Entity> : 
              this.state.page === 5 ? <Entity title="Inventory"> <Inventory /></Entity> : 
              <Dashboard />}
            </div>
          </Content>
        </Container>
      </Container>

    );
  }
}


export default HomePage;
