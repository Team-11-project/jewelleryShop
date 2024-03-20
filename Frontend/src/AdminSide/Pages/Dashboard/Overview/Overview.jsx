import React, { useState } from 'react'
import SideNav from '../../sideNav/sideNav'
import Navbar from '../../navbar/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./overviewStyles.css"
import { faCartShopping, faRightLeft, faSterlingSign, faStore } from '@fortawesome/free-solid-svg-icons'

function Overview() {
    return (
        <>
            <div className="topSection">
                <div className="metric">
                    <div className="info">
                        <p>Total Sales</p>
                        <p>{"value"} </p>
                    </div>
                    <div className="icon-side">
                        <div className="metric-icon">
                            <FontAwesomeIcon icon={faSterlingSign} />
                        </div>
                    </div>
                </div>
                <div className="metric">
                    <div className="info">
                        <p>Orders</p>
                        <p>{"value"} </p>
                    </div>
                    <div className="icon-side">
                        <div className="metric-icon orders">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                    </div>
                </div>
                <div className="metric">
                    <div className="info">
                        <p>Returns</p>
                        <p>{"value"} </p>
                    </div>
                    <div className="icon-side">
                        <div className="metric-icon returns">
                            <FontAwesomeIcon icon={faRightLeft} />
                        </div>
                    </div>
                </div>
                <div className="metric">
                    <div className="info">
                        <p>Products</p>
                        <p>{"value"} </p>
                    </div>
                    <div className="icon-side">
                        <div className="metric-icon products">
                            <FontAwesomeIcon icon={faStore} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="middleSection">
                <div className="sP"></div>
                <div className="tP"></div>
            </div>

            <div className="bottomSection"></div>
        </>
    )
}

export default Overview