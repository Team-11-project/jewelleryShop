import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../../sideNav/sideNav'
import Navbar from '../../navbar/navbar'
import AuthContext from '../../../../Context/AuthContext'
import './products.css'
import ProductBox from './ProductBox'
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewProduct from './popups/newProduct/NewProduct'
import EditProduct from './popups/editproduct/EditProduct'
import NewCategory from './popups/newCategory/newCategory'

function Products({isNewCategory}) {
    let { authTokens } = useContext(AuthContext)
    // console.log(isNewCategory)

    const [Allproducts, setAllProducts] = useState([])
    const [productsCount, setProductsCount] = useState()
    const [newProductPop, setNewProductPop] = useState(false)
   
    const [editProdPop, setEditProdPop] = useState(false)
    const [isOption, setIsOption] = useState(false)
    const [chosenProd, setChosenProd] = useState({})
    const [pages, setPages] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const totalPageCount = Math.ceil(Allproducts.length / 6);
    const lastIndex = currPage * 6
    const firstIndex = lastIndex - 6
    const products = Allproducts.slice(firstIndex, lastIndex)

    const range = (start, end) => {
        let length = end - start + 1;
        setPages(Array.from({ length }, (_, idx) => idx + start));
    };
    // console.log(chosenProd, "prod")s

    const getPop = (pop) => {
        setNewProductPop(pop)
        
    }

    const getIsOption = (opt) => {
        setIsOption(opt)
    }

    const getChosenProd = (prod) => {
        setChosenProd(prod)
    }

    const getEditPop = (pop) => {
        setEditProdPop(pop)
    }

    const prevPage = () => {
        if (currPage > 1) {
            setCurrPage(currPage - 1)
        }
    }
    const nextPage = () => {
        if (currPage < pages[pages.length - 1]) {
            setCurrPage(currPage + 1)
        }
    }

    const setPage = (page) => {
        setCurrPage(page)
    }

    const getProductsCount = async (token) => {
        try {
            let response = await fetch(`http://localhost:3000/products/get-all-products-count`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                })
            const resJson = await response.json();
            if (response) {
                // console.log(resJson, "response")
                setProductsCount(resJson);
            } else {
                console.log(resJson);
                alert("error: " + resJson)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getProducts = async (token) => {
        try {
            // setIsLoading(true)
            let response = await fetch(`http://localhost:3000/products/get-all-products`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                })
            const resJson = await response.json();
            if (response.status === 200) {
                // console.log(resJson, "response")
                setAllProducts(resJson.response);
            } else {
                console.log(resJson);
                alert("error: " + resJson.message)
            }

        }
        catch (error) {
            // setIsLoading(true)
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts(authTokens.token)
        range(1, totalPageCount)
        console.log(isOption)
        // console.log(chosenProd)
        // getProductsCount(authTokens.token)
    }, [authTokens, totalPageCount, isOption, newProductPop, editProdPop])

    return (
        <>
            {newProductPop === true ? <NewProduct getPop={getPop} /> : ""}
            {editProdPop === true ? <EditProduct getEditPop={getEditPop} chosenProd={chosenProd} getIsOption={getIsOption} /> : ""}
            

            <div className="path">Dashboard/Products</div>
            <div className="prod-container">
                {products.length > 0 && (
                    <>
                        <div className="prod">
                            {products.map(product => (
                                <ProductBox key={product.productId} product={product} getChosenProd={getChosenProd} getEditPop={getEditPop} getIsOption={getIsOption} />
                            ))}
                        </div>
                    </>
                )}

                <div className="prod-container-footer">
                    <div className="pagination">
                        {
                            currPage == 1 ?
                                <div className=""></div>
                                :
                                <div className="page-no" onClick={() => { prevPage(); getProducts(authTokens.token) }}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </div>

                        }

                        {pages.length > 0 && (
                            <div className="p">
                                {pages.map(page => (
                                    // <ProductBox key={product.productId} product={product} />
                                    <div key={page} onClick={() => { setPage(page) }} className={currPage === page ? "active-page-no page-no" : "page-no"}>{page}</div>
                                ))}
                            </div>
                        )}
                        {
                            pages.length > 6 && (
                                <div className="page-no">...</div>
                            )}
                        {
                            currPage == pages[pages.length - 1] ?
                                <div className=""></div>
                                :
                                <div className="page-no" onClick={() => { nextPage(); getProducts(authTokens.token) }}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>

                        }

                    </div>
                    <div className="newButton">
                        <button onClick={() => setNewProductPop(true)}> <FontAwesomeIcon icon={faPlus} />New Product</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products