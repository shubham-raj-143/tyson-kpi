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
import { send } from 'emailjs-com';
import React from 'react';

export default function Home() {
    // send email
 

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
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(json => setUsers(json))
            .finally(() => {
                setLoading(false)
            })
    }, []);


    // dealing with radio buttons
    const [topping, setTopping] = useState("")

    const onOptionChange = e => {
        setTopping(e.target.value)
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

            const title = "Employee Data";

            const headers = [["UserId", "Name", "Email", "Phone"]];

            const data = users.map(user => [user.id, user.name, user.email, user.phone]);

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





    return (
        <>

            <Header />
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





            <div class="table_container my-2 mx-2">
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

            </div>


            <form class="send_form mx-2 mx-4" action="" method="post">
                <div class="mb-3 mt-4">
                    <input type="email" class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="abc@mail.com" />
                </div>
                <h4 class="form-text mt-4">Send data as</h4>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="radio" id="radio_excel" value="excel" onChange={onOptionChange} />
                    <label class="form-check-label" for="radio_excel">
                        Excel
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="radio" id="radio_pdf" value="pdf" onChange={onOptionChange} />
                    <label class="form-check-label" for="radio_pdf">
                        Pdf
                    </label>
                </div>
                <button onClick={ondownload} type="button" class="sub_btn btn mt-4 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg>&nbsp; Download</button>
                <button type="submit" class="sub_btn btn mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
</svg>&nbsp; Send</button>

            </form>




        </>
    )
}