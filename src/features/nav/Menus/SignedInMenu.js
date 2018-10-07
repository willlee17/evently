import React, { Component } from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SignedInMenu extends Component {
  render() {
    const { signOut, profile, auth } = this.props
    return (
      <Menu.Item position="right">
          <Image avatar spaced="right" src={profile.photoURL || '/assets/user.png'} />
          <Dropdown pointing="top left" text={profile.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item text="Create Event" icon="plus" />
              <Dropdown.Item text="My Events" icon="calendar" />
              <Dropdown.Item text="My Network" icon="users" />
              <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} profile={profile} text="My Profile" icon="user" />
              <Dropdown.Item text="Settings" icon="settings"  as={Link} to="/settings"/>
              <Dropdown.Item text="Sign Out" icon="power" onClick={signOut} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
    )
  }
}

export default SignedInMenu;
