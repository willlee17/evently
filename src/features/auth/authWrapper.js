import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../modals/modalActions';

//Use this to protect my routes
export const UserIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  allowRedirectBack: true,
  redirectPath: "/events",
  authenticatedSelector: ({firebase: {auth}}) =>  //this is connected to redux store. it's a connected component.
    auth.isLoaded && !auth.isEmpty,
  redirectAction: newLoc => (dispatch) => {
    dispatch(openModal('UnauthModal'))
  }
})
