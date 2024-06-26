import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  let navigate = useNavigate();
  const [credentails, setcredentails] = useState({ email: "", password: "" })
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("https://fooddeliveryapp-3f8s.onrender.com/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentails.email, password: credentails.password })
    })
    const json = await response.json()
    console.log(json)
    if (!json.success) {
      alert("Enter valid credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentails.email);
      localStorage.setItem("token",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate('/');

    }
  }
  const onChange = (event) => {
    setcredentails({ ...credentails, [event.target.name]: event.target.value })

  }
  return (
    <div>
       <div>   <Navbar /> </div>
      <div className='container mt-3'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentails.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentails.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className='m-3 btn btn-danger'>New User?</Link>
        </form>
      </div>
    </div>
  )
}
