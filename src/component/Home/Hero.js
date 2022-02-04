import React from 'react'
import { Carousel } from 'react-bootstrap'
import HeroImage from "../../public/images/hero.png"
import "../../pages/Home/home.css"
import Navbar from '../Navbarr'

export default function Hero() {
    return (
        <Carousel indicators={false} controls={false}>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={HeroImage}
                alt="First slide"
                />
                <Carousel.Caption className='m-0 p-0'>
                    {/* Navbar In Hire */}
                    <Navbar />
                    <div className='captionCarousel'>
                        <div className="align-item-center my-auto">
                            <h1 className="">Connect on DumbSound</h1>
                            <p>Discovery, Stream, and share a constantly expanding mix of music from emerging and major artists around the world</p>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    )
}
