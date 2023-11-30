import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faChartLine, faChevronLeft, faChevronRight, faCommentDots, faCreditCard, faEnvelope, faLayerGroup, faSquarePlus, faStore } from '@fortawesome/free-solid-svg-icons'
import "./sideNav.css"

// function SideNav() {
function SideNav({ getPage, getEx }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [page, setPage] = useState(0)

    getPage(page)
    getEx(isCollapsed)

    useEffect(() => {
    }, [page]);

    const Collapsed = () => {
        return (
            <>
                <button className="coll-btn" onClick={() => { setIsCollapsed(false) }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <div className="container">
                    <div className="full-section">
                        <div className={page === 0 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(0) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faChartLine} /></div>
                        </div>
                        <div className={page === 1 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(1) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faStore} /></div>
                        </div>
                        <div className={page === 2 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(2) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCartShopping} /></div>
                        </div>
                        <div className={page === 3 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(3) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCreditCard} /></div>
                        </div>
                    </div>

                    <div className="bottom-line"></div>

                    <div className="full-section">
                        <div className={page === 4 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(4) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faLayerGroup} /></div>
                        </div>
                        <div className={page === 5 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(5) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faLayerGroup} /></div>
                        </div>
                        <div className={page === 6 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(6) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faSquarePlus} /></div>
                        </div>
                    </div>

                    <div className="bottom-line"></div>

                    <div className="full-section insight">
                        <div className={page === 7 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(7) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCommentDots} /></div>
                        </div>
                        <div className={page === 8 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(8) }}>
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
                        <div className={page === 0 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(0) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faChartLine} /></div>
                            <div className="full-page-name">Dashboard</div>
                        </div>
                        <div className={page === 1 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(1) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faStore} /></div>
                            <div className="full-page-name">Products</div>
                        </div>
                        <div className={page === 2 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(2) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCartShopping} /></div>
                            <div className="full-page-name">Orders</div>
                        </div>
                        <div className={page === 3 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(3) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCreditCard} /></div>
                            <div className="full-page-name">Payments</div>
                        </div>
                    </div>

                    <div className="full-bottom-line"></div>

                    <div className="full-section">
                        <p>Categories</p>
                        <div className={page === 4 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(4) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faLayerGroup} /></div>
                            <div className="full-page-name">Rings</div>
                        </div>
                        <div className={page === 5 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(5) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faLayerGroup} /></div>
                            <div className="full-page-name">Necklace</div>
                        </div>
                        <div className={page === 6 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(6) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faSquarePlus} /></div>
                            <div className="full-page-name">New</div>
                        </div>
                    </div>

                    <div className="full-bottom-line"></div>

                    <div className="full-section insight">
                        <p>Insights</p>
                        <div className={page === 7 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(7) }}>
                            <div className="full-icon"><FontAwesomeIcon icon={faCommentDots} /></div>
                            <div className="full-page-name">Reviews</div>
                        </div>
                        <div className={page === 8 ? "active-icon full-page" : "full-page"} onClick={() => { setPage(8) }}>
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