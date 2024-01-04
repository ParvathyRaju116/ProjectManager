import React, { useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getProfileApi, updateProfile } from '../Service/allApi';
import { BASE_URL } from '../Service/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Profile({userName}) {
    const [show, setShow] = useState(false);
    const [token, setToken] = useState()
    const [preview, setPreview] = useState("")
    const [existingImage, setExistingImage] = useState("")
    const [update, setUpdate] = useState("")

    const [profile, setProfile] = useState({
        user: "",
        image: "",
        gitHub: "",
        linkedIn: ""
    })

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true)


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("currentUser"))
        // console.log(userData);
      if(userData)
       { setProfile({ ...profile, user: userData?.userName, image: "", gitHub: userData?.gitHub, linkedIn: userData?.linkedIn })
        setExistingImage(userData?.profile)}
    }, [update])



    useEffect(() => {
        if (profile.image) {
            setPreview(URL.createObjectURL(profile.image));
        }
        else {
            setPreview("")
        }
    }, [profile.image])



    useEffect(() => {

        // store token in a state
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }

    }, [])

    // console.log(token);


    const setData = (e) => {
        const { value, name } = e.target
        setProfile({ ...profile, [name]: value })
    }

    // console.log(profile);
    // console.log(preview);


    // ________________________________________________________________________________________

        // function for update the profile
        const handleUpdate = async (e) => {
            e.preventDefault()
            const { user, image, gitHub, linkedIn } = profile
    
            //  id
            if (localStorage.getItem("currentId")) {
                const id = localStorage.getItem("currentId")
                // console.log(id);
    
                // header
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "access_token": `Bearer ${token}`
                }
                // console.log(reqHeader);
    
                // body
                const reqBody = new FormData()
                reqBody.append("userName", user)
                reqBody.append("profile", image ? image : existingImage)
                reqBody.append("gitHub", gitHub)
                reqBody.append("linkedIn", linkedIn)
    
                // console.log(reqBody);
                const response = await updateProfile(reqBody, reqHeader, id)
                // console.log(response);
    
                if (response.status == 200) {
                    toast.success('Updated successfully!!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // update new username in localstorage
                    localStorage.setItem("currentUser", JSON.stringify(response.data))
                    setUpdate(response.data)
                    handleClose()
                }
                else {
                    alert("Profile update failed");
                }
    
            }
            handleClose()
        }
    
    

    // ________________________________________________________________________________________



    return (
        <div>
            <div style={{ border: '1px solid rgb(35, 60, 115) ' }} className='m-4 text-center'>
                <Container>
                    <div className='mt-3'>
                        <Row>
                            <div lg={1} ><div className='text-end w-100'><img style={{ height: '20px', width: '20px' }} src="https://i.postimg.cc/FzFz66pD/Eo-circle-green-white-checkmark-svg-removebg-preview.png" alt="" /></div></div>

                            <div lg={11} style={{ fontSize: '40px' }} className='text-center'>My Profile </div>
                        </Row>
                    </div>


                    <div className='text-center' >
                        {existingImage != "" ?
                            <img
                                style={{ height: '180px', width: '200px', borderRadius: '50%' }}
                                src={`${BASE_URL}/uploads/${existingImage} `} />
                            :
                            <img
                                style={{ height: '180px', width: '200px', borderRadius: '50%' }}
                                src={profile?.updatedImg ? `${BASE_URL}/uploads/${profile?.updatedImg}`
                                    : "https://i.postimg.cc/NG2LrSyL/images-removebg-preview.png"} alt="" />
                        }

                    </div>

                    <div className='mt-3'>
                        <p style={{ textTransform: 'capitalize' }}><b>UserName :</b> {profile.user}</p>
                        <hr />
                        <p><b>Github:</b> {profile?.gitHub}</p>
                        <hr />
                        <p><b>LinkedIn:</b> {profile?.linkedIn}</p>
                        <hr />
                    </div>
                </Container>
                <div className='text-end'> <Button onClick={handleShow} className='m-3'><i class="fa-solid fa-pen-to-square"></i></Button></div>
            </div>


            {/* modal for edit profile */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ border: '1px solid rgb(35, 60, 115) ' }} className='m-4 text-center'>

                        <div className='text-center'>
                            <Row>
                                <Col><h4 className='mt-4 text-center'> <div className='text-center'><h2>My Profile</h2></div> </h4></Col>
                                <Col className='me-auto '><i class="fa-solid fa-check mt-4"></i></Col>
                            </Row>
                        </div>


                        <label htmlFor="img2">
                            {
                                existingImage!=""?
                                <img 
                                src=
                                {preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="" />
                                :
                                <img
                                    style={{ height: '180px', width: '200px', borderRadius: '50%' }}
                                    src={
                                        preview
                                            ? preview
                                                : "https://i.postimg.cc/NG2LrSyL/images-removebg-preview.png"}
                                    alt="" />
                            }
                        </label>
                        <input placeholder='choose file' type="file" id='img2' style={{ display: 'none' }}
                            onChange={(e) => setProfile({ ...profile, ["image"]: e.target.files[0] })} />



                        <div className='text-center'>
                            <Form.Group as={Col} md="4" controlId="validationCustom02" className=' w-100 m-3'>

                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="UserName"
                                    className='w-75 m-2 border-0 border-bottom'
                                    value={profile.user}
                                    name='user'
                                    onChange={(e) => setData(e)}

                                />

                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="GitHub"
                                    name='gitHub'
                                    value={profile?.gitHub}
                                    className='m-2 w-75 border-0 border-bottom'
                                    onChange={(e) => setData(e)}

                                />


                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Linkedin"
                                    className='m-2 w-75 border-0 '
                                    name='linkedIn'
                                    value={profile?.linkedIn}
                                    onChange={(e) => setData(e)}

                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default Profile