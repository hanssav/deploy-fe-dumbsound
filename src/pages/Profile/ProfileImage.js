import React from 'react';
import { Image } from 'react-bootstrap';
import "./profile.css"

export default function ProfileImage(props) {
    return (
        <>
            <div className='mx-auto'>
                <Image src={props.image} roundedCircle thumbnail
                    style={{ width: "180px" }}
                    className='mb-3'
                />
            </div>

            <div>
                <h3 className='text-center'>
                    {props.fullName}
                    </h3>
            </div>
        </>
  )
}
