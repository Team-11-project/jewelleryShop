import React, { useContext, useEffect, useState } from 'react'
import './subs.css'
import AuthContext from '../../Context/AuthContext'
import img1 from './pexels-dima-valkov-3266700-2-2.jpg'
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faRectangleXmark, faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

function MyReviews() {

    const imgPath = '../../../src/assets/'

    let { authTokens } = useContext(AuthContext)
    const notify = (message) => toast(message);
    let { user } = useContext(AuthContext)
    const userId = user?.user?.id
    const [reviews, setReviews] = useState([])

    const [selectedReview, setSelectedReview] = useState({})
    // console.log(selectedReview)
    const [edit, setEdit] = useState(null)

    const getReview = (id) => {
        const found = reviews.find((element) => element.id == id);
        // console.log(found)
        setSelectedReview(found)
        setFormData({
            title: found.title,
            content: found.content,
            rating: found.rating
        })
    }

    const resetEdit = () => {
        setEdit(null)
        setFormData({
            title: "",
            content: "",
            rating: ""
        })

    }

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        rating: "",
    })

    const getReviews = async (userId) => {
        // const token = authTokens.token
        // console.log(userId)
        // console.log(user?.user.id)
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
        const token = authTokens.token
        try {
            const req = await fetch(`http://localhost:3001/reviews/deleteReview/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            const res = await req.json();
            notify(res.message)

        } catch (error) {
            notify(error)
        }
    }

    const editReview = async (id) => {
        // console.log("trying")
        const token = authTokens.token
        try {
            const req = await fetch(`http://localhost:3001/reviews/updateReview/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });
            const res = await req.json();
            resetEdit()

            notify(res.message)

        } catch (error) {
            notify(error)
        }

    }

    useEffect(() => {
        getReviews(userId)
    }, [edit, selectedReview])

    const ReviewComponent = (review) => {
        return (
            <>
                <form action="" >
                    <div className="reviewContainer">

                        <div className="im"><img src={imgPath + review?.product?.image} alt="image" /></div>
                        <div className="le">
                            <div className="lev2">
                                {
                                    edit === review?.id
                                        ?
                                        <div className="left">
                                            <div className="entry">
                                                <label>Rating:</label>
                                                <input
                                                    className={edit === false ? "inp " : "inp activ"}
                                                    type="text"
                                                    name="email"
                                                    value={formData.rating}
                                                    disabled={edit === review?.id ? false : true}
                                                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                                />
                                            </div>
                                            <div className="trash">
                                                {
                                                    edit === review?.id ?
                                                        <FontAwesomeIcon icon={faSquareCheck} color='blue' onClick={() => editReview(review?.id)} />
                                                        :
                                                        <FontAwesomeIcon color={"blue"} icon={faPenToSquare} onClick={() => { getReview(review?.id); setEdit(review?.id); }} />
                                                }
                                                {
                                                    edit === review?.id ?
                                                        <FontAwesomeIcon icon={faRectangleXmark} color='red' onClick={() => resetEdit()} />
                                                        :
                                                        <FontAwesomeIcon color={"red"} icon={faTrash} onClick={() => deleteReview(review.id)} />
                                                }



                                            </div>
                                        </div>

                                        :
                                        <div className="left">
                                            <ReactStars
                                                count={5}
                                                value={Number(review?.rating)}
                                                disabled={true}
                                                size={24}
                                                color="grey"
                                                activeColor="#E3C066"
                                                isHalf={true}
                                                edit={false}
                                            />
                                            <div className="trash">
                                                {
                                                    edit === review?.id ?
                                                        <FontAwesomeIcon icon={faSquareCheck} color='blue' />
                                                        :
                                                        <FontAwesomeIcon color={"blue"} icon={faPenToSquare} onClick={() => { { setEdit(review?.id); } { getReview(review?.id) } }} />
                                                }
                                                {
                                                    edit === review?.id ?
                                                        <FontAwesomeIcon icon={faRectangleXmark} color='red' onClick={() => setEdit(null)} />
                                                        :
                                                        <FontAwesomeIcon color={"red"} icon={faTrash} onClick={() => deleteReview(review.id)} />
                                                }
                                            </div>
                                        </div>
                                }

                                {
                                    edit === review?.id
                                        ?
                                        <div className="entry">
                                            <label>Title:</label>
                                            <input
                                                className={edit === false ? "inp " : "inp activ"}
                                                type="text"
                                                name="email"
                                                value={formData.title}
                                                disabled={edit === review?.id ? false : true}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        :
                                        <p> {review?.title}</p>
                                }
                            </div>
                            {
                                edit === review?.id
                                    ?
                                    <div className="entry">
                                        <label>Review:</label>
                                        <input
                                            className={edit === false ? "inp " : "inp activ"}
                                            type="text"
                                            name="email"
                                            value={formData.content}
                                            disabled={edit === review?.id ? false : true}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        />
                                    </div>
                                    :
                                    <div className="lev3">{review.content}</div>
                            }

                        </div>


                    </div>
                </form>

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
            <div className="displayT" >My Reviews</div>
            <div className="reviews">
                {reviews.length > 0 && (
                    <>
                        {reviews.map(review => (
                            <div className="" key={review?.id}>
                                {ReviewComponent(review)}
                            </div>
                        ))}
                    </>
                )}
            </div>

        </>
    )
}

export default MyReviews