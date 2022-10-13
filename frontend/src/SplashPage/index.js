import React, { useState } from "react";
import { useSelector } from "react-redux";
import './SplashPage.css'


const SplashPage = () => {
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser === null){
 
        return(
            <>
   
            </>
        )
    }
}

export default SplashPage;