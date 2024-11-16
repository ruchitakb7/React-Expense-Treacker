import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './store/AuthProvider';
import DashboardProvider from './store/DashBoardProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter> 
      <AuthProvider>
        <DashboardProvider>
        <App />
        </DashboardProvider>
      </AuthProvider>
        
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
