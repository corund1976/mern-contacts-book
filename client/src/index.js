import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import 'normalize.css';

import { store } from './reducers'
import App from './components/App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);