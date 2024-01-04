import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../Service/baseUrl';




function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
<Container>
<Card style={{ width: '18rem' }} className='card1'  onClick={handleShow}>
      <Card.Img variant="top" style={{height:'150px'}} src={project?`${BASE_URL}/uploads/${project.projectImage}`:"https://i.postimg.cc/nzgTzT19/Screenshot-2023-10-15-160451.png"} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>      
      </Card.Body>
    </Card>
  </Container>



  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modalHeader'>
          <Modal.Title style={{color:'rgb(35,60,115)'}}>Project Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
            <img src={project?`${BASE_URL}/uploads/${project.projectImage}`:"https://i.postimg.cc/nzgTzT19/Screenshot-2023-10-15-160451.png"} alt="" className='w-100' style={{height:'150px'}} />
            </Col>
            <Col>
            <p style={{textAlign:'justify'}}><b>Project Description :</b>{project?.overView}</p>
            <p><b>Technologies :</b>{project?.languages}</p>
            </Col>
          </Row>
        </Modal.Body>
        <div className='m-3 modalFooter'>
          <Link to={project?.gitHub}><i class="fa-brands fa-github m-1" style={{color:'rgb(35,60,115)'}}></i></Link>
          <Link to={project?.website}><i class="fa-solid fa-link m-1" style={{color:'rgb(35,60,115)'}}></i></Link>
          </div>
         
       
      </Modal>
    </div>
  )
}

export default ProjectCard