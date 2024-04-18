import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
    let data = useCart()
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate();
    const handleLog = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <Link className="navbar-brand fs-1 fst-italic" to="#">Chakus</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav me-auto mb-2">
                        <li className='nav-item'>
                            <Link className="nav-link active fs-5" to="/">Home </Link>
                        </li>
                        {(localStorage.getItem("authToken")) ?
                            <li className='nav-item'>
                                <Link className="nav-link active fs-5" to="/myOrder">My Orders </Link>
                            </li> : ""}
                    </ul>
                    {(!localStorage.getItem("authToken")) ?
                        <div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
                        </div> :
                        <>
                            <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>Cart {" "}<Badge pill bg='danger'>{data.length}</Badge></div>
                            {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                            <div className="btn bg-danger text-white mx-2" onClick={handleLog}>Logout</div>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}
