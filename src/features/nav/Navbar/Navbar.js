import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import  {connect} from 'react-redux';
import { openModal } from '../../modals/modalActions';
import { withFirebase } from 'react-redux-firebase';
//To signout. Allows us to have firebase functionality. So you wrap this shit on the bottom again as a higher order function
// If you go to react and then click on the Navbar component its going to have a firebase property.

const mapStateToProps = (state) => ({
  // auth: state.auth    //Now that we've implemented firebase authentication.
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

const mapDispatchToProps = {
  openModal,
}

class Navbar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout()
    this.props.history.push('/')
  }

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
     //To make sure the user is actually authenticated. Or if there's any authentication credentials at all.

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

          {authenticated ? (<SignedInMenu auth={auth} signOut={this.handleSignOut} profile={profile}/>) : (<SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>) }
        </Container>
      </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapStateToProps, mapDispatchToProps)(Navbar)));
