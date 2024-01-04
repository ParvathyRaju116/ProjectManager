import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { deleteProjectSpi, userProjectApi } from '../Service/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../Service/ContextShare'
import UpdateProject from './UpdateProject'


function ViewMyProjects() {
  const {addUpdate} =useContext(addResponseContext)
  const {editUpdate}=useContext(editResponseContext)


  const[token,setToken]=useState("")
  const [userProjects,setUserProjects]=useState([])

  const getUserProject = async()=>{
    // header-token

    if(localStorage.getItem("currentId")){
      const id=localStorage.getItem("currentId")
      // console.log(id);

// hedaer creation
      const token =localStorage.getItem("token")

const reqHeader={
  "Content-Type":"application/json",
  "access_token":`Bearer ${token}`
}

console.log(reqHeader);
const result=await userProjectApi(reqHeader,id)
console.log(result);
if(result.status==200){
  setUserProjects(result.data)
}



    }
  }

  const handleDelete=async(e,id)=>{
    e.preventDefault()
    // header
 const token =localStorage.getItem("token")

    const reqHeader={
      "Content-Type":"application/json",
      "access_token":`Bearer ${token}`
    }

    const response= await deleteProjectSpi(reqHeader,id)
    console.log(response);
    alert(response.data)
    getUserProject()

  }

  useEffect(()=>{
    getUserProject()

  },[
    addUpdate,editUpdate
    
  ])
  return (
    <div >
      { userProjects?.length>0?
      userProjects?.map(i=>(   <Row>
       <div className='shadow justify-content-between mt-5'>
            
              
            <p className='w-100'>
            <Col className='m-3 fs-2'>{i?.title}</Col>
                <Col>
                  <span className='d-flex justify-content-end'>

                   <UpdateProject project={i}></UpdateProject>

                   <Link to={`${i.gitHub}`}> <i class="fa-brands fa-github m-1  border-end p-1" style={{ color: 'rgb(35, 60, 115)' }}></i></Link>
                   <span onClick={(e)=>handleDelete(e,i?._id)}> <i class="fa-solid fa-trash m-1 p-1" style={{ color: 'rgb(35, 60, 115)' }}></i></span>
                  </span>
                </Col>
                </p>
               
           
       </div>
    </Row>)) : <p className='text-danger mt-3'>No Project Uploaded!!!</p>}
    </div>
  )
}

export default ViewMyProjects