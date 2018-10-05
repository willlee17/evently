import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventDetailed from '../../features/events/EventDetailed/EventDetailed';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailed from '../../features/user/UserDetailed/UserDetailed';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/events/EventForm/EventForm';
import Home from '../../features/home/Home';
import TestComponent from  '../../features/testarea/TestComponent'
import { Provider } from 'react-redux';
import { configureStore } from '../store/configureStore'
import ModalManager from '../../features/modals/ModalManager';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';

const store = configureStore();
// store.dispatch(loadEvents()); I used this before I had firestore hooked up.
//So I COULD do componentDidMount to get the initial data. but dispatching straight from the store is a good way to get initial data too.

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <ReduxToastr timeOut={2000} position="bottom-right" transitionIn="bounceIn" transitionOut="bounceOut" closeOnToastrClick={true}/>
            <ModalManager/>
            <Switch>
              <Route exact path="/" component={Home}/>
            </Switch>
            <Route exact path="/(.+)" render={() => (
              <div>
                <Navbar />
                <Container className="main">
                  <Switch>
                    <Route path="/events" component={EventDashboard}/>
                    <Route path="/event/:id" component={EventDetailed}/>
                    <Route path="/manage/:id" component={EventForm}/>
                    <Route path="/people" component={PeopleDashboard}/>
                    <Route path="/profile/:id" component={UserDetailed}/>
                    <Route path="/settings" component={SettingsDashboard}/>
                    <Route path="/createEvent" component={EventForm}/>
                    <Route path="/test" component={TestComponent}/>
                  </Switch>
                </Container>
              </div>
              )}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
