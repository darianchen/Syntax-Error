import React from "react";
import { Link } from "react-router-dom";
import './index.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-left">
                    <a className="syntaxErrorLogo" onClick={scrollToTop}>
                        <svg width="32" height="37" viewBox="0 0 32 37"><path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path><path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"></path></svg>
                    </a>
                    <div className="navigation">
                        <a className="main" onClick={scrollToTop}>
                            syntaxError
                        </a>
                        <ul>
                            <Link to="/questions">
                                <li>Questions</li>
                            </Link>
                            <a href="https://stackoverflow.com/help">
                                <li>Help</li>
                            </a>
                        </ul>
                    </div>
                </div>
                <div className="footer-right">
                    <div className="navigation">
                        <ul>
                            <a href="https://github.com/darianchen">
                                <li>Github</li>
                            </a>
                            <a href="https://www.linkedin.com/in/darianchen/">
                                <li>LinkedIn</li>
                            </a>
                            <a href="https://angel.co/u/darian-chen">
                                <li>Wellfound</li>
                            </a>
                            <a href="https://darianchen.github.io/">
                                <li>Portfolio</li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;