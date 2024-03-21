import React, { useContext, useEffect, useState } from 'react'
import './subs.css'
import AuthContext from '../../Context/AuthContext'
import img1 from './pexels-dima-valkov-3266700-2-2.jpg'
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyReviews() {

    const notify = () => toast("Wow so easy!");
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

    const deleteReview = async (id) => {
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

        } catch (error) {
            console.log(error)

        }
    }

    console.log(reviews)
    useEffect(() => {
        getReviews(userId)
    }, [])

    const reviewsByUser = [
        {
            id: 1,
            title: "title",
            customerName: "john doe",
            content: "well, i said what i said and Ten the hastened steepest feelings pleasant few surprise property. ",
            product: {
                id: 1,
                image: { img1 }
            },
            rating: "2"
        },
        {
            id: 2,
            title: "title",
            customerName: "john doe",
            content: "well, i said what i said and Ten the hastened steepest feelings pleasant few surprise property. ",
            product: {
                id: 2,
                image: { img1 }
            },
            rating: "4.5"
        },
        {
            id: 1,
            title: "title",
            customerName: "john doe",
            content: "well, i said what i said and Ten the hastened steepest feelings pleasant few surprise property. ",
            product: {
                id: 1,
                image: { img1 }
            },
            rating: "3"
        },
        {
            id: 1,
            title: "title",
            customerName: "john doe",
            content: "well, i said what i said and Ten the hastened steepest feelings pleasant few surprise property. ",
            product: {
                id: 1,
                image: { img1 }
            },
            rating: "2"
        },
        {
            id: 1,
            title: "title",
            customerName: "john doe",
            content: "well, i said what i said and Ten the hastened steepest feelings pleasant few surprise property. ",
            product: {
                id: 1,
                image: { img1 }
            },
            rating: "2"
        },
    ]

    const ReviewComponent = (review) => {
        return (
            <>
                <div className="reviewContainer">
                    <div className="im"><img src={img1} alt="image" /></div>
                    <div className="">
                        <div className="lev2"> <ReactStars
                            count={5}
                            value={review?.rating}
                            disabled={true}
                            size={24}
                            color="grey"
                            activeColor="#E3C066"
                            isHalf={true}
                            edit={false}
                        />
                            {review?.title}
                        </div>
                        <div className="lev3" onClick={notify}>{review.content}</div>
                    </div>

                </div>

            </>
        )
    }

    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            {/* Same as */}
            <ToastContainer />
            <div className="displayT" >My Reviews</div>
            <div className="reviews">
                {reviewsByUser.length > 0 && (
                    <>
                        {reviewsByUser.map(review => (
                            ReviewComponent(review)
                        ))}
                    </>
                )}
            </div>

        </>
    )
}

export default MyReviews