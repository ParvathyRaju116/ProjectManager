import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../Service/allApi'





function Home() {
    const [isloggedIn,setLoggedIn]=useState(false)

    const[homeProjects,setHomeProjects]=useState([])

    const getHomeProject=async()=>{
       const response=await homeProjectApi()
       setHomeProjects(response.data)
    }

    useEffect(()=>{
        getHomeProject()
if(localStorage.getItem("currentId")){
    setLoggedIn(true)
}
    },[])

    console.log(homeProjects);
    console.log(isloggedIn);
  return (
    <div>
        <Container>
        <Row className='mt-5 pt-5'>
            <Col lg={6} md={12} className='mt-5 pt-4'>
            <h1 
            className='fs-1' 
            style={{
                fontWeight:'700', 
                color:'rgb(35,60,115)'
             }}
                >Project Fair</h1>
            <p className='fs-5 mt-4'>One Stop Destination for all software Development Projects.Where Users can add and manage their projects. As well as access all projects available in our website... What are you waiting for!!!</p>
          {isloggedIn?  <Link
            to={'/dash-board'} 
            className='mt-4 btn text-white'
                style={{
                   backgroundColor:'rgb(35,60,115)',
                   border:0
                }}>
                START TO EXPLORE <i class="fa-solid fa-chevron-right text-white"></i><i class="fa-solid fa-chevron-right text-white"></i>
            </Link>:
             <Link
             to={'/login'} 
             className='mt-4 btn text-white'
                 style={{
                    backgroundColor:'rgb(35,60,115)',
                    border:0
                 }}>
                 START<i class="fa-solid fa-chevron-right text-white"></i><i class="fa-solid fa-chevron-right text-white"></i>
             </Link>
            }
            </Col>

            <Col  lg={6} md={12}>
            <img src="https://i.postimg.cc/SN1kWfKX/360-F-447036650-Bwt-W5-Sm-AIxgd-Jx-Jun-Rvkiays-Lkjg-DAFB-removebg-preview.png" alt="" className='homeimg' /></Col>
        </Row>
        </Container>


        <div className='projects mt-5 mb-5'>
           
            <div className='text-center' style={{color:'rgb(35,60,115)'}}> <h1 className='m-5 pt-5'>Explore Our Projects</h1></div>
            <marquee behavior="" direction="" scrollAmount={10}>
            <div className='d-flex justify-content-between mb-5'>
           { homeProjects.length>0?homeProjects?.map(i=>(
           <div ><ProjectCard project={i}/></div>
           )): <h1>No Projects</h1> }
            
           </div>
           </marquee>
            <div className='text-center'>
                <Link to={'/projects'}>View More Projects</Link>
           </div>
           
        </div>









    </div>
  )
}

export default Home