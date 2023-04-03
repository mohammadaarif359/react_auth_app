import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");

const Login = (props) => {
    const [credentails, setCredentails] = useState({email:"",password:""})
    let history = useHistory();
    const onChange = (e) =>{
        setCredentails({...credentails,[e.target.name] : e.target.value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const host = 'http://127.0.0.1:8000';
        const response = await fetch(`${host}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentails.email,password:credentails.password})
        });
        const data = await response.json();
        console.log('login data',data);
        document.querySelectorAll('.help-block').forEach(er=> er.innerHTML = '');
        if(data.status == true) {
            // save the auth token and redirect
            ReactSession.set("token", data.data.token);
            props.showAlert(data.message,'success');
            history.push('/');
        } else if(data.status == false && data.errors) {
            let errors = data.errors;
            console.log('errors',errors);
            for (const key in errors) {
                console.log(`${key}: ${errors[key]}`);
                document.querySelector(`.error_${key}`).innerHTML = `${errors[key]}`;
            }
        } else {
            props.showAlert(data.message,'danger');
        }
    }
    return (
        <div className="mt-2">
            <h2 className="my-3">Login To React App</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={credentails.email} id="email" aria-describedby="emailHelp" onChange={onChange}/>
                    <span className="help-block error_email"></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" value={credentails.password} className="form-control" id="password" onChange={onChange}/>
                    <span className="help-block error_password"></span>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
