import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants'
import { createReducer }from '../../app/common/util/reducerUtil';

const initialState = {
  data: 670
}

export const incrementCounter = (state, payload) => {
  return { ...state, data: state.data+1};
}

export const decrementCounter = (state, payload) => {
  return { ...state, data: state.data-1};
}

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter,
})

// This is what I had before the boiler plate cut with createReducer from reducerUtil
// const testReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case INCREMENT_COUNTER:
//       return {
//         ...state,
//         data: state.data + 1
//       };
//     case DECREMENT_COUNTER:
//       return {
//         ...state,
//         data: state.data - 1
//       };
//     default:
//       return state;
//   }
// }
//
// export default createReducertestReducer
