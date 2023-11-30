import React, { useContext } from 'react'
import './navbar.css'
import AuthContext from '../../../Context/AuthContext'

function Navbar() {

    let { logoutUser } = useContext(AuthContext)

    return (
        <>
            <div className="b">
                <div className='regalia'>Regalia</div>
                <button onClick={logoutUser}>logout</button>
            </div>
        </>

    )
}

export default Navbar