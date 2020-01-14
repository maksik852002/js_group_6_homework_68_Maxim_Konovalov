import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import reducer from './store/reducer';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));