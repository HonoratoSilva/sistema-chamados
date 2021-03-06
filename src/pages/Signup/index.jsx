import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Signin/style.css';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth'

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext); 

  function handleSubmit(e){
    e.preventDefault();
    if(email !== '' && password !== '' && nome !== '') {
      signUp(email, password, nome)
    }
  }
    
    return (
      <div className='container-center'>
        <div className='login'>
          <div className='login-area'>
            <img src={logo} alt='Sistema Logo' />
          </div>

          <form onSubmit={handleSubmit}>
            <h1>Cadastrar uma conta</h1>
            <input type="text" placeholder="Insira seu nome" value={nome} onChange={ (e) => setNome(e.target.value) } />
            <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) } />
            <input type="password" placeholder="********" value={password} onChange={ (e) => setPassword(e.target.value) } />
            <button type='submit' id='botao'>
              {loadingAuth ? <p className='loadingButton' /> : 'Acessar' }
            </button>
          </form>
        
          <Link to="/">Já possui uma conta?</Link>
        </div>
      </div>
    );
  }
  
  export default SignUp;