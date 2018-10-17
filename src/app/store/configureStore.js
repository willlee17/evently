import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from '../config/firebase';

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
}

export const configureStore = (preloadedState) => {
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
   //thunk allows us to use dispatch and getState. We want to add extra arguments to include getFirebase and getFirestore.
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
     reactReduxFirebase(firebase, rrfConfig),
     reduxFirestore(firebase),
   )

  const store = createStore(
    rootReducer,
    preloadedState, //Optional
    composedEnhancer //So it has access to all our middlewares when we start using them.
  );

  return store;
}
