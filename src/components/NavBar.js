import { .map } from "lodash";
import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Container,
  Icon,
  Menu,
  Sidebar,
  Responsive,
  Popup
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

let rightMenuItems = (currentUser) => {
  const rightItems = [
    {to: "/search", icon: 'search', content:"Search", key: 'rsearch'},
    ]
    if (currentUser){
      rightItems.push({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'})
    }
    else {
      rightItems.push({ to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'})
    }
    return rightItems
  }


const NavBarMobile = ({
  children,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      size='mini'
      vertical
      visible={visible}
      width='thin'
    >
    <Menu.Item as={NavLink} to="/" name="Home" size='mini' key="minihome">
     <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as={NavLink} to="/admin" name="admin" size='mini' key="miniadmin">
    <Icon name="leaf" />
       Roots
    </Menu.Item>
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
        <Menu fixed="top" inverted>
          <Menu.Item key="side" onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {.map(rightItems, item  => <Popup content={ item.content } trigger={<Menu.Item as={NavLink} to={item.to} key={item.key} icon={item.icon} /> } /> )}
          </Menu.Menu>
        </Menu>
        {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ rightItems }) => (
  <Menu fixed="top" inverted>
    <Menu.Item as={NavLink} to="/" name="home" key="mhome">
       <Icon name="home" />
    </Menu.Item>
    <Menu.Item as={NavLink} to="/admin" name="admin" key="madmin">
       Roots
    </Menu.Item>
    <Menu.Menu position="right">
      {.map(rightItems, item  => <Popup content={ item.content } trigger={<Menu.Item as={NavLink} to={item.to} key={item.key} icon={item.icon} /> } /> )}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

function NavBar {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children} = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightMenuItems(this.props.users.currentUser)}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop rightItems={rightMenuItems(this.props.users.currentUser)} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}

export default NavBar