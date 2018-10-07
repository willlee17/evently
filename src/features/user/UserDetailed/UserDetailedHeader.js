import React from 'react';
import { Grid, Header, Item, Segment } from 'semantic-ui-react';
import differenceInYears from 'date-fns/difference_in_years';

const UserDetailedHeader = ({profile}) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate())
  } else {
    age = "Age unknown..."
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item.Image
            avatar
            size="small"
            src={profile.photoURL || '/assets/user.png'}
          />
          <Item.Content verticalAlign="bottom">
            <Header as="h1">{profile.displayName}</Header>
            <Header as="h2">{profile.occupation}</Header>
            <Header as="h3">{age}, Lives in {profile.city || "...not available"}</Header>
          </Item.Content>
        </Item.Group>
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailedHeader;
