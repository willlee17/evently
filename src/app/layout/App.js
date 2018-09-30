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


class App extends Component {
  render() {
    return (
      <Router>
        <div>
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
                  <Route path="/people" component={PeopleDashboard}/>
                  <Route path="/profile/:id" component={UserDetailed}/>
                  <Route path="/settings" component={SettingsDashboard}/>
                  <Route path="/createEvent" component={EventForm}/>
                </Switch>
              </Container>
            </div>
          )}
        />
        </div>
      </Router>
    );
  }
}

export default App;
