import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { configureStore } from './app/store/configureStore';

const store = configureStore();

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'));
})

// const store = configureStore();
//
// store.firebaseAuthIsReady.then(() => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <ScrollToTop>
//           <ReduxToastr position="bottom-right" transitionIn="fadeIn" transitionOut="fadeOut" />
//           <App />
//         </ScrollToTop>
//       </BrowserRouter>
//     </Provider>,
//     document.getElementById('root')
//   );
// });

registerServiceWorker();
