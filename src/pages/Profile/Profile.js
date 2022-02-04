import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import "./profile.css"

import { API } from '../../config/api';
import { UserContext } from '../../context/UserContext';


import NavBar from "../../component/Navbarr"
import StatusTransaction from './StatusTransaction';
import ButtonEdit from './ButtonEdit';
import ProfileImage from './ProfileImage';

import userProfileImageWoman from "../../public/images/userProfile.jpg"
import userProfileImageMan from "../../public/images/man.jpg" 
import CheckedIcon from "../../public/icons/checked.png"
import CloseIcon from "../../public/icons/close.png"

export default function Profile() {
    const [state] = useContext(UserContext)
    const [userProfile, setUserProfile] = useState([])

    console.log(state.user.gender)
    
    const getProfile = async () => {
        console.clear()
        const id = state.user.id
        try {
            const response = await API.get(`/getuser/${id}`)
            setUserProfile(response.data.data)
            // console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProfile();
    }, [])

    return (
        <div className ="profile-body p-0 m=0" style={{height: "97vh"}}>
        <NavBar />

        <container className="profile text-light mx-auto h-75 w-100">
            <Row className="title d-flex justify-content-between">
                <div>
                    <h2>Profile</h2>
                </div>
                <div>
                        <ButtonEdit />
                </div>
            </Row>
            <Row className="main mx-5 mt-5" style={{height: "500px"}}>
                <Col className="bg-dark ml-5 mr-3 py-3">
                    {/* <ProfileImage image={userProfileImage} name = {userProfile.fullName} /> */}
                    <div>
                        <h4 className="mb-3">Profile Details</h4>
                    </div>
                    <hr className="bg-light"></hr>
                    <div className = "d-flex flex-column justify-content-start">
                        {state.user.gender === "female" ? 
                            <ProfileImage 
                                image={userProfileImageWoman} 
                                fullName={userProfile.fullName} 
                            />
                            :
                            <ProfileImage 
                                image={userProfileImageMan} 
                                fullName={userProfile.fullName} 
                            />
                        }
                    </div>

                </Col>
                <Col md={6} className="bg-dark rounded py-3 mr-3">
                    <div>
                        <h4 className="mb-3">About Me</h4>
                    </div>
                    <hr className="bg-light"></hr>
                    <ul>
                        <li>
                            <h3 className='name mb-3'>
                                {userProfile.fullName}
                            </h3>
                        </li>
                        <li>
                            <h5>Email</h5>
                                <p>
                                    {userProfile.email}
                                </p>
                        </li>
                        <li>
                            <h5>Phone</h5>
                            <p>
                                {userProfile.phone}
                            </p>
                        </li>
                        <li>
                            <h5>Address</h5>
                            <p>
                                {userProfile.address} 
                            </p>
                        </li>
                    </ul>
                </Col>
                <Col md={3} className=" bg-dark rounded py-3 mr-5">
                    <div>
                        <h4 className="mb-3">Account Status</h4>
                    </div>
                    <hr className="bg-light"></hr>
                    
                     <div className="d-flex justify-content-center">
                        {state.user.payment.length <= 0 ? (
                            <StatusTransaction 
                                image={CloseIcon} 
                                message="Anda Belum Melakukan Regristrasi Account Premium"
                            />
                            ): (
                                state.user.payment[0].status === "pending" ? (
                                    <StatusTransaction 
                                        image={CloseIcon} 
                                        message="Pembayaran anda sudah di proses Mohon d tunggu"
                                    />
                                ) : state.user.payment[0].status === "cancel" ? (
                                    <StatusTransaction 
                                        image={CloseIcon} 
                                        message="Pembayaran anda Di Tolak Mohon cek kembali bukti transfer anda"
                                    />
                                ) : state.user.payment[0].status === "approved" ? (
                                    <StatusTransaction 
                                        image={CheckedIcon} 
                                        message="Acount Premium"
                                    />
                                ) : (
                                    <h1 className="text-light text-center"> Nah Bayar Lo</h1>
                                )
                        )}

                    </div>
                </Col>
            </Row>
        </container>
        </div>
    )
}