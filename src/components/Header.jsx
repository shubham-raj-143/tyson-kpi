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

            <ul class="nav nav-pills nav-fill">
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

            </ul>

            




        </>
    )
}