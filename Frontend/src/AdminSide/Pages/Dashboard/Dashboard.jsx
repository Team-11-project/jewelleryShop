import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import Navbar from '../navbar/navbar'
import SideNav from '../sideNav/sideNav'
import Overview from './Overview/Overview'
import Products from './Products/Products'



function Dashboard() {
    const [page, setPage] = useState(0)
    const [ex, setEx] = useState(false)

    const [isNewCategory, setIsNewCategory] = useState(false)
    const getIsNewCategory = (p) => {
        setIsNewCategory(p) 
    }
    const getPage = (p) => {
        setPage(p)
    }

    const getEx = (e) => {
        setEx(e)
    }

    const PageDisplay = () => {
        if (page === 0) {
            return <Overview />
        }
        if (page === 1) {
            return <Products />
        }
    }

    useEffect(() => {
    }, [page, ex]);

    return (
        <>
            <div className="dash">
                <SideNav getPage={getPage} getEx={getEx} getIsNewCategory={getIsNewCategory}/>
                <div className={ex === false ? "ac" : "coll ac"}>
                    <Navbar />
                    {PageDisplay()}
                </div>
            </div>
        </>

    )
}

export default Dashboard