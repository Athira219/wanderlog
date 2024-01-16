import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min .css'
import { BrowserRouter } from 'react-router-dom';
import ContextWanderlog from './context/ContextWanderlog';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextWanderlog>
    <BrowserRouter>
    <App />
  </BrowserRouter>
    </ContextWanderlog>
  </React.StrictMode>
);


