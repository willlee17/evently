import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import  {connect} from 'react-redux';
import { openModal } from '../../modals/modalActions';
import { signOutUser} from '../../auth/authActions';

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  openModal,
  signOutUser
}

class Navbar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.signOutUser()
    this.props.history.push('/')
  }

  render() {
    const { auth } = this.props
    const authenticated = auth.authenticated

    return(
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to='/' header>
            <img src="/assets/h_logo.png" alt="logo"/>
            Evently
          </Menu.Item>
          <Menu.Item as={NavLink} to='/events' name="Events"/> {/* Semantic UI components can act as other components. In this case NavLink. The to="events" is part of NavLink and not Sematnic UI. amazing. */}
          {authenticated && (
              <Menu.Item as={NavLink} to='/people' name="People"/>
          )}
          {authenticated && (
            <Menu.Item>
              <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event"/>
            </Menu.Item>
          )}

          {authenticated ? (<SignedInMenu signOut={this.handleSignOut} currentUser={auth.currentUser}/>) : (<SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>) }
        </Container>
      </Menu>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
