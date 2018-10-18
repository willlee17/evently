import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSidebar = () => {
  return (
    <Grid.Column width={4}>
      <Segment>
        <Button as={Link} to="/settings" className="event-btn" fluid basic content="Go to my profile settings" />
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailedSidebar;
