import moment from 'moment';

export const createNewEvent = (user, photoURL, event) => {
  event.date = moment(event.date).toDate(); //this gives us a JS date.
  return {
    ...event,
    hostedBy: user.displayName,
    hostUid: user.uid,
    hostPhotoURL: photoURL || '/assets/user.png',
    created: Date.now(),
    attendees: {
      [user.uid]: {
          going: true,
          joinDate: Date.now(),
          photoURL: photoURL || '/assets/user.png',
          displayName: user.displayName,
          host: true
      }
    }
  }
}

export const objectToArray = ( object ) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]})) //this takes the key and makes it into an id of the object.
  }
}

export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};
