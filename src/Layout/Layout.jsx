import React from 'react'
import Navigation from '../Customer/components/Navigation/Navigation'

import Footer from '../Customer/components/Footer/Footer'


const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className='layout p-4'>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout