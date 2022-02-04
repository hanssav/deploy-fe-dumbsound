import React, { useState, useContext, useEffect} from 'react'

import { Container, Form, Button, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { API } from "../../config/api"

import Navbar from '../../component/Navbarr'
import "./pay.css"
import { UserContext } from '../../context/UserContext'
import Atthace from "../../public/icons/atthace.png"
import SubscribeImage from "../../public/images/subscribe.svg"
import NotSubscribeImage from "../../public/images/payment.svg"


export default function Pay() {
    // console.clear()
    const [state, dispatch] = useContext(UserContext)
    const [paymentsStatus, setPaymentsStatus] = useState([])

    const title = "Payment"
    document.title = "Music Apps " + title

    let history = useHistory()

    let [form, setForm] = useState({
        userId: "",
        image: "",
        accountNumber: "",

    })

    const handleChange = async (e) => {
        setForm({
            ...form,
             [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })
    }
     const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const config = {
                Headers: {
                  "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData()
            formData.set("userId", state.user.id)
            formData.set("image", form.image[0], form.image[0].name)
            formData.set("accountNumber", form.accountNumber)

            // console.log(form)
            // console.log(form.image[0])
            // console.log(form.image[0].name)

            const response = await API.post('/addpayment', formData, config)
            history.push("/")
            console.log("response ", response.data.payment)
            
            setPaymentsStatus(response.data.payment.status)
            // setLoading(false)
        } catch (error) {
            // setLoading(false)
            console.log(error.message)
        }
    }

    return (
        <div className="main-pay">
            <Navbar />
            
            {state.user.payment.length <= 0 ? (
                <Container className="my-5 pay d-flex flex-column align-items-center">
                    <div className="text-center mb-5" style={{ color: "white" }}>
                        <h2 className="font-weight-bold py-4">Premium</h2>
                        <p className="font-weight-normal">Bayar sekarang dan nikmati streaming music yang kekinian dari
                            <span className='font-weight-bold'>
                                <span classsName="text-danger"> DUMB</span>SOUND
                            </span>
                        </p>
                        <h4 className="font-weight-bold"><span className="text-danger"> DUMB</span>SOUND : 0981312323</h4>
                    </div>

                    <div className='d-flex flex-column col-4'>
                        <Form className="align-items-center" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Control className="bg-dark text-light" type="number" placeholder="Input Your Account Member" onChange={handleChange} name="accountNumber"/>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="image">
                                {/* <Form.Control className="bg-dark text-light" name="image" type="file" placeholder="Attache Thumbnail" onChange={handleChange}/> */}
                                <label disabled htmlFor="uploadImg" className="form-control bg-dark d-flex justify-content-between">
                                    <p className= 'text-light'>Attache Thumbnail</p>
                                    <img src={Atthace} alt="atc" className="ml-5 mb-0" />
                                </label>
                                <input type="file" id="uploadImg" name="image" hidden onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="d-flex justify-content-center">
                                <Button className="" variant="warning" type="submit" style={{width: "100%", backgroundColor: "#F58033"}}>
                                    Send
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </Container>
            ): (
                    state.user.payment[0].status === "pending" ? (
                    <div className="d-flex flex-column">
                        <h1 className="text-light text-center mb-5 align-items-center">Pembayaran anda sedang di proses Mohon d tunggu</h1>
                        <Image className="justify-content-center align-items-center" src={NotSubscribeImage} style={{height: "400px"}}/>
                    </div>
                ) : state.user.payment[0].status === "cancel" ? (
                    <div className="d-flex flex-column">
                        <h1 className="text-light text-center mb-5 align-items-center"> Pembayaran Anda di Tolak, <br></br>Mohon cek kembali Pembayaran Anda</h1>
                        <Image className="justify-content-center align-items-center" src={NotSubscribeImage} style={{height: "400px"}}/>
                    </div>
                ) : state.user.payment[0].status === "approved" ? (
                    <div className="d-flex flex-column">
                        <h1 className="text-light text-center mb-5 align-items-center">Anda Sudah berlangganan</h1>
                        <Image className="justify-content-center align-items-center" src={SubscribeImage} style={{height: "400px"}}/>
                    </div>
                ) : (
                    <h1 className="text-light text-center"> Nah Bayar Lo</h1>
                )
            )}            
        </div>
    )
}
