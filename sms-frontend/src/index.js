import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";

import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('app'));
// registerServiceWorker();
serviceWorker.unregister();