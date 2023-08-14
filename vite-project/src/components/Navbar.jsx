import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        
    <nav>
        <ul>
            <li><NavLink to='/aboutus'>About</NavLink></li>
            <li><NavLink to='/'>Home</NavLink></li>
        </ul>
    </nav>




    </div>
  )
}