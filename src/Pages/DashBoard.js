import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Profile from '../Components/Profile'
import MyProject from '../Components/MyProject'
import Header from '../Components/Header'
import ViewMyProjects from '../Components/ViewMyProjects'
import { useNavigate } from 'react-router-dom'






function DashBoard() {

    const navigate=useNavigate()

const [uname,setUname]=useState("")
useEffect(()=>{
  if(localStorage.getItem("currentUser")){
    setUname((JSON.parse(localStorage.getItem("currentUser"))).userName)
  }
  else{
    alert("Please login first")
   navigate('/')
  }
},[])
// console.log(uname);
    
    return (
        <div>
            <Header dashboard></Header>
            <h1 className='mt-5 ms-5' style={{color:'rgb(35, 60, 115)',textTransform:'capitalize'}}>Welcome {uname}</h1>
            <div className='dashDiv mt-3' style={{ backgroundColor: ':rgba(35, 60, 115, 0.08)' }}>

                <Row>
                    <Col lg={8}>   
                        <div className='m-5'>
                            <Container>
                           <MyProject/>
                           <ViewMyProjects></ViewMyProjects>

                           
                               
                            </Container>
                        </div>
                    </Col>
                    <Col lg={4}>

                        <Profile userName={uname} />
                    </Col>
                </Row>
            </div>

           
        </div>
    )
}

export default DashBoard