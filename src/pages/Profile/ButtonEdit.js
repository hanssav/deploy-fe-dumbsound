import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function ButtonEdit() {
    // console.log(props)
    let history = useHistory()
    return(
        <div>
            <Button
                variant="warning"
                className="text-light"
                onClick={() => history.push("/editprofile")}
                style={{backgroundColor: "#F58033"}}
            >
                Edit Profile
            </Button>
        </div>
    )
}
