import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const target = document.getElementById('three-stage-form');
if (target) { ReactDOM.render(<App />, target); }

serviceWorker.unregister();
