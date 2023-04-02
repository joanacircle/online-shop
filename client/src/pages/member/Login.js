import React, { useState } from 'react'
import './Login.scss'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email)
  }
  return (
    <div className='auth-form-container'>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='youremail@gmail.com' id='email' name='email'/>
      <label htmlFor="password">password</label>
      <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder='******' id='password' name='password'/>
      <button className="login-btn">Log In</button>
    </form>
    <button className="register-btn">Don't have an account? Register here.</button>
    </div>
  )
}