import React, { useContext, useState } from 'react'
import { Form, Button, Alert, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import {UserContext} from "../../context/UserContext"

import "./auth.css"

import { API, setAuthToken } from '../../config/api'

// console.log(setAuthToken.token)

export default function Login(props) {
    // console.log(props)
    let history = useHistory();
    // console.log(history)

    const [,dispatch] = useContext(UserContext)

    const [message, setMessage] = useState(null)

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { email, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        })
    }

    const handleLogin = async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const body = JSON.stringify(form);
            // console.log(body)

            const response = await API.post("/login", body, config)
            // const response = await API.post("/", body, config)
            console.log(response)
            
            // setAuthToken(localStorage.token)
            // console.log(response.data.data.token)
            setAuthToken(response.data.data.token)
            
            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS", 
                    payload: {...response.data.data, token: response.data.data.token}
                })
                
                if (response.data.data.listAs === "1") {
                    history.push("/listtransactions")
                } else {
                    history.push("/");
                    props.handleCloseLogin();
                }
                
                const alert = (
                    <Alert variant="success" className="py-1" >
                        Login Success
                    </Alert >
                )
                setMessage(alert)
            }
            
            
        } catch (error) {
            console.log(error.response)
            if(error){
                const alert = (
                    <Alert variant="danger" className="py-1">
                        {error.response.data.message}
                    </Alert>
                )
                setMessage(alert)
            }
            // console.log(error)
        }
    }

    return (
        <>
            <Modal show={props.showLogin} onHide={props.handleCloseLogin} aria-labelledby="contained-modal-title-vcenter" centered  className='rounded-0'>
                <Modal.Body className="login bg-dark text-light">
                    <Form onSubmit={handleLogin}>
                        {message && message}
                        <Form.Group className="d-flex justify-content-center my-4">
                            <h3 className= "title"> Login</h3>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control className="bg-dark text-light" name="email" type="email" placeholder="Enter email" value={email} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control className ="bg-dark text-light" name="password" type="password" placeholder="Password" value={password} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicPassword">
                            <Button className="text-light" variant="warning" type="submit" style={{width: "100%", backgroundColor: "#f15532"}}>Login
                            </Button>
                        </Form.Group>

                        <Form.Text className="d-flex justify-content-center text-muted align-items-center">
                            Don't have an account ? {"  "}
                                <span className=''>
                                <Button
                                    onClick={() => {
                                        props.handleShowRegister();
                                        props.handleCloseLogin();
                                    }}
                                    className="text-light p-0 m-0 border-0" variant="dark">
                                        Klik Here
                                    </Button>
                                </span>
                        </Form.Text>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
