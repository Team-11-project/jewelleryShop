import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faChartLine, faChevronLeft, faChevronRight, faCommentDots, faCreditCard, faEnvelope, faLayerGroup, faSquarePlus, faStore } from '@fortawesome/free-solid-svg-icons'
import "./sideNav.css"
import AuthContext from '../../../Context/AuthContext';

// function SideNav() {
function SideNav({ getPage, getEx, getIsNewCategory, getIsEditCategory, getSelectedCat, isEditCategory, isNewCategory }) {
    let { authTokens } = useContext(AuthContext)

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [page, setPage] = useState(1)
    const [selectedCat, setSelectedCat] = useState({})
    const [categories, setCategories] = useState([])

    const getCategories = async (token) => {
        try {
            let response = await fetch('http://localhost:3001/products/get-all-categories',
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                })
            const resJson = await response.json();
            if (response.status == 200) {
                // console.log(resJson, "response")
                setCategories(resJson.response);
            } else {
                console.log(resJson.message);
                alert("error: " + resJson.message)
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getCategories(authTokens.token)
        getPage(page)
        getEx(isCollapsed)

        // console.log(categories)
    }, [authTokens, page, isEditCategory, isNewCategory]);

    const Collapsed = () => {
        return (
            <>
                <button className="coll-btn" onClick={() => { setIsCollapsed(false) }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <div className="side-container">
                    <div className="full-section">
                        {/* <div className={page === 0 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(0) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faChartLine} /></div>
                        </div> */}
                        <div className={page === 1 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(1) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faStore} /></div>
                        </div>
                        <div className={page === 2 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(2) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCartShopping} /></div>
                        </div>
                        {/* <div className={page === 3 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(3) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCreditCard} /></div>
                        </div> */}
                    </div>

                    <div className="bottom-line"></div>

                    {categories.length > 0 ? (
                        <div className="full-section">
                            {categories.map(category => (
                                <div className="full-page" key={category.id} onClick={() => { (getIsEditCategory(true)); getSelectedCat(category) }}>
                                    <div className="full-icon"><FontAwesomeIcon icon={faLayerGroup} /></div>
                                </div>

                            ))}
                            {/* <div className={"full-page"} onClick={() => { getIsNewCategory(true) }}>
                                <div className="full-icon"><FontAwesomeIcon icon={faSquarePlus} /></div>
                            </div> */}
                        </div>
                    )
                        :
                        <div className={page === 4 ? "active-icon full-page" : "full-page"} onClick={() => { getIsNewCategory(true) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faSquarePlus} /></div>
                        </div>
                    }

                    <div className="bottom-line"></div>

                    <div className="full-section insight">
                        <div className={page === 5 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(5) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCommentDots} /></div>
                        </div>
                        <div className={page === 6 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(6) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
                        </div>



                    </div>

                </div>
            </>
        )

    }

    const Full = () => {
        return (
            <>
                <div className="full-container">
                    <button className="full-coll-btn" onClick={() => { setIsCollapsed(true) }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="full-section">
                        <p>Admin Panel</p>
                        {/* <div className={page === 0 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(0) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faChartLine} /></div>
                            <div className="full-page-name">Overview</div>
                        </div> */}
                        <div className={page === 1 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(1) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faStore} /></div>
                            <div className="full-page-name">Products</div>
                        </div>
                        <div className={page === 2 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(2) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCartShopping} /></div>
                            <div className="full-page-name">Orders</div>
                        </div>
                        {/* <div className={page === 3 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(3) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCreditCard} /></div>
                            <div className="full-page-name">Payments</div>
                        </div> */}
                    </div>

                    <div className="full-bottom-line"></div>

                    {categories.length > 0 ? (
                        <div className="full-section">
                            <p>Categories</p>
                            {categories.map(category => (
                                <div className="full-page" key={category.id} onClick={() => { (getIsEditCategory(true)); getSelectedCat(category) }}>
                                    <div className="full-icon"><FontAwesomeIcon icon={faLayerGroup} /></div>
                                    <div className="full-page-name">{category?.categoryName}</div>
                                </div>

                            ))}
                            {/* <div className={"full-page"} onClick={() => { getIsNewCategory(true) }}>
                                <div className="full-icon"><FontAwesomeIcon icon={faSquarePlus} /></div>
                                <div className="full-page-name">New</div>
                            </div> */}
                        </div>
                    )
                        :
                        <div className={page === 4 ? "active-icon full-page" : "full-page"} onClick={() => { getIsNewCategory(true) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faSquarePlus} /></div>
                            <div className="full-page-name">New</div>
                        </div>
                    }

                    <div className="full-bottom-line"></div>

                    <div className="full-section insight">
                        <p>Insights</p>
                        <div className={page === 5 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(5) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCommentDots} /></div>
                            <div className="full-page-name">Reviews</div>
                        </div>
                        <div className={page === 6 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(6) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
                            <div className="full-page-name">Inbox</div>
                        </div>
                    </div>

                </div>
            </>
        )

    }

    const Display = () => {
        if (isCollapsed == true) {
            return Collapsed()
        }
        return Full()
    }
    return (
        <>
            {Display()}
        </>
    )
}

export default SideNav