import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contaxt/AuthContext.jsx';
import UserContext from './contaxt/UserContext.jsx';
import ShopContext from './contaxt/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserContext>
        <ShopContext>
          <App />
          </ShopContext>
      </UserContext>
    </AuthProvider>
  </BrowserRouter>
);
