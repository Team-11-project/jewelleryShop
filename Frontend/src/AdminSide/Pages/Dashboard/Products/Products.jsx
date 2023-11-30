import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../../sideNav/sideNav'
import Navbar from '../../navbar/navbar'
import AuthContext from '../../../../Context/AuthContext'
import './products.css'
import ProductBox from './ProductBox'
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewProduct from './popups/newProduct/NewProduct'

function Products() {
    let { authTokens } = useContext(AuthContext)

    const [Allproducts, setAllProducts] = useState([])
    const [newProductPop, setNewProductPop] = useState(false)
    const [productsCount, setProductsCount] = useState(0)
    const [pages, setPages] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const totalPageCount = Math.ceil(productsCount / 6);
    const lastIndex = currPage * 6
    const firstIndex = lastIndex - 6
    const products = Allproducts.slice(firstIndex, lastIndex)

    const range = (start, end) => {
        let length = end - start + 1;
        /*
            Create an array of certain length and set the elements within it from
          start value to end value.
        */
        setPages(Array.from({ length }, (_, idx) => idx + start));
    };

    const getPop = (pop) => {
        setNewProductPop(pop)
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
        getProductsCount(authTokens.token)
        range(1, totalPageCount)
        // console.log(currPage)
    }, [Allproducts, newProductPop, currPage])

    return (
        <>
            {newProductPop === true ? <NewProduct getPop={getPop} /> : ""}
            <div className="path">Dashboard/Products</div>
            <div className="prod-container">
                {products.length > 0 && (
                    <div className="prod">
                        {products.map(product => (
                            <ProductBox key={product.productId} product={product} />
                        ))}
                    </div>
                )}

                <div className="prod-container-footer">
                    <div className="pagination">
                        {
                            currPage == 1 ?
                                <div className=""></div>
                                :
                                <div className="page-no" onClick={() => prevPage()}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </div>

                        }

                        {pages.length > 0 && (
                            <div className="p">
                                {pages.map(page => (
                                    // <ProductBox key={product.productId} product={product} />
                                    <div onClick={() => { setPage(page) }} className={currPage === page ? "active-page-no page-no" : "page-no"}>{page}</div>
                                ))}
                            </div>
                        )}
                        {
                            currPage == pages[pages.length - 1] ?
                                <div className=""></div>
                                :
                                <div className="page-no" onClick={() => nextPage()}>
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