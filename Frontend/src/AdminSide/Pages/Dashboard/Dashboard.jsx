import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import Navbar from '../navbar/navbar'
import SideNav from '../sideNav/sideNav'
import Overview from './Overview/Overview'
import Products from './Products/Products'
import NewCategory from './Products/popups/newCategory/newCategory'
import EditCategory from './Products/popups/editCategory/editCategory'
import Orders from './Orders/Orders'
import AdminReviews from './Reviews/adminReviews'


function Dashboard() {
    const [page, setPage] = useState(0)
    const [ex, setEx] = useState(false)
    const [isNewCategory, setIsNewCategory] = useState(false)
    const [selectedCat, setSelectedCat] = useState({})
    const selectedCategory = (p) => {
        setSelectedCat(p)
    }
    console.log(selectedCat)
    const getIsNewCategory = (p) => {
        setIsNewCategory(p)
    }
    const [newCategoryPop, setNewCategoryPop] = useState(isNewCategory)

    console.log(isNewCategory)
    const [isEditCategory, setIsEditCategory] = useState(false)
    const getIsEditCategory = (p) => {
        setIsEditCategory(p)
    }
    const [editCategoryPop, setEditCategoryPop] = useState(isEditCategory)

    console.log(isEditCategory)
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
            return <Products isNewCategory={isNewCategory} />
        }
        if (page == 2) {
            return <Orders />;
        }
        if (page == 5){
            return <AdminReviews/>
        }
    }

    useEffect(() => {
    }, [page, ex, isNewCategory, isEditCategory]);

    return (
        <>
            <div className="dash">
                <SideNav getPage={getPage} getEx={getEx} getIsNewCategory={getIsNewCategory} getIsEditCategory={getIsEditCategory}
                    getSelectedCat={selectedCategory} isEditCategory={isEditCategory} isNewCategory={isNewCategory} />
                <div className={ex === false ? "ac" : "coll ac"}>
                    <Navbar />
                    {isNewCategory === true ? <NewCategory getPop={getIsNewCategory} /> : ""}
                    {isEditCategory === true ? <EditCategory getPop={getIsEditCategory} selectedCat={selectedCat} /> : ""}
                    {PageDisplay()}
                </div>
            </div>
        </>

    )
}

export default Dashboard