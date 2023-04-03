import React , { useState } from 'react'
import axios from 'axios'
import './Register.scss'

export const Regitster = () => {
  const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {
      username: name,
      password: pass,
    })
    .then(r => console.log(r))
  }

  return (
    <div className='auth-form-container'>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input value={name}  name='name' type='text' placeholder='full name' onChange={(e)=>{setName(e.target.value)}}/>
      {/* <label htmlFor="email">email</label>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='youremail@gmail.com' id='email' name='email'/> */}
      <label htmlFor="password">password</label>
      <input value={pass}  type="password" placeholder='******' name='password' onChange={(e)=>{setPass(e.target.value)}}/>
      <button className="register-btn">Register</button>
    </form>
    {/* <button className="login-btn">Already have an account? Login here.</button> */}
    </div>
  )
}
