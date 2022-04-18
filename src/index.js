import React, { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import CssBaseline from '@mui/material/CssBaseline';
import App from './Pages/Main/App';
import configStore from './Store/Config/storeConfig'
import * as serviceWorker from './serviceWorker';

const store = configStore()

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,  
);

serviceWorker.unregister();
