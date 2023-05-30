import h_blue_logo from "../img/h_blue_logo.png"
import h_white_logo from "../img/h_white_logo.png"
import v_blue_logo from "../img/v_blue_logo.png"
import v_white_logo from "../img/v_white_logo.png"
import profile_logo from "../img/profile.png"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../css/Home.css'
import { useEffect, useState } from "react";

export default function Header() {

    return (
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
                                <a class="nav-link mt-2 mx-5" aria-current="page" href="/">SAP Landscape</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mt-2 mx-5" href="../statistics/index.html" >Statistics</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mt-2 mx-5" href="../logs/index.html">Logs</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            {/* <ul class="nav nav-pills nav-fill">
                <li class="nav-item brand">
                   <a href="https://www.tysonfoods.com/" target="_blank"> <img src={h_blue_logo} class="logo img-fluid rounded-top" alt="tyson logo" /></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link mt-4" aria-current="page" href="/">HANA Systems</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link mt-4" href="../statistics/index.html" >Statistics</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link mt-4" href="../logs/index.html">Logs</a>
                </li>
                <li class="nav-item">
                    <img src={profile_logo} class="profile_logo rounded" alt="profile" />
                </li>

            </ul> */}






        </>
    )
}