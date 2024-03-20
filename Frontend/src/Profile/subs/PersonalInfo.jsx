import React, { useContext, useEffect, useState } from 'react'
import './subs.css'
import AuthContext from '../../Context/AuthContext'

function PersonalInfo({ userInfo }) {

    let { user, logoutUser } = useContext(AuthContext)
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        email: user.user?.email,
        firstName: user.user?.firstName,
        lastName: user.user?.lastName
    });



    const handleSubmit = async (e) => {
        // e.preventDefault()
        console.log("hello")
        // 
        try {
            const req = await fetch(` http://localhost:3001/auth/updateUser/${user.user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });
            const res = await req.json();
            if (res.status === 200) {
                // console.log("done")
                alert("your data has been updated. Please log in again")
                logoutUser()
            } else {
                alert("error: " + res.message);
            }
        } catch (error) {
            console.log(error)

        }
    }



    return (
        <>
            <div className="displayT">Personal Info</div>
            {edit === false ? <div className="editBtn" onClick={() => { setEdit(true) }}>Edit</div>
                :
                <div className="editBtn" onClick={() => { setEdit(false) }}>Cancel</div>}

            <form action="submit" className='form' onSubmit={handleSubmit}>
                <div className="e">
                    <label>Email:</label>
                    <input
                        className={edit === false ? "inp " : "inp activ"}
                        type="text"
                        name="email"
                        value={formData.email}
                        disabled={edit === false ? true : false}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="e">
                    <label>Firstname:</label>
                    <input
                        className={edit === false ? "inp " : "inp activ"}
                        type="text"
                        name="email"
                        value={formData.firstName}
                        disabled={edit === false ? true : false}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>
                <div className="e">
                    <label>LastName:</label>
                    <input
                        className={edit === false ? "inp " : "inp activ"}
                        type="text"
                        name="email"
                        value={formData.lastName}
                        disabled={edit === false ? true : false}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>
                {edit === false ? <></> : <button type='submit' onClick={() => { handleSubmit; setEdit(false) }}>submit</button>}

            </form>
        </>
    )
}

export default PersonalInfo