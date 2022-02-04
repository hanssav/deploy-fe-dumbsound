import React, {useContext, useEffect} from 'react';

import Home from "./pages/Home/Home";
import AddMusic from './pages/Music/AddMusic';
import AddArtist from './pages/Music/AddArtist';
import ListTransactions from './pages/transactions/ListTransactions';
import Pay from './pages/Pay/Pay';
import Profile from "./pages/Profile/Profile"
import EditProfile from './pages/Profile/EditProfile';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { useHistory } from 'react-router-dom'

import PrivateRoute from './componentRoutes/PrivateRoutes';
import { UserContext } from './context/UserContext';
import {API, setAuthToken} from "./config/api"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
    // console.clear()
    let history = useHistory();
    console.log(history)
    const [state, dispatch] = useContext(UserContext)
    console.log(state)
    
    useEffect(() => {
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }
    
        // Redirect Auth
        // if (state.isLogin === false) {
        //   history.push("/auth");
        // } else {
        //   if (state.user.status === "admin") {
        //     history.push("/product-admin");
        //   } else if (state.user.status === "customer") {
        //     history.push("/");
        //   }
        // }
      }, [state]);
      // console.log(state.user.payment)
    
    const checkUser = async () => {
        // console.clear()
        try {
            const response = await API.get('/check-auth')
            console.log(response.data.data)

            if (response.status === 404) {
                return dispatch({
                    type: "AUTH_ERROR"
                })
            }
            let payload = response.data.data
            payload.token = localStorage.token

            dispatch({
                type: "USER_SUCCESS",
                payload
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkUser(); 
        return checkUser()
    }, [])

    return (
        <Router>
            <Switch>
                { (state.isLogin) ?
                    <>
                    {
                        (state.user.listAs === "1") &&
                        <>
                            <Route exact path="/listtransactions" component={ListTransactions} />
                            <PrivateRoute exact path="/addmusic" component={AddMusic} />
                            <PrivateRoute exact path="/addartis" component={AddArtist} />
                        </>
                    }
                        <Route exact path="/" component={Home} />
                        <PrivateRoute exact path="/pay" component={Pay} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/editprofile" component={EditProfile} />
                    </>
                :
                <>
                        <Route exact path="/*" component={ Home } />
                    </>
                }
            </Switch>
        </Router>
  );
}

export default App;
