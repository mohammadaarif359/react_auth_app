import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");


const Home = (props) => {
    const {showAlert} =props;
    const [profile, setProfile] = useState([])
    let history = useHistory();
    useEffect(() => {
        let token = ReactSession.get("token");
        if(token && token != null) {
            getProfile()

            //eslint-disable-next-line
        } else {
            history.push('/login');
        }
    }, [])

    const getProfile = async() => {
        let token = ReactSession.get("token")
        const host = 'http://127.0.0.1:8000';
        const response = await fetch(`${host}/api/user-profile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data)
        if(data.status == true) {
            setProfile(data.data)
        }

    }
    
    return (
        <div className="col-md-12">
            <h3>Use Profile</h3>
            {profile &&
            <div className="card my-3">
                <div className ="card-body">
                    <h5 className ="card-title">{profile.name}</h5>
                    <p className ="card-text">Email : {profile.email}</p>
                    <p className ="card-text">Mobile : {profile.mobile}</p>
                    <p className ="card-text">Created At : {profile.created_at}</p>
                </div>
            </div>}
        </div>
    )
}

export default Home
