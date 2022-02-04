import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown, Container, Image, Button, Dropdown} from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext';

import Logo from "../public/images/logo.png"
import TextLogo from "../public/images/textlogo.png"
import UserIcon from "../public/icons/imageUser.png"
import AdminIcon from "../public/icons/imageAdmin.png"
import PayIcon from "../public/icons/payIcon.png"
import MusicIcon from "../public/icons/musicIcons.png"
import LogoutIcon from "../public/icons/logoutIcon.png"
import ArtisIcon from "../public/icons/artisIcon.png"
import Polygon from "../public/icons/Polygon.png"

import "./navbar.css"
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

function UserNav() {
    const [, dispatch] = useContext(UserContext)
    let history = useHistory();

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });
        history.push('/')
    }

    return (
        <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown id="dropdown-menu-align-start "
                        className='navDrop'
                        title={
                            <Image className='iconImage mb-3' src={UserIcon} roundedCircle style={{ width: '40px', height: '40px' }
                        } />}
                    >

                        <Image src={Polygon} alt="ico" className="position-absolute" style={{ top: "-20px", right: "75%", width: "30px" }}/>

                        <NavDropdown.Item>
                            <Link to="/profile" onClick={""} className='d-flex align-items-center'>
                                <Image className='iconImage' src={ArtisIcon} thumbnail />
                                <h6 className='textLink'>Profile</h6>
                            </Link>
                        </NavDropdown.Item>

                        <NavDropdown.Item>
                            <Link to="/pay" onClick={""} className='d-flex align-items-center'>
                                <Image className='iconImage' src={PayIcon} thumbnail />
                                <h6 className='textLink'>Pay</h6>
                            </Link>
                        </NavDropdown.Item>

                        <NavDropdown.Divider />

                        <NavDropdown.Item>
                            <Link to="/" onClick={handleLogout} className='d-flex align-items-center'>
                                <Image className='iconImage' src={LogoutIcon} thumbnail />
                                <h6 className='textLink'>Logout</h6>
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </div>
    )
}

function AdminNav() {
    const [, dispatch] = useContext(UserContext)
    let history = useHistory()

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });
        history.push('/')
    }

    return (
        <div className='navGrid d-flex justify-content-end'>
            <NavDropdown className= "navDrop" align="end" id="dropdown-menu-align-end"
                title={
                    <Image className='iconImage mb-3' src={AdminIcon} roundedCircle style={{ width: '40px', height: '40px' }
                    } width="50px" height="50px" />}
            >
                <Image src={Polygon} alt="ico" className="position-absolute" style={{ top: "-20px", right: "72%", width: "30px" }}/>
                <Dropdown.Item>
                    <Link to="/addmusic"
                        onClick={""}
                        className='d-flex align-items-center'>
                        <Image className="iconImage" src={MusicIcon} thumbnail />
                        <h6 className="textLink">Add Music</h6>
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/addartis" onClick={""} className='d-flex align-items-center'>
                        <Image className="iconImage" src={ArtisIcon} thumbnail />
                         <h6 className="textLink">Add Artis</h6>
                     </Link>
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item>
                    <Link to="/" onClick={handleLogout} className='d-flex align-items-center'>
                        <Image className="iconImage" src={LogoutIcon} thumbnail />
                        <h6 className="textLink"> Logout</h6>
                    </Link>
                </Dropdown.Item>
            </NavDropdown>
        </div>
    )
}

function GuestPage() {

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const loginModalProps = {
        showLogin,
        handleCloseLogin,
        handleShowRegister,
    };
    const registerModalProps = {
        showRegister,
        handleCloseRegister,
        handleShowLogin,
    };
    return (
        <>
            <div>
                <Button className="mr-3" variant="outline-light" onClick={handleShowLogin}>Login</Button>
                <Button variant="warning" style={{color: "white", backgroundColor:"#EE4622", border: "#EE4622"}} onClick={handleShowRegister}>Register</Button>

                <Login {...loginModalProps} />
                <Register {...registerModalProps}/>
            </div>
        </>
    )
}

function Navbarr() {
    const [state] = useContext(UserContext)
    // let history = useHistory()

    return (
        <>
            <Navbar expand="lg my-3 mx-3">
                <Container fluid className="d-flex justify-content-between mx-5" style={{}}>
                    <div>
                        <Link to={state.isLogin ? (state.user.listAs === "1" ? "/listtransactions" : "/") : "/"} className='logo'>
                            <Navbar.Brand style={{ color: "white" }} href="#home">
                                <Image src={Logo} thumbnail style={{ height: '30px' }} />
                                <Image src={TextLogo} thumbnail style={{ height: '30px'}} />
                            </Navbar.Brand>
                        </Link>
                    </div>

                    <div className='mr-4'>
                        {!state.isLogin ? (
                            // <AdminNav />
                            // <UserNav />
                            <GuestPage />
                        ) : (
                            state.user.listAs === "1" ? (
                                <AdminNav />
                            ) : (
                                <UserNav />
                            )
                        )}
                    </div>
                </Container>
            </Navbar>

        </>
    )
}

export default Navbarr