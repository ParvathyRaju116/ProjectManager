import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../Service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







function Auth({ register }) {

    // state to check validation

    const [unameValid, setUnameValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [pawValid, setPswValid] = useState(false)


    // REGISTER

    // state to store data from the inputs
    const [user, setUser] = useState({
        userName: "", email: "", password: ""
    })

    const navigate = useNavigate()

    const setInputs = (e) => {
        const { name, value } = e.target
        if(name=='userName'){
           if(value.match(/^[a-zA-Z ]+$/)){
                setUnameValid(false)
                // setUser({ ...user, [name]: value })

           }
           else{
            setUnameValid(true)
           }
        }

        if(name=='email'){
            if(value.match(/^[\w-]+(\. [\w-]+)*@([\w-]+\.)+[ a-zA-Z]{2,7}$/)){
                 setEmailValid(false)
                //  setUser({ ...user, [name]: value })
 
            }
            else{
             setEmailValid(true)
            }

    }
    if(name=='password'){
        if(value.match(/^[0-9a-zA-Z@]{3,8}$/)){
             setPswValid(false)

        }
        else{
         setPswValid(true)
        }
     }
     setUser({ ...user, [name]: value })

}

    console.log(user);

    const handleRegister = async (e) => {
        e.preventDefault()
        const { userName, email, password } = user
        if (!userName || !email || !password) {
            toast.error('Please fill all data', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            const result = await registerApi(user)
            //    console.log(result);
            if (result.status === 200) {
                toast.success(`${result.data.userName} Your Account Created Successfully`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setUser({ userName: "", email: "", password: "" })
                navigate('/login')
            }
            else {
                // alert(result.response.data)
                toast.error(result.response.data, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        }
    }
    // _________________________________________________________________________________________________________________

    // LOGIN

    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = user
        if (!email || !password) {
            toast.error('Please fill all data', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            const result = await loginApi(user)
            //    console.log(result);
            if (result.status === 200) {
                // token
                // console.log(result.data.token);
                localStorage.setItem("token",result.data.token)
                // store user datas in local storage
                localStorage.setItem("currentUser",JSON.stringify(result.data.user));
                localStorage.setItem("currentId",result.data.user._id);
                toast.success(`login success`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setUser({ userName: "", email: "", password: "" })
                navigate('/')
            }
            else {
                // alert(result.response.data)
                toast.error(result.response.data, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        }
    }



    const isRegister = register ? true : false

    return (
        <div>
            <div className='m-5'>
                <Row>
                    <Col lg={6}>
                        <Container>
                            <img style={{ height: '400px' }} src={isRegister ? 'https://i.postimg.cc/jdTsBNBs/360-F-386510351-03-Qk3je4-FGn-VLo4v-XRd-Opo-DWf-Zjtmajd.jpg' : 'https://i.postimg.cc/L8ZZvjPm/hero.png'} alt="" />
                        </Container>
                    </Col>

                    <Col lg={6} className='mt-5'>

                        <h1>
                            {
                                isRegister ? 'Sign Up' : 'Sign in'
                            }
                        </h1>
                        <p className='mt-3 mb-4'>
                            {
                                isRegister ? 'Sign Up to your Account' : 'Sign in to Your Account'
                            }
                        </p>
                        <Form>
                            {
                                isRegister &&
                                <>
                                    <Form.Control
                                        placeholder="Username"
                                        type='text'
                                        className='border-0 border-bottom '
                                        onChange={(e) => setInputs(e)}
                                        name="userName"
                                        value={user.userName}
                                    />
                                    {
                                        unameValid &&
                                        <p className='text-danger'>Include characters only</p>
                                    }
                                </>
                            }

                            <Form.Control
                                placeholder="Enter Your Email"
                                type='mail'
                                className='border-0 border-bottom mt-3'
                                onChange={(e) => setInputs(e)}
                                name="email"
                                value={user.email}
                            />
                           {emailValid&& <p className='text-danger'>Enter a valid email address</p>}

                            <Form.Control
                                placeholder="Enter Password"
                                type='password'
                                className='border-0 border-bottom mt-3 '
                                onChange={(e) => setInputs(e)}
                                name="password"
                                value={user.password}
                            />
                           {pawValid && <p className='text-danger'>invalid password</p>}


                        </Form>
                        <div>
                            {
                                isRegister ? <Button className='btn mt-3 ' onClick={(e) => handleRegister(e)}>Register</Button>
                                    : <Button className='btn mt-3 ' onClick={(e) => handleLogin(e)}>Login</Button>
                            }
                        </div>
                        <div>
                            {
                                isRegister ? <p className='mt-2'>Already have account? <Link to={'/login'}>Login</Link></p>
                                    : <p className='mt-3'>New User? <Link to={'/register'}>Register Here</Link></p>

                            }
                        </div>
                    </Col>

                </Row>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Auth