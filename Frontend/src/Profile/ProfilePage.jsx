import React, { useContext, useEffect, useState } from 'react'
import Menu from './Menu'
import AppNavbar from '../assets/navbar'
import './profilePage.css'
import PersonalInfo from './subs/PersonalInfo'
import Orders from './subs/Orders'
import Returns from './subs/CreateReturns'
import MyReviews from './subs/MyReviews'
import AuthContext from '../Context/AuthContext'
import MyReturns from './subs/MyReturns'

function ProfilePage() {
    const [page, setPage] = useState(0)
    let { user, authTokens } = useContext(AuthContext)
    const [userData, setUserData] = useState([])
    const uid = user?.user?.id

    const setP = (page) => {
        // console.log(page)
        setPage(page)
    }

    const PageDisplay = () => {
        if (page === 0) {
            return (<PersonalInfo userInfo={userData} />)
        }
        if (page === 1) {
            return (<Orders userId={uid} />)
        }
        if (page === 2) {
            return (<MyReturns />)
        }
        if (page === 3) {
            return (<MyReviews />)
        }
    }

    const getUserData = async (id) => {
        const token = authTokens.token
        try {
            const req = await fetch(`http://localhost:3001/auth/getUserByUserId/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            const res = await req.json();
            if (res.status === 200) {
                // console.log(res.response, "response")
                setUserData(res.response)
                // return res.response

                // console.log("done")
            } else {
                alert("error: " + res.message);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getUserData(uid)
    }, [page])

    return (
        <>
            <AppNavbar />

            <div className="profileContainer">
                <Menu setP={setP} page={page} />
                <div className="display">
                    {PageDisplay()}

                </div>

            </div>
        </>
    )
}

export default ProfilePage