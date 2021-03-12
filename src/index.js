import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import 'modern-normalize/modern-normalize.css'; //подключение стилей для normalize

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
