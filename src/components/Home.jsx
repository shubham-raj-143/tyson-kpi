import h_blue_logo from "../img/h_blue_logo.png"
import h_white_logo from "../img/h_white_logo.png"
import v_blue_logo from "../img/v_blue_logo.png"
import v_white_logo from "../img/v_white_logo.png"
import profile_logo from "../img/profile.png"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../css/Home.css'
import { useRef, useEffect, useState } from "react";
import Header from "./Header"
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDownloadExcel } from "react-export-table-to-excel"
import React from 'react';
import axios from 'axios';
import JsonData from './table.json';
import LoadingBar from 'react-top-loading-bar';
import ProductModal from './ProductModal';

export default function Home() {
    // active navigation item
    const [activeNavItem, setActiveNavItem] = useState('landscape');

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
    };

    // table search
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(
        JsonData
    );
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter((info) =>
        //   info.sap_sys_id.toLowerCase().includes(searchTerm.toLowerCase())
        Object.values(info).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    // fade alert box after 3 seconds
    const [isAlertVisible, setIsAlertVisible] = React.useState(false);

    const handleButtonClick = () => {
        setIsAlertVisible(true);

        setTimeout(() => {
            setIsAlertVisible(false);
        }, 3000);
    }


    const [status, setStatus] = useState(undefined);
    // fetching data from API and show it as table 

    // const [users, setUsers] = useState([])
    // const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     setLoading(true)
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response => response.json())
    //         .then(json => setUsers(json))
    //         .finally(() => {
    //             setLoading(false)
    //         })
    // }, []);




    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetch("./table.json")
    }, []);


    // dealing with radio buttons
    const [fileFormat, setFileFormat] = useState('');
    const [topping, setTopping] = useState("")

    const onOptionChange = e => {
        setTopping(e.target.value)
        setFileFormat(e.target.value)
    }

    // exporting table as excel file

    const tableref = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableref.current,
        filename: 'empInfo',
        sheet: 'empData'
    });

    const ondownload = () => {
        handleButtonClick();
        if (topping == 'excel') {

            onDownload();
            event.preventDefault();
            setStatus({ type: 'success' });

        }
        else if (topping == 'pdf') {
            // exporting tables in PDF format
            event.preventDefault();
            setStatus({ type: 'success' });
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape
            console.log("PDF---");
            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);

            doc.setFontSize(15);

            const title = "SAP Landscape Data";

            const headers = [["SAP Product", "SAP System ID", "System Description", "Type", "Does it run on a Hana database", "HANA"]];

            const data = JsonData.map(
                (user => [user.sap_prod, user.sap_sys_id, user.sys_desc, user.Type, user.Environment, user.run_hana, user.HANA]));

            let content = {
                startY: 50,
                head: headers,
                body: data
            };

            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("report.pdf");
        }
        else {
            event.preventDefault();
            setStatus({ type: 'error' });
        }

    }
    // sending email
    const [progress, setProgress] = useState(0)
    const [recipientEmail, setRecipientEmail] = useState('');
    const handleGenerateAndSend = async () => {


        event.preventDefault();
        try {

            setProgress(progress + 50)
            const response = await axios.post('http://localhost:3000/generate-and-send', {
                recipientEmail,
                fileFormat,
            });
            // console.log(response);
            if (response.data.message === 'sent') {

                setStatus({ type: 'sent' });
                setProgress(100);
                handleButtonClick();
            }
            else {
                setProgress(100);
                setStatus({ type: 'not_sent' });
                handleButtonClick();
            }


        } catch (error) {
            setProgress(100)
            setStatus({ type: 'not_sent' });

            handleButtonClick();
            // console.error(error);

        }
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setCurrentSelectedProduct(-1); setOpen(false)
    };
    const [currentSelectedProduct, setCurrentSelectedProduct] = useState(null);


    const handleProductClick = (event, productId) => {
        event.preventDefault();
        setCurrentSelectedProduct(-1);
        handleOpen();
        setCurrentSelectedProduct(productId);
        console.log(productId)
    }



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
                                <a className={`nav-link mt-2 mx-5 ${activeNavItem === 'landscape' ? 'active' : ''}`}
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

                            <li class="d-flex">
                                <input class="form-control input-search me-2 mt-2 mx-5" type="search" placeholder="Search" aria-label="Search" value={searchTerm}
                                    onChange={handleSearch} />
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>


            {isAlertVisible && status?.type === 'success' && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>"Download Successful!!!"</strong>
                </div>
            )}
            {isAlertVisible && status?.type === 'error' && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Download Failed!!!</strong>
                </div>
            )}
            {isAlertVisible && status?.type === 'sent' && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>"Email Sent Successfully!!!"</strong>
                </div>
            )}
            {isAlertVisible && status?.type === 'not_sent' && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>"Failed to send email!!!"</strong>
                </div>
            )}
            <LoadingBar
                color='#002554' height="3px" shadow="true"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <div class="table_container my-2 mx-2">
                <div class="table-responsive ">
                    <table class="table table-responsive table-bordered responsive-lg responsive-md responsive-sm"
                        ref={tableref}>
                        <thead>
                            <tr>
                                <th>SAP Product </th>
                                <th>SAP System ID </th>
                                <th>System Description </th>
                                <th>Type</th>
                                <th>Environment</th>
                                <th>Does it run on a Hana database </th>
                                <th>HANA</th>
                            </tr>

                        </thead>
                        <tbody>
                        {filteredData.map(
                                (info) => {
                                    return (
                                        <tr key={info.id}>
<td onClick={(e) => handleProductClick(e, info.sap_sys_id)}><a ><svg width="15" height="15" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">

                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />

                                            </svg></a>&nbsp;{info.sap_prod}</td>

                                            <td>{info.sap_sys_id}</td>

                                            <td>{info.sys_desc}</td>

                                            <td>{info.Type}</td>

                                            <td>{info.Environment}</td>

                                            <td>{info.run_hana}</td>

                                            <td>{info.HANA}</td>

                                        </tr>
                                    )
                                }
                            )}


                        </tbody>


                    </table>

                </div>
                <hr
                    style={{
                        background: '#65686B',
                        color: '#65686B',
                        borderColor: '#65686B',
                        height: '0.1rem',
                    }}
                />

            </div>

            {/* <div class="table_container my-2 mx-2">
                <div class="table-responsive ">
                    <table class="table table-responsive table-bordered responsive-lg responsive-md responsive-sm"
                        ref={tableref}>
                        <thead>
                            <tr>
                                <th scope="col">User Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                            </tr>
                            <tr>
                                <th scope="col">SAP Product (ERP, S/4HANA CRM, etc)</th>
                                <th scope="col">SAP System ID / Name (SID)</th>
                                <th scope="col">System Description (Production /
                                    Non-production)
                                </th>
                                <th scope="col">Type (Abap, dual stack, Java, Hana XS, S/4 Hana)
                                </th>
                                <th scope="col">Environment (Sandbox, Dev, QA, PRD)
                                </th>
                                <th scope="col">Does it run on a Hana database (y/n)
                                </th>
                                <th scope="col">HANA(SID)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            ))}

                        </tbody>

                        
                    </table>
                </div>

            </div> */}


            <form class="send_form mx-2 mx-4" action="" method="post">
                <div class="mb-3 mt-4">
                    <input type="email" class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="abc@tyson.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)} />
                </div>
                <h4 class="form-text mt-4" >Send data as</h4>

                <div class="form-check" value={fileFormat}>
                    <input class="form-check-input" type="radio" name="radio" id="radio_excel" value="excel" onChange={onOptionChange} />
                    <label class="form-check-label" for="radio_excel">
                        Excel
                    </label>
                </div>

                <div class="form-check" value={fileFormat}>
                    <input class="form-check-input" type="radio" name="radio" id="radio_pdf" value="pdf" onChange={onOptionChange} />
                    <label class="form-check-label" for="radio_pdf">
                        Pdf
                    </label>
                </div>

                <button onClick={ondownload} type="button" class="sub_btn btn mt-4 mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>&nbsp; Download</button>
                <button onClick={handleGenerateAndSend} type="submit" class="sub_btn btn mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>&nbsp; Send</button>

            </form>

            <ProductModal handleClose={handleClose} open={open} sapSystemId={currentSelectedProduct} />


        </>
    )
}