import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div>

        <Header/>

        <Container>

        <div className='main'>{children}</div>
        
        </Container>

        <Footer/>
      
    </div>
  )
}

export default Layout
