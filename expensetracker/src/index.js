import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
          <App />
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();




// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <BrowserRouter> 
//       <AuthProvider>
//         <DashboardProvider>
//           <ExpenseProvider>
//           <App />
//           </ExpenseProvider>
//         </DashboardProvider>
//       </AuthProvider>
        
//       </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();
