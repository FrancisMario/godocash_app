
import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Container, Header, Content, Dropdown, Icon, Nav, Navbar, Sidebar, Sidenav } from 'rsuite';

import Dashboard from './Dashboard';
import { Settings } from "./../components/settings";
import { Entity } from "./../components//entities_new";
import { Details } from "./../components/Details";


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
      page: 2,
      active0: true,
      active1: false,
      active2: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }
  handleToggle() {
    this.setState({
      expand: !this.state.expand
    });
  }
  handleNav(key) {
    switch (key) {
      case 0:
        this.state.active0 = true;
        this.state.active1 = false;
        this.state.active2 = false;
        this.state.active3 = false;
        break;
        case 1:
          this.state.active0 = false;
          this.state.active1 = true;
          this.state.active2 = false;
          this.state.active3 = false;
          break;
          case 2:
            this.state.active0 = false;
            this.state.active1 = false;
            this.state.active2 = false;
            this.state.active3 = true;
        break;
    }
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
                {/* <Nav.Item eventKey="1" active={this.state.active0} onClick={() => this.handleNav(0)} icon={<Icon icon="dashboard" />}>
                  Dashboard
                </Nav.Item> */}
                <Dropdown
                  eventKey="3"
                  trigger="hover"
                  title="Menu"
                  icon={<Icon icon="magic" />}
                  placement="rightStart"
                >
                  {/* <Dropdown.Item eventKey="3-1" active={this.state.active1} onClick={() => this.handleNav(0)}>History</Dropdown.Item> */}
                  <Dropdown.Item eventKey="" active={this.state.active3} onClick={() => this.handleNav(2)}>Entities</Dropdown.Item>
                  <Dropdown.Item eventKey="" active={this.state.active2} onClick={() => this.handleNav(1)}>Settings</Dropdown.Item>
                </Dropdown>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={this.handleToggle} />
        </Sidebar>

        <Container>
          <Top/>
          <Content>
            <div style={(contentStyle)}>
              {this.state.page === 0 ? <Dashboard/> : this.state.page === 1 ? <Settings/> : this.state.page === 2 ?  <Entity/> : <Dashboard/> }
              {/* <Dashboard /> */}
            </div>
          </Content>
        </Container>
      </Container>

    );
  }
}


export default HomePage;
