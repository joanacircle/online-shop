import React, { useState, useContext } from 'react'
import { LoginContext } from '../../context/Context';
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.scss'

export const Login = () => {
  const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const { updateLoginStatus, loginStatus } = useContext(LoginContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {
      username: name,
      password: pass,
    })
    .then(r => {
      if(r.data.length > 0){
        updateLoginStatus()
      }
    })
  }
  return (
    <>
    <div className='auth-form-container'>
      <h2 className='login-title'>Login to your account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name}  name='name' type='text' placeholder='full name' onChange={(e)=>{setName(e.target.value)}}/>
        {/* <label htmlFor="email">email</label>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='youremail@gmail.com' id='email' name='email'/> */}
        <label htmlFor="password">password</label>
        <input value={pass}  type="password" placeholder='******'  name='password' onChange={(e)=>{setPass(e.target.value)}}/>
        <button className="login-btn">Log In</button>
      </form>
      {loginStatus?
      <div className='mesg'>Welcome!</div>:
      <div className='mesg'>Wrong username/password combination!</div>
      }
      <p>
        Don't have an account? 
        <Link to='/regitster'> Register here.</Link>
      </p>
    </div>
    </>
  )
}