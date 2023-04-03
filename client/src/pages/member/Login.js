import React, { useState } from 'react'
import axios from 'axios'
import './Login.scss'

export const Login = () => {
  const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [mesg, setMesg] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {
      username: name,
      password: pass,
    })
    .then(r => {
      if(r.data.length > 0){
        setMesg(false)
      }else{
        setMesg(true)
      }
    })
  }
  return (
    <div className='auth-form-container'>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input value={name}  name='name' type='text' placeholder='full name' onChange={(e)=>{setName(e.target.value)}}/>
      {/* <label htmlFor="email">email</label>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='youremail@gmail.com' id='email' name='email'/> */}
      <label htmlFor="password">password</label>
      <input value={pass}  type="password" placeholder='******'  name='password' onChange={(e)=>{setPass(e.target.value)}}/>
      <button className="login-btn">Log In</button>
    </form>
    {mesg?
    <div className='mesg'>Wrong username/password combination!</div>:
    null}
    {/* <button className="register-btn">Don't have an account? Register here.</button> */}
    </div>
  )
}