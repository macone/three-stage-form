import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const target = document.getElementById('erw-root');
if (target) { ReactDOM.render(<App />, target); }

const testTarget = document.getElementById('root');
if (testTarget) { ReactDOM.render(<App />, testTarget); }

serviceWorker.unregister();
