import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedEvents from './UserDetailedEvents';
import { userDetailedQuery } from '../userQueries';
import { getUserEvents } from '../userActions';
import { toastr } from 'react-redux-toastr';

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.firebase.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
  }
}

const mapDispatchToProps = {
  getUserEvents
}

class UserDetailedPage extends Component {
  async componentDidMount() {
    let user = await this.props.firestore.get(`users/${this.props.match.params.id}`)
    if(!user.exists) {
      toastr.error("Not Found", "This is not a valid user");
      this.props.history.push('/error');
    }
    let events = await this.props.getUserEvents(this.props.userUid);
  }

  changeTab = (event, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  }

  render() {
    const { profile, photos , auth, match, events, eventsLoading } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    return (
      <Grid>
        <UserDetailedHeader profile={profile}/>
        <UserDetailedDescription profile={profile}/>
        <UserDetailedSidebar isCurrentUser={isCurrentUser}/>
        {photos && photos.length > 0 && (
          <UserDetailedPhotos photos={photos} />
        )}
        <UserDetailedEvents events={events} eventsLoading={eventsLoading} changeTab={this.changeTab} />
      </Grid>
    )
  }
}

export default compose (
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage)
