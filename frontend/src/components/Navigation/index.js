import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import * as sessionActions from "../../store/session";

const Navigation = () => {
    
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(sessionActions.logout(sessionUser.id))
        return (<Redirect to="/" />);
    }

    if (sessionUser){
        return (
            <>
                <h1>Hello, {sessionUser.displayName}.</h1>
                <h1> {sessionUser.email}</h1>
                <h1>Top Questions<button>Ask Question</button></h1>
                <br/>
                <button onClick={handleLogOut}>Logout</button>
            </>
        )
    } 
    
}

export default Navigation;