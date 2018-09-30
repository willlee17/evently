import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';

class SignedOutMenu extends Component {
  render() {
    return (
      <Menu.Item position="right">
        <Button onClick={this.props.signIn} basic inverted content="Login"/>
        <Button basic inverted content="Register"/>
      </Menu.Item>
    )
  }
}

export default SignedOutMenu;
