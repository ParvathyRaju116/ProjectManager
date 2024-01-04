import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Mail } from 'react-feather'
import { Link } from 'react-router-dom'







function Footer() {
  return (
    <div className='mt-5'>
        <Container>
            <Row>
                <Col lg={3}><h2 style={{color:'rgb(35,60,115)'}}>Project Fair</h2>
                <p>Completely free App to manage all software Projects</p>
                For enqiery <Mail></Mail>@projectFair116@gmail.com</Col>

                <Col lg={3}>
                <h2 style={{color:'rgb(35,60,115)'}}>Links</h2>
                <Link to={'/'} style={{textDecoration:'none',color:'black'}}>Home</Link><br />
                <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>Login</Link><br />
                <Link to={'/register'} style={{textDecoration:'none',color:'black'}}>Sign up</Link>
                </Col>

                <Col lg={3}>
                <h2 style={{color:'rgb(35,60,115)'}}>Guides</h2>
                <p><i class="fa-brands fa-react"></i> React</p>
                <p><i class="fa-brands fa-react"></i>React Bootstrap</p>
                <p><i class="fa-solid fa-route"></i>Routing</p>
                </Col>
                <Col lg={3}>
                <h2 style={{color:'rgb(35,60,115)'}}>Contact Us</h2>
                <Form.Control
                  required
                  type="mail"
                  placeholder="Enter email"
               />
               <Button  
                   className='mt-1 btn1 m-2'
                    style={{
                   backgroundColor:'rgb(35,60,115)',
                   border:0
                }}>
                    Submit
                </Button>
                <p style={{color:'rgb(35,60,115)',}} className='mt-3'><i class="fa-brands fa-x-twitter m-1"></i>
                    <i class="fa-brands fa-github m-1"></i>
                    <i class="fa-brands fa-instagram m-1"></i></p>

                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Footer