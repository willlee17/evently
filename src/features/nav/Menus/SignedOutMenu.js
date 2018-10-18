import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';

class SignedOutMenu extends Component {
  render() {
    return (
      <Menu.Item position="right">
        <Button onClick={this.props.signIn} style={{margin: "0 10px"}} basic inverted content="Login"/>
        <Button onClick={this.props.register} style={{margin: "0 10px"}} basic inverted content="Register"/>
      </Menu.Item>
    )
  }
}

export default SignedOutMenu;
