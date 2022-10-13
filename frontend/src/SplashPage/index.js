import React, { useState } from "react";
import { useSelector } from "react-redux";
import './SplashPage.css'


const SplashPage = () => {
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser === null){
        return(
            <>
                <div className="splash-container">
                    <h1>Splash</h1>
                </div>
            </>
        )
    }
}

export default SplashPage;