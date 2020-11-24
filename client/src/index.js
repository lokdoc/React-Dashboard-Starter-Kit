import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { getPublicKey} from "./utils/Verify"

// Initializing Server's Security keys
getPublicKey()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
