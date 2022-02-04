import React, {useState, useContext} from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import Navbar from '../../component/Navbarr'
import "./music.css"

import { API } from "../../config/api"
import { UserContext } from '../../context/UserContext'
import { useHistory } from 'react-router-dom'

export default function AddArtist() {
    let history = useHistory()
    const [state] = useContext(UserContext)
    console.log(state.user.token)

    const title = "Add Artis";
    document.title = "Music Apps | " + title

    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        name: "",
        old: "",
        type: "",
        startCareer: "",
    })

    const { name, old, type, startCareer } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                    // 'Accept' : 'application/json',
                }
            }

            const body = JSON.stringify(form)
            console.log(body)

            if (body.name === "" || body.old === "" || body.type === "" || body.startCareer === "") {
                const alert = (
                    <Alert variant="success" className="py-1">
                        Please Fullfill field
                    </Alert>
                );
                setMessage(alert)
            }

            const response = await API.post("/addartis", body, config)
            console.log(response.data.data)

             if (response.data.status === "success") {
                const alert = (
                    <Alert variant="success" className="py-1">
                        Success
                    </Alert>
                );
                setMessage(alert);

                history.push("/listtransactions")

            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        Failed
                    </Alert>
                );
                setMessage(alert);
            }

        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    }


    return (
        <div className='addArtis'>
            <Navbar />
            <Container className="mt-5">
                <Form onSubmit={handleSubmit}>
                    {message && message}
                    <Form.Group className="my-5" style={{ color: "White", marginTop: "50px" }}>
                        <h3 className='title'>Add Artist</h3>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Control className='bg-dark text-light' name="name" type="text" placeholder="Name" onChange={handleChange} value={ name }/>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Control className='bg-dark text-light' name ="old" type="text" placeholder="Old" onChange={ handleChange } value={ old }/>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Control className='bg-dark text-light' name="type" type="text" placeholder="Solo" onChange={ handleChange } value={ type }/>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Control className='bg-dark text-light' name="startCareer" type="text" placeholder="Start a Career" onChange={ handleChange } value={ startCareer }/>
                    </Form.Group>

                    <Form.Group className="mt-3 d-flex justify-content-center" controlId="formBasicPassword">
                        <Button className="button" type="submit">
                            Add Artist
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}
