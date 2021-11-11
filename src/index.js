import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ListRoute from './router/ListRoute';
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux_user/root-reducer';

ReactDOM.render(
  <React.StrictMode>
     <Provider store= {createStore(rootReducer)}>
    <ListRoute />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
