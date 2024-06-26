import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Signup() {
    const navigate=useNavigate()
    const [credentails, setcredentails] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("https://fooddeliveryapp-3f8s.onrender.com/api/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentails.name, email: credentails.email, password: credentails.password, location: credentails.geolocation })
        })
        const json = await response.json()
        console.log(json)
        
        if (!json.success) {
            alert("Enter valid credentials")
        }else{
            navigate('/')
            alert("You have successfully signed up. Please log in!!")
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
                        <label htmlFor="name" className="form-label" >Name</label>
                        <input type="text" className="form-control" name='name' value={credentails.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleAdd" name='geolocation' value={credentails.geolocation} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentails.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentails.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success" >Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already User?</Link>
                </form>
            </div>
        </div>
    )
}
