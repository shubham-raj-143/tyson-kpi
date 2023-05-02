import h_blue_logo from "../img/h_blue_logo.png"
import h_white_logo from "../img/h_white_logo.png"
import v_blue_logo from "../img/v_blue_logo.png"
import v_white_logo from "../img/v_white_logo.png"
import profile_logo from "../img/profile.png"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../css/Home.css'
import { useEffect, useState } from "react";
import Header from "./Header"

export default function Home() {
    
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

    return (
        <>

           <Header />

            <div class="table_container my-2 mx-2">
                <div class="table-responsive ">
                    <table class="table table-responsive table-bordered responsive-lg responsive-md responsive-sm">
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
                <div class="form-check my-2">
                    <input class="form-check-input" type="checkbox" value="" id="" />
                    <label class="form-check-label" for="">
                        Excel
                    </label>
                </div>
                <div class="form-check mt-2">
                    <input class="form-check-input" type="checkbox" value="" id="" />
                    <label class="form-check-label" for="">
                        Pdf
                    </label>
                </div>
                <button type="submit" class="sub_btn btn mt-4">Submit</button>
            </form>




        </>
    )
}