import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
// import { Navbar } from 'react-bootstrap';
import Navbar from '../../component/Navbarr';
import { UserContext } from '../../context/UserContext';

import {API} from "../../config/api"
import { useHistory } from 'react-router-dom';

export default function EditProfile() {
    let history = useHistory()
    const [state] = useContext(UserContext)

    const [form, setForm] = useState({
        email: "",
        fullName: "",
        phone: "",
        address: ""
    })

    const { email, fullName, phone, address } = form

    const getUser = () => {
        setForm({
            email: state.user.email,
            fullName: state.user.fullName,
            phone: state.user.phone,
            address: state.user.address
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const id = state.user.id

            console.log(state)

            setForm({
                email: state.user.email
            })

            const config = {
                headers: {
                    "Content-type" : "application/json"
                }
            }

            const body = JSON.stringify(form);

            console.log(body)

            // const response = await API.patch(``, body, config)
            const response = await API.patch(`/updateuser/${id}`, body, config)

            console.log(response)

            history.push("/profile")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />
            <Container className="edit-profile">
                <Form
                    onSubmit={handleSubmit}
                >
                    {/* {message && message} */}
                    <Form.Group className="my-5" style={{ color: "White", marginTop: "50px" }}>
                        <h3 className=''>Edit Profile</h3>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Control className='bg-dark text-light' name="email" type="email" placeholder="email"
                            value={form.email}
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Control className='bg-dark text-light' name="fullName" type="text" placeholder="full name"
                            value={form.fullName}
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Control className='bg-dark text-light' name="phone" type="number" placeholder="number phone"
                            value={form.phone}
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Control
                            onChange={handleChange}
                            value={form.address}
                            className="bg-dark text-light" name="address" type="text" placeholder="Address"
                            as="textarea"
                            style={{ resize: "none", height: "100px" }}
                        />

                    </Form.Group>

                    <Form.Group className="mt-3 d-flex justify-content-center" controlId="formBasicPassword">
                        <Button className="text-light" variant="warning" type="submit"
                        style={{backgroundColor: "#F58033"}}
                        >
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
  )
}