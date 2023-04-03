import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Alert from './components/Alert';
import Singup from './components/Singup';
import Login from './components/Login';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message,type) => {
    setAlert({
        msg:message,
        type:type
    })
    setTimeout(() => {
       setAlert(null);
    }, 2000);
  }
  return (
    <>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
                <Route exact path="/">
                  <Home showAlert={showAlert}/>
                </Route>
                <Route exact path="/login">
                  <Login showAlert={showAlert}/>
                </Route>
                <Route exact path="/signuser">
                  <Singup showAlert={showAlert}/>
                </Route>
            </Switch>
          </div>  
        </Router>
    </>
  );
}

export default App;
