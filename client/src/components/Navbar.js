import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, UserCircle } from 'phosphor-react'
import './Navbar.scss'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="links">
        <Link to='/'>Shop</Link>
        <Link to='cart'>
          <ShoppingCart size={32} />
        </Link>
        <Link to='login'>
          <UserCircle size={32} />
        </Link>
      </div>
    </div>
  )
}