import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './page/App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* http://ec2-3-34-140-68.ap-northeast-2.compute.amazonaws.com:12345/frontend_mymy_demo */}
    <BrowserRouter
      basename="/frontend_mymy_demo" // Add basename prop
    >
    <App />
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
