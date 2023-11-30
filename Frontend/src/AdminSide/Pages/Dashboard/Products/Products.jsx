import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../../sideNav/sideNav'
import Navbar from '../../navbar/navbar'
import AuthContext from '../../../../Context/AuthContext'
import './products.css'
import ProductBox from './ProductBox'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewProduct from './popups/newProduct/NewProduct'

function Products() {
    let { authTokens } = useContext(AuthContext)

    const [products, setProducts] = useState([])
    const [newProductPop, setNewProductPop] = useState(false)

    const getPop = (pop) => {
        setNewProductPop(pop)
    }

    const getProducts = async (token, skip) => {
        try {
            // setIsLoading(true)
            let response = await fetch(`http://localhost:3000/products/get-all-products/${skip}`,
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
                setProducts(resJson.response);
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
        getProducts(authTokens.token, 1)
    }, [products, newProductPop])

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
                    <div className="pagination">pagination</div>
                    <div className="newButton">
                        <button onClick={() => setNewProductPop(true)}> <FontAwesomeIcon icon={faPlus} />New Product</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products