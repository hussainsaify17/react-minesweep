import React from 'react';
import ReactDOM from 'react-dom';
import MineSweeper from './Board/MineSweeper';
import './index.css';
import './App.css'

ReactDOM.render(
  <React.StrictMode>
    <MineSweeper/>
  </React.StrictMode>,
  document.getElementById('root')
);