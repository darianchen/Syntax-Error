import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import logo from '../../images/syntaxErrorLogo.png'
import BurgerMenu from "../BurgerMenu/index.js";






const Navbar = () => {

    const handleClick = () => {
       let search = document.getElementsByTagName("input")[0];
        search.focus();
    }

  return (
    <>
    <nav className="navbar">
        <div className="whole-container">

    <div className="first-container"> 
                <div>
                    <BurgerMenu className="firstcontainerchild" /></div>

                    <div className="logo firstcontainerchild">
                        <Link to="/" className="nav-link">
                            <img src={logo} alt=""/>
                        </Link>

                    </div>
                    <div className="about firstcontainerchild">
                        <Link to="/about" className="nav-link">
                            
                            About
                            
                        </Link>
                    </div>                
                    <div className="products firstcontainerchild">
                        <Link to="/products" className="nav-link">
                           
                                Products
                            
                        </Link>
                    </div>
                    <div className="teams firstcontainerchild">
                        <Link to="/teams" className="nav-link">

                                For Teams
                        </Link>
                    </div>
            </div>


          
                        <div className="search-container">
                        <div><svg  onClick={handleClick} aria-hidden="true" class="magnifying-glass" width="18" height="18" viewBox="0 0 18 18"><path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path></svg></div>
                                <input
                                    className="search"
                                    autoComplete="off"
                                    type="text"
                                    name="search"
                                    maxLength="35"
                                    placeholder="Search..."
                                />                
                        </div>
                    <div className="third-container">
                        <Link to="/login">
                            <button className="login">Log in</button>
                        </Link>

                        <Link to="/signup">
                            <button className="sign-up">Sign up</button>
                        </Link>
                    </div>
              
    </div>
    </nav>
    </>
  );
};
export default Navbar;