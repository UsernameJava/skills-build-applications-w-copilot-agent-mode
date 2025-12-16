import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const BASE_API = codespace
  ? `https://${codespace}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';
window.BASE_API = BASE_API;
console.log('BASE_API set to', BASE_API);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
