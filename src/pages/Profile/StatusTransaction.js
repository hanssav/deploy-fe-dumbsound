import React from 'react';
import { Image } from 'react-bootstrap';

export default function StatusTransaction(props) {
    return (
        <div>
            <div className="d-flex flex-column mx-5 px-2 justify-content-end">
                <Image src={props.image} thumbnail style={{ width: "80px"}}
                    className='d-flex justify-content-center mx-auto mb-3'
                />
                <h6 className="mx-auto text-center">{props.message}</h6>
            </div>
        </div>

    )
}
