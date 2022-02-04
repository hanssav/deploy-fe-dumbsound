import React, {useEffect, useState, useContext} from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import Hero from '../../component/Home/Hero'
import Card from '../../component/Home/CardHome'
import "./home.css"
import MusicPlayer from '../../component/Home/MusicPlayer'

import { API, setAuthToken } from "../../config/api"
import { UserContext } from '../../context/UserContext'

import Login from '../auth/Login'
import Register from '../auth/Register'

// import axios from 'axios'

export default function Home() {
    const [music, setMusic] = useState([])

    const [state, dispatch] = useContext(UserContext);
    const [selectedMusic, setSelectedMusic] = useState(0);

    console.log(state)
    let history = useHistory()
    
    const checkUser = async () => {
        // console.clear()
        try {
            const response = await API.get('/check-auth')
            console.log(response.data.data)

            let payload = response.data.data
            payload.token = localStorage.token
            
            if (state.user.listAs === "0") {
                dispatch({
                    type: "USER_SUCCESS",
                    payload
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkUser(); 
        return
    }, [])

    const getMusic = async () => {
        console.clear();
        try {
            const response = await API.get("/getmusics")
            // console.log(response.data.data)
            setMusic(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }
        getMusic()
        checkUser()
    }, [])

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const registerModalProps = {
        showRegister,
        handleCloseRegister,
        handleShowLogin,
    };

    const loginModalProps = {
        showLogin,
        handleCloseLogin,
        handleShowRegister,
    };
    const selectMusic = (index) => {
        // console.log(index)
        if (!state.isLogin) {
            handleShowLogin();
        } else if (state.user.listAs === "1") {
            setSelectedMusic(index);
        } else {
            if (state.user.payment.length <= 0 || state.user.payment[0].status === "pending" || state.user.payment[0].status === "cancel") {
                history.push("/pay")
            } else if (state.user.payment[0].status === "approved") {
                setSelectedMusic(index);
            } else {
                history.push('/pay')
            }
        }
    };
    
    return (
        <Container fluid className='home'>
            <div className='bgImageHero'>
                {/* Navbar in component Hero */}
                <Hero className="heroHome" />
            </div>

            <div className='my-5 listMusic'>
                <Row className='mb-5 d-flex justify-content-center m-0'>
                    <h2 style={{ color: "#EE4622" }}>Dengarkan dan Rasakan</h2>
                </Row>

                <Row className='cardMusic mx-5 m-0'>

                    {music.map((a, i) => {
                        // console.log(music)
                            return (
                                <Col onClick={() => selectMusic(i)} className="d-flex justify-content-center mb-4"
                                    style={{
                                        // width: "12rem",
                                        cursor: "pointer"
                                    }}>
                                    <Card
                                        key={a.id}
                                        id={a.id}
                                        image={a.thumbnail}
                                        title={a.title}
                                        year={a.year}
                                        artis={a.artis.name}
                                    />
                                </Col>
                            )
                        })}
                </Row>

                {!state.isLogin ? (
                    <div></div>
                ) : ( 
                        state.user.listAs === "0" ? (
                            state.user.payment <= 0 ? (
                                <div></div>
                            ) : (
                                state.user.payment[0].status === "approved" ? (
                                    <MusicPlayer musics={music} selectedMusicIndex={selectedMusic} />
                                ) : (
                                    <div></div>
                                )
                            )            
                        ) : (
                            <MusicPlayer musics={music} selectedMusicIndex={selectedMusic} />
                        )
                    )    
                }
                        

            </div>
            <Login {...loginModalProps} />
            <Register {...registerModalProps} />
        </Container>
    )
}
