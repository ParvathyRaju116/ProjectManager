import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { BASE_URL } from '../Service/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectApi } from '../Service/allApi';
import { editResponseContext } from '../Service/ContextShare';


function UpdateProject({project}) {

  const {setEditUpdate}=useContext(editResponseContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const[preview,setPreview]=useState("")
    const [projectInputs, setProjectInputs] = useState({
      title: project.title,
      overView: project.overView,
      gitHub: project.gitHub,
      website: project.website,
      projectImage: "",
      languages: project.languages,
    });
  
    useEffect(() => {
      if (projectInputs.projectImage) {
        setPreview(URL.createObjectURL(projectInputs.projectImage));
      } else {
        setPreview("");
      }
    }, [projectInputs.projectImage]);
    console.log(projectInputs);
  

    const handleUpdate = async (e) => {
      e.preventDefault();
      const {title, languages, website, gitHub, overView, projectImage} =
        projectInputs;
      if (!title || !languages || !website || !gitHub || !overView) {
        alert("please fill all datas");
      } else {
        //api call
        // body
        const reqBody = new FormData();
        reqBody.append("title", title);
        reqBody.append("overView", overView);
        reqBody.append("gitHub", gitHub);
        reqBody.append("website", website);
        reqBody.append("languages", languages);
        preview
          ? reqBody.append("projectImage", projectImage)
          : reqBody.append("projectImage", project.projectImage);
  
      

            const token = localStorage.getItem("token");
            if (preview) {
              var headerConfig = {
                "Content-Type": "multipart/form-data",
                " access_token": `Bearer ${token}`,
              };
            } else {
              var headerConfig = {
                "Content-Type": "application/json",
                " access_token":` Bearer ${token}`,
              };
            }
            //project id
            const proId = project._id;
               console.log(proId);

         
            const result=await updateProjectApi(reqBody,headerConfig,proId)
          if(result.status==200){
              alert(`${result.data.title} updated`)
              setEditUpdate(result.data)
              handleClose()
          }
          else{
              alert('update failed')
          }
          }
        };

        
      

  return (
    <>
   <span  onClick={handleShow}> <i class="fa-solid fa-pen-to-square m-1 border-end p-1 " style={{ color: 'rgb(35, 60, 115)'}} ></i></span>

   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details</Modal.Title>
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
                
                <img src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`}
                  
                 style={{height:'200px',width:'200px'}} alt=""  />
           
               </label>
                <p>Project overview</p>
                </Col>
                
                <Col lg={6}>
                <input 
                type="text" 
                className='border-0' 
                placeholder='Project Name' 
                name='title'
                value={projectInputs.title} 
                onChange={(e)=>setProjectInputs({...projectInputs,["title"]:e.target.value})}
                />
                <hr />
                <input 
                type="text" 
                className='border-0' 
                placeholder='Language Used' 
                name='languages' 
                value={projectInputs.languages}
                onChange={(e)=>setProjectInputs({...projectInputs,["languages"]:e.target.value})}
                />
                
                <hr />
                <input 
                type="text"
                 className='border-0'
                  placeholder='Github Link'
                   name='gitHub'
                   value={projectInputs.gitHub} 
                   onChange={(e)=>setProjectInputs({...projectInputs,["gitHub"]:e.target.value})}
                   />
                <hr />
                <input 
                type="text" 
                className='border-0'
                 placeholder='Website Link' 
                 name='website'
                 value={projectInputs.website}
                 onChange={(e)=>setProjectInputs({...projectInputs,["website"]:e.target.value})}
                  />
                
                </Col>
            </Row>
            <textarea 
            name="overView" 
            id="" cols="60" 
            rows="3"
            value={projectInputs.overView}
            onChange={(e)=>setProjectInputs({...projectInputs,["overView"]:e.target.value})}
            ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>handleUpdate(e)} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default UpdateProject