import React from 'react'

import logo from "./assets/logo.png"
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
const AppLayout = () => {
  return (
    <>
      <nav className='navBar'>
        <img src={logo} alt='logo' className='logo' />
      </nav>

      <Outlet />
      <Footer />
    </>
  )
}

export default AppLayout