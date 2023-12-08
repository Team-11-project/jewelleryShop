import React, { useContext } from 'react'
import './navbar.css'
import AuthContext from '../../../Context/AuthContext'
import { Link } from 'react-router-dom'

function Navbar() {

    let { logoutUser } = useContext(AuthContext)

    return (
        <>
            <div className="b">
                <div className='regalia'>Regalia</div>
                <div className="">
                    <button><Link to={"/"}>Home</Link></button>
                    <button onClick={logoutUser}>logout</button>
                </div>

            </div>
        </>

    )
}

export default Navbar