import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div>

<Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="#home" className='text-warning'><i className="fa-solid fa-money-bill-1-wave text-danger "></i> Track</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Link className='nav-link text-info' to="/"><i className="fa-solid fa-right-to-bracket"></i></Link>
            <Link className='nav-link text-info' to="/register"> <i className="fa-sharp fa-solid fa-address-card"></i></Link>
            <Link className='nav-link text-info' to="/"><i className="fa-solid fa-right-to-bracket"></i></Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </div>
  )
}

export default Header
