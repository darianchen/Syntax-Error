import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './index.css'

const LeftSidebar = () => {
    const path = window.location.pathname;
    useEffect( () => {
        switch (path){
            case "/":
                document.querySelector(".left-sidebar-home").style.backgroundColor = "#F1F2F3";
                document.querySelector(".left-sidebar-home").style.borderRight = "4px solid orange";
                break;
            case "/questions":
                document.querySelector(".left-sidebar-questions").style.backgroundColor = "#F1F2F3";
                document.querySelector(".left-sidebar-questions").style.borderRight = "4px solid orange";
                break;
            case "/questions/":
                document.querySelector(".left-sidebar-questions").style.backgroundColor = "#F1F2F3";
                document.querySelector(".left-sidebar-questions").style.borderRight = "4px solid orange";
                break;
            case "/tags":
                document.querySelector(".left-sidebar-tags").style.backgroundColor = "#F1F2F3";
                document.querySelector(".left-sidebar-tags").style.borderRight = "4px solid orange";
                break;
            case "/users":
                break;
        default:
            
        }
    });

    return(
        <>
            <div className="left-sidebar">
                <div className="left-sidebar-content d-none d-xl-block">
                    <Link to="/"><div className="left-sidebar-home left-sidebar-link">Home</div></Link>
                    <ul>
                        <li className="left-sidebar-public">PUBLIC</li>

                        <Link to="/questions"><li className="left-sidebar-questions left-sidebar-link"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8ZM8 15.32a6.46 6.46 0 0 1-4.3-2.74 6.46 6.46 0 0 1-.93-5.01L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52Zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.45 6.45 0 0 1 3.83 4.51 6.45 6.45 0 0 1-1.51 5.73v.01Z"></path></svg>Questions</li></Link>
                        
                        <Link to="/tags"><li className="left-sidebar-tags left-sidebar-link">Tags</li></Link>

                        <Link to="/users"><li className="left-sidebar-users left-sidebar-link">Users</li></Link>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default LeftSidebar;