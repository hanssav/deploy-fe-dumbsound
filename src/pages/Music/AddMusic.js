import React, {useEffect, useState} from 'react'

import { Form, Button, Container, Col, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { API } from '../../config/api'

import Atthace from "../../public/icons/atthace.png"
import Navbar from '../../component/Navbarr'

export default function AddMusic() {
    console.clear();

    // const title = "Music Admin"
    // document.title = "Music Apps | " + title

    let history = useHistory()

    const [artis, setArtis] = useState([])
    const [preview, setPreview] = useState(null)

    let [form, setForm] = useState({
        title: "",
        year: "",
        image: "",
        music: "",
        artisId: ""
    })

    const getArtis = async () => {
        try {
            const response = await API.get("/getartists")
            setArtis(response.data.artists)
            // console.log(response.data.artists)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async (e) => {
        setForm({
            ...form,
             [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                "Content-type": "multipart/form-data"
                }
            }
            const formData = new FormData()

            formData.set("image", form.image[0], form.image[0].name);
            formData.set("music", form.music[0], form.music[0].name);
            formData.set('title', form.title);
            formData.set("year", form.year);
            formData.set("artisId", form.artisId);

            console.log(form.image[0])
            console.log(form.music[0])

            const response = await API.post("/addmusic", formData, config)
            console.log(response.data)

            history.push("/listtransactions")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getArtis()
    }, [])

    return (
        <>
            <Navbar />
            <Container className="mt-5 addMusic">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="my-5" style={{color: "White", marginTop: "50px"}}>
                        <h3 className="title">Add Music</h3>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between mb-3">
                        <Col xs={10} className="" style={{paddingLeft: 0}}>
                            <Form.Group className="" controlId="formBasicText">
                                <Form.Control  type="text" placeholder="Title" className='bg-dark text-light' name="title" onChange={handleChange}/>
                            </Form.Group>
                        </Col>

                        <Col xs={2} style={{padding: 0}}>
                            <Form.Group className="" controlId="image">
                                <label disabled htmlFor="uploadImg" className="form-control bg-dark text-light d-flex justify-content-between">
                                    <p>Attache Thumbnail</p>
                                    <img src={Atthace} alt="atc" className="ml-3 mb-0" />
                                </label>
                                <input type="file" id="uploadImg" name="image" hidden onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Form.Group>


                    <Form.Group className="mt-4 mb-3" controlId="formBasicText">
                        <Form.Control className='bg-dark text-light' name ="year" type="number" placeholder="Year" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Select onChange={handleChange} className="bg-dark text-light py-2 my-2 w-100 rounded border-light mb-3" aria-label="Default select example" name="artisId">
                        <option value="">Singer</option>
                        {artis.map((artisData) => {
                            console.log(artisData.id)
                            return (
                                <>
                                    < option className="bg-dark" key={artisData.id} value={artisData.id} > {artisData.name}</option>
                                </>
                            )
                        })}
                    </Form.Select>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <label disabled htmlFor="uploadMsc" className="form-control form-file bg-dark text-light">
                        Attache
                        </label>
                        <input class="musicUpload" type="file" id="uploadMsc" name="music" hidden onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicPassword">
                        <Button className="button" variant="warning" type="submit">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}
