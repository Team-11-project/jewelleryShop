import React, { useContext, useEffect, useState } from 'react'
import './subs.css'
import AuthContext from '../../Context/AuthContext'

function MyReviews() {
    let { user } = useContext(AuthContext)
    const userId = user?.user?.id
    const [reviews, setReviews] = useState([])

    const getReviews = async (userId) => {
        // const token = authTokens.token
        // console.log(userId)
        console.log(user?.user.id)
        try {
            const req = await fetch(` http://localhost:3001/reviews/getProductReviewByUser/${user?.user.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    }
                });
            const res = await req.json();
            setReviews(res)

        } catch (error) { console.log(error) }

    }


    useEffect(() => {
        getReviews(userId)
    }, [])

    const ReviewComponent = (review) => {
        return (
            <>
                <div className="lev1">level1</div>
                <div className="lev2"></div>
                <div className="lev3"></div>
            </>
        )
    }

    const reviewsByUser = [
        { id: 1, title: "", content: "", product: "", rating: "" }
    ]

    return (

        <>
            <div>MyReviews</div>
            <ReviewComponent />
        </>
    )
}

export default MyReviews