import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/App';
import './index.css';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <App className="app" />
  </Provider>,
  document.getElementById('root')
);
