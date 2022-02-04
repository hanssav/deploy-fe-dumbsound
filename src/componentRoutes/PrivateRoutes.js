import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function PrivateRoute({ component: Component, ...rest }) {
    const [state] = useContext(UserContext)
    // console.log(state)

    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    state.isLogin ? <Component {...props} /> : <Redirect to="/" />
                }
            />
        </>
    )
}

export default PrivateRoute