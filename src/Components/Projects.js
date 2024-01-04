import React, { useEffect, useState } from 'react'
import Header from './Header'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import ProjectCard from './ProjectCard';
import { allProjectApi } from '../Service/allApi';






function Projects({}) {
 
  const [allprojects,setAllProjects]=useState([])
  const [serachData, setSerchData]=useState("")

  const allProject=async()=>{
    const response=await allProjectApi(serachData)
    setAllProjects(response.data)
  }

  useEffect(()=>{
    allProject()
  },[serachData])
console.log(serachData);
  console.log(allprojects);

  
  return (
    <div  className='text-center mb-5'>
        
        <Header></Header>

        <div className='text-center m-5'>
            <h1 style={{color:'rgb(35,60,115)'}} className='m-5'>Explore All Projects</h1>

            <Form inline> <Container>
        <Row>
          <Col >
           
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2 "
              onChange={(e)=>setSerchData(e.target.value)}
            />
          </Col>
        </Row> </Container>
      </Form>
       
          </div>
        <div className='container'  >
          <Row>
             { 
             allprojects?.length>0?allprojects.map(i=>(
            <Col xs={12} sm={6} md={12} lg={3} style={{float:'left',justifyContent:'center',alignItems:'center',}} className='mt-5  d-flex align-items-center justify-content-center' > <ProjectCard project={i}/></Col>
             )): <h1>No Projects</h1>
             }
          </Row>
        </div>
         
      </div>
       
  )
}

export default Projects