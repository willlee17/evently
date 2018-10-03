import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const EventActivity = () => {
  return (
    <div>
      <Header attached="top" content="Recent Activities" />
      <Segment attached>
        <p>Recent Activities</p>
      </Segment>
    </div>
  )
}

export default EventActivity;
