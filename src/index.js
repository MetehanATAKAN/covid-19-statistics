import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
