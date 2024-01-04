import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../Service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addResponseContext } from '../Service/ContextShare';


function MyProject() {

  const {setAddUpdate}=useContext(addResponseContext)
  
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[token,setToken]=useState("")
  

  // statae for image preview
  const [preview,setPreview]=useState("")

  const[projectInputs,setProjectInputs]=useState({
    title:"",
    overView:"",
    gitHub:"",
    website:"",
    projectImage:"",
    languages:""
  })

  const setInput=(e)=>{
    const {value,name}=e.target 
    setProjectInputs({...projectInputs,[name]:value})
  }

  useEffect(()=>{
     if(projectInputs.projectImage){
     setPreview(URL.createObjectURL(projectInputs.projectImage))
     }
     else{
      setPreview("")
     }
  },[projectInputs.projectImage])
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setToken(localStorage.getItem("token"))
    }
    else{
      setToken("")
    }
  },[])
  // console.log(token);

  console.log(projectInputs);

  const  handleUpdate=async(e)=>{
    e.preventDefault()
    const {title,overView,gitHub,website,projectImage,languages}=projectInputs
    if(!title||!overView||!gitHub||!website||!projectImage||!languages){
      // alert("Please fill all datas")
        toast.warn('Please fill all datas!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    }
    else{
      //  header
      const headerConfig={
        "Content-Type":"multipart/form-data",
        "access_token":`Bearer ${token}`
      }
      // body
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("overView",overView)
      reqBody.append("gitHub",gitHub)
      reqBody.append("website",website)
      reqBody.append("languages",languages)
      reqBody.append("projectImage",projectImage)

      const result = await addProjectApi(reqBody,headerConfig)
      console.log(result);
      if(result.status==200){

        setAddUpdate(result.data)

        toast.success(`${result.data.title} added !`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setProjectInputs({...projectInputs,title:"",overView:"",gitHub:"",website:"",projectImage:"",languages:""})
        handleClose()
      }
      else{
        alert()
        toast.error('result.response?.data', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      console.log(result);

     
    }
   
  }

  return (
    <div>     <div>
    <Row>
        <Col>
            <h4>My Projects</h4>
        </Col>
        <Col className='text-end'>
            <Link 
            onClick={handleShow}
            style={{
                backgroundColor: 'rgb(35, 60, 115)',
                color: 'white'
            }} className='btn'>ADD PROJECT</Link>
        </Col>
    </Row>
    <hr />

  

</div>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col lg={6}>
                
               <label htmlFor='img1' className='text-center'>
               <input 
               type="file" 
               id="img1"
               style={{display:"none"}}
               onChange={(e)=>setProjectInputs({...projectInputs,["projectImage"]:e.target.files[0]})} 
                 />
                
                <img src={
                  preview?preview:"https://i.postimg.cc/bw69Ff9F/download.png"
                  
                } style={{height:'200px',width:'200px'}} alt=""  />
           
               </label>
                <p>Project overview</p>
                </Col>
                
                <Col lg={6}>
                <input 
                type="text" 
                className='border-0' 
                placeholder='Project Name' 
                name='title' 
                onChange={(e)=>setInput(e)}
                value={projectInputs.title}
                />
                <hr />
                <input 
                type="text" 
                className='border-0' 
                placeholder='Language Used' 
                name='languages' 
                onChange={(e)=>setInput(e)}
                value={projectInputs.languages}
                />
                
                <hr />
                <input 
                type="text"
                 className='border-0'
                  placeholder='Github Link'
                   name='gitHub' 
                   onChange={(e)=>setInput(e)}
                   value={projectInputs.gitHub}
                   />
                <hr />
                <input 
                type="text" 
                className='border-0'
                 placeholder='Website Link' 
                 name='website'
                  onChange={(e)=>setInput(e)}
                  />
                
                </Col>
            </Row>
            <textarea 
            name="overView" 
            onChange={(e)=>setInput(e)} 
            id="" cols="60" 
            rows="3"
            
            ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={(e) => handleUpdate(e)}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      </div>
  )
}

export default MyProject