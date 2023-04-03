import React from 'react'
import {Link,useHistory,useLocation} from "react-router-dom";
import { ReactSession } from 'react-client-session';

const Navbar = (props) => {
    let location = useLocation();
    let history = useHistory();
    const handleLogout = async() => {
        let token = ReactSession.get("token")
        const host = 'http://127.0.0.1:8000';
        const response = await fetch(`${host}/api/logout`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if(data.status == true) {
            ReactSession.remove("token");
            history.push('/login')
            props.showAlert(data.message,'success');
        } else {
            props.showAlert('token not match','danger');
        }
        console.log('response',data);

    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">React App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                    </li>
                </ul>
                {!ReactSession.get("token")?
                <form className="d-flex">
                    <Link className="btn btn-light me-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-light me-2" to="/signuser" role="button">Singup</Link>
                </form>:<button className="btn btn-light me-2" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
