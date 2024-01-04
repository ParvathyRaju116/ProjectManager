import React from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';


function Header({dashboard}) {

  const navigate=useNavigate()

  const logOut =()=>{
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentId")
    localStorage.removeItem("token")

    navigate('/')
  }
  
  return (
    <div style={{backgroundColor:'rgb(35,60,115)'}}>
<Navbar expand="lg" >
      <Container>
        <Navbar.Brand href="#home" className='text-white'>Project Fair</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              dashboard&& 
              <Button onClick={logOut} style={{textDecoration:'none'}} className='text-white btn'>LogOut</Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
       
    </div>
  )
}

export default Header