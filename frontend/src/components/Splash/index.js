import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import QuestionIndex from "../QuestionIndexComponent";
import './index.css'
import {SiRedux,SiPostgresql, SiReact} from "react-icons/si"
import {DiRuby, DiReact} from "react-icons/di";
import Footer from "../Footer";

const SplashPage = () => {

    const sessionUser = useSelector(state => state.session.user)

    useEffect (() => {
        const jobs = ["developer", "data scientist", "system admin", "mobile developer", "game developer"];
        const animationContainer = document.querySelector(".animation-container span");
        let i = 1;
        setInterval( () => {
            if (i >= jobs.length){
                i = 1;
            }
            if (animationContainer){
                animationContainer.innerHTML = jobs[i];
                animationContainer.classList.add("animation");
                i++;
            }
        }, 2000);
    });

    if (sessionUser === null){
        return(
            <>
                <div id="container">
                    <div id="black-box">
                        <div id="speech-bubble-container">
                            <div className="speech-bubble">
                                <div id="left-content">
                                    <svg aria-hidden="true" className="glass-lock" width="48" height="48" viewBox="0 0 48 48"><path opacity=".2" d="M29.22 38.1a3.4 3.4 0 0 1 4.81-4.82l8.81 8.81a3.4 3.4 0 0 1-4.81 4.81l-8.81-8.8Z" fill="#fdcdab"></path><path d="M18.5 5a1 1 0 1 0 0 2c.63 0 1.24.05 1.84.15a1 1 0 0 0 .32-1.98A13.6 13.6 0 0 0 18.5 5Zm7.02 1.97a1 1 0 1 0-1.04 1.7 11.5 11.5 0 0 1 5.44 8.45 1 1 0 0 0 1.98-.24 13.5 13.5 0 0 0-6.38-9.91ZM18.5 0a18.5 18.5 0 1 0 10.76 33.55c.16.57.46 1.12.9 1.57L40 44.94A3.5 3.5 0 1 0 44.94 40l-9.82-9.82c-.45-.45-1-.75-1.57-.9A18.5 18.5 0 0 0 18.5 0ZM2 18.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0Zm29.58 15.2a1.5 1.5 0 1 1 2.12-2.12l9.83 9.83a1.5 1.5 0 1 1-2.12 2.12l-9.83-9.83Z" fill="#f2740e"></path></svg>
                                    <h1 className="speech-h1">Find the best answer to your technical question, help others</h1>
                                    <Link to="/signup">
                                    <button id="join-community-button">Join the community</button>
                                    </Link>
                                    <div id="search-content">
                                        or <span><Link to="/questions/"> search content</Link></span>
                                    </div>
                                    <div className="speech-bubble-right-corner"></div>
                                </div>
                            </div>
                            <div className="speech-bubble">
                                <div id="right-content">
                                    <svg aria-hidden="true" className="glass-lock" width="48" height="48" viewBox="0 0 48 48"><path opacity=".2" d="M12 22a2 2 0 0 0-2 2v19a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V26a4 4 0 0 0-4-4H12Zm6 7a5 5 0 1 1 7.67 4.23l.05.35c.15.84.36 1.8.61 2.86A2.06 2.06 0 0 1 24.35 39h-2.7a2.06 2.06 0 0 1-1.98-2.56c.29-1.2.52-2.3.66-3.2l-.19-.14A5 5 0 0 1 18 29Z" fill="#acd8ff"></path><path d="M23 24a5 5 0 0 0-2.86 9.1l.2.13c-.15.91-.38 2-.67 3.21A2.06 2.06 0 0 0 21.65 39h2.7c1.32 0 2.3-1.26 1.98-2.56a46.74 46.74 0 0 1-.6-2.86l-.06-.35A5 5 0 0 0 23 24Zm0 2a3 3 0 0 1 1.76 5.43l-.16.11a2 2 0 0 0-.91 2c.16.98.4 2.12.7 3.37.01.05-.02.09-.04.09h-2.7c-.02 0-.05-.04-.04-.09.3-1.25.54-2.4.7-3.36a2 2 0 0 0-.78-1.92l-.13-.09A3 3 0 0 1 23 26ZM12 12.44V18H9a3 3 0 0 0-3 3v21a3 3 0 0 0 3 3h28a3 3 0 0 0 3-3V21a3 3 0 0 0-3-3h-3v-5.56C34 6.2 29.36 1 23 1S12 6.19 12 12.44ZM23 3c5.14 0 9 4.18 9 9.44V18H14v-5.56C14 7.18 17.86 3 23 3ZM9 20h28a1 1 0 0 1 1 1v21a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V21a1 1 0 0 1 1-1Z" fill="#0a95ff"></path></svg>
                                    <h1 className="speech-h1">Feel free to check out my LinkedIn and Github profiles!</h1>
                                        <div className="links">
                                            <a href="https://github.com/darianchen/" target="_blank"><button id="github-button">Github</button></a>
                                            <a href="https://www.linkedin.com/in/darianchen/" target="_blank"><button id="linkedin-button">LinkedIn</button></a>
                                            <div className="speech-bubble-left-corner"></div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="animation-container">
                            Every <span className="job">developer</span> has a
                            <br/>
                             tab open to <span className="syntaxError">syntaxError</span>
                        </h1>
                        <span className="black-block"></span>
                        <div className="svg-container">
                        <div className="svgs">
                            <div>
                                <SiReact size="120px" color="60dafb"/>
                                <div className="tool">React</div>
                            </div>

                            <div>
                                <SiRedux size="120px" color="764abc"/>
                                <div className="tool">Redux</div>
                            </div>

                            <div>
                                <DiRuby size={120} color="e51522"/>
                                <div className="tool">Ruby on Rails</div>
                            </div>
                        </div>
                            
                            <div>
                                <SiPostgresql size={120} color="#ffffff" fill="white"/>
                                <div className="tool">PostgreSQL</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    } else{
        return (<QuestionIndex/>)
    }
};

export default SplashPage;