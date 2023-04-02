import React , { useState } from 'react'
import './Login.scss'

export const Regitster = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email)
  }

  return (
    <div className='auth-form-container'>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input value={name}  name='name' id='name' type='text' placeholder='full name' />
      <label htmlFor="email">email</label>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='youremail@gmail.com' id='email' name='email'/>
      <label htmlFor="password">password</label>
      <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder='******' id='password' name='password'/>
      <button className="register-btn">Register</button>
    </form>
    <button className="login-btn">Already have an account? Login here.</button>
    </div>
  )
}
