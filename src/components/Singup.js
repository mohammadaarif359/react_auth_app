import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Singup = (props) => {
    const [credentails, setCredentails] = useState({name:"",email:"",mobile:"",password:""})
    let history = useHistory();
    
    const onChange = (e) =>{
        setCredentails({...credentails,[e.target.name] : e.target.value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const host = 'http://127.0.0.1:8000';
        const response = await fetch(`${host}/api/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentails.name,email:credentails.email,mobile:credentails.mobile,password:credentails.password,role:2})
        });
        const data = await response.json();
        document.querySelectorAll('.help-block').forEach(er=> er.innerHTML = '');
        if(data.status == true) {
            // redirect
            history.push("/login");
            props.showAlert(data.message,'success')
        } else if(data.status == false && data.errors) {
            let errors = data.errors;
            console.log('errors',errors);
            for (const key in errors) {
                if(key != 'role') {
                    console.log(`${key}: ${errors[key]}`);
                    document.querySelector(`.error_${key}`).innerHTML = `${errors[key]}`;
                }
            }
        } else if(data.status == false) {
            props.showAlert('server error','danger');
        }
    }
    return (
        <div className="mt-2">
            <h2 className="my-3">Singup To React App</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" value={credentails.name} id="name" aria-describedby="nameHelp" onChange={onChange}/>
                    <span className="error_name help-block"></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={credentails.email} id="email" aria-describedby="emailHelp" onChange={onChange}/>
                    <span className="error_email help-block"></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Mobile</label>
                    <input type="number" name="mobile" className="form-control" value={credentails.mobile} id="email" aria-describedby="mobileHelp" onChange={onChange}/>
                    <span className="error_mobile help-block"></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" value={credentails.password} className="form-control" id="password" onChange={onChange}/>
                    <span className="error_password help-block"></span>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Singup
