
import { map } from "lodash"
import React, { useState } from "react"
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'

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
      rightItems.push({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'},
      { to: "/testmutation", icon: 'rocket', content:"Test Mutation", key: 'rtest'})
    }
    else {
      rightItems.push({ to: "/login", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'})
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
      Admin
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
            {map(rightItems, item  => <Popup key={item.key} content={ item.content } trigger={<Menu.Item as={NavLink} to={item.to} key={item.key} icon={item.icon} /> } /> )}
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
    <Menu.Item as={NavLink} to="/admin" name="Admin" key="madmin">
       Admin
    </Menu.Item>
    <Menu.Item as={NavLink} to="/affixes" name="Affixes" key="maffixes">
       Affixes
    </Menu.Item>
    <Menu.Menu position="right">
      {map(rightItems, item  => <Popup key={item.key} content={ item.content } trigger={<Menu.Item as={NavLink} to={item.to} key={item.key} icon={item.icon} /> } /> )}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

function NavBar(props) {
  let [visible, setVisible] = useState(false)
  const { user } = useAuth()

  const handlePusher = () => {
    if (visible) setVisible(false)
  }

  const handleToggle = () => setVisible(!visible)

  const { children } = props;

  return (
    <div>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightMenuItems(user)}
          visible={visible}
        >
          <NavBarChildren>{children}</NavBarChildren>
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop rightItems={rightMenuItems(user)} />
        <NavBarChildren>{children}</NavBarChildren>
      </Responsive>
    </div>
  )
}

export default NavBar