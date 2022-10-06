import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from 'react-redux';
import { store } from './services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <CssBaseline>
      <Provider store={store} >
        <App />
      </Provider>
    </CssBaseline>
);

