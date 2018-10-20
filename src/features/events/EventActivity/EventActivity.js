import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const EventActivity = () => {
  return (
    <div style={{position: "fixed", boxShadow: "0px 0px 5px #888888"}}>
      <Header attached="top" content="Welcome to Evently!" textAlign="center" size="huge" inverted style={{backgroundColor: "#D65A72" }}/>
      <Segment attached>
        <h3 style={{marginLeft: "28px"}}>Here's how to get started: </h3>
          <ol>
            <li style={{marginBottom: "10px"}}>Register for an account (or login with your Google account)</li>
            <li style={{marginBottom: "10px"}}>Upload a profile picture (and finish your account info)</li>
            <li style={{marginBottom: "10px"}}>Create, manage, and join events!</li>
          </ol>
      </Segment>
    </div>
  )
}

export default EventActivity;
