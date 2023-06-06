import Header from "../components/Header";
import h_blue_logo from "../img/h_blue_logo.png"
import h_white_logo from "../img/h_white_logo.png"
import v_blue_logo from "../img/v_blue_logo.png"
import v_white_logo from "../img/v_white_logo.png"
import profile_logo from "../img/profile.png"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../css/Home.css'
import { useEffect, useState } from "react";
export default function App() {
    const [activeNavItem, setActiveNavItem] = useState('logs');
    // handle click for nav item
    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);

        
    };
    return(
        <>
<nav class="nav navbar navbar-expand-lg navbar-light bg-light py-0">
                <div class="nav container-fluid">
                    <a class="navbar-brand" href="https://www.tysonfoods.com/" target="_blank"> <img src={h_blue_logo} class="logo img-fluid rounded-top" alt="tyson logo" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a  className={`nav-link mt-2 mx-5 ${activeNavItem === 'landscape' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('landscape')} aria-current="page" href="/landscape"
                                >SAP Landscape</a>
                            </li>
                            <li class="nav-item">
                                <a className={`nav-link mt-2 mx-5 ${activeNavItem === 'statistics' ? 'active' : ''}`}
                                    onClick={() => handleNavItemClick('statistics')} href="../statistics/index.html" >Statistics</a>
                            </li>
                            <li class="nav-item">
                                <a className={`nav-link mt-2 mx-5 ${activeNavItem === 'logs' ? 'active' : ''}`}
                                    onClick={() => handleNavItemClick('logs')} href="../logs/index.html">Logs</a>
                            </li>
                           

                        </ul>
                    </div>
                </div>
            </nav>
        <h1>This is Logs page</h1>
        </>
    );
}