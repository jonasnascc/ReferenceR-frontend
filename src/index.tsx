import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth/AuthProvider';
import { SearchProvider } from './context/Search/SearchProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
