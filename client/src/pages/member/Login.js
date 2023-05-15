import React, { useState, useContext, useEffect } from 'react'
import { LoginContext } from '../../context/Context';
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.scss'

export const Login = () => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const { updateLoginStatus, loginStatus } = useContext(LoginContext)

  axios.defaults.withCredentials = true

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {
      username: name,
      password: pass,
    })
    .then(r => {
      if(r.data.token){
        updateLoginStatus()
        document.cookie = `token=${r.data.token}`
        jwt(r.data.token)
      }else if(r.data.message){
        setLoginMessage(r.data.message)
      }
    })
  }

  function jwt (token) {
    axios.get('http://localhost:3001/login', {
      headers:{
        Authorization: token
      }
    })
    .then(r => {
      console.log(r)
      if(r.data.loggedIn){
        setLoginMessage(`Welcome`)
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
        <label htmlFor="password">password</label>
        <input value={pass}  type="password" placeholder='******'  name='password' onChange={(e)=>{setPass(e.target.value)}}/>
        <button className="login-btn">Log In</button>
      </form>
      {loginStatus &&
      <div className='mesg'>{loginMessage}</div>}
      <p>
        Don't have an account? 
        <Link to='/regitster'> Register here.</Link>
      </p>
    </div>
    </>
  )
}