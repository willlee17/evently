import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar/Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container className="main">
          <EventDashboard />
          {/* <Button icon="smile" content="react button"/> */}
        </Container>
      </div>
    );
  }
}

export default App;
