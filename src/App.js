import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import AuthProvider from './contexts/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer autoClose={5000} />
          <Rotas />
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
