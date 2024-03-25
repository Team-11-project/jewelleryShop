import React, { useContext, useEffect, useState } from 'react';
import SideNav from '../../sideNav/sideNav';
import Navbar from '../../navbar/navbar';
import AuthContext from '../../../../Context/AuthContext';
import './products.css';
import ProductBox from './ProductBox';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewProduct from './popups/newProduct/NewProduct';
import EditProduct from './popups/editproduct/EditProduct';
import NewCategory from './popups/newCategory/newCategory';
import DeleteProduct from './popups/deleteProduct/DeleteProduct';
import ViewProduct from './popups/viewProduct/ViewProduct';
import { toast } from 'react-toastify';

function Products({ isNewCategory }) {
    const notify = (message) => { toast(message) }
    const { authTokens } = useContext(AuthContext);

    const [Allproducts, setAllProducts] = useState([]);
    const [productsCount, setProductsCount] = useState();
    const [newProductPop, setNewProductPop] = useState(false);


    const [editProdPop, setEditProdPop] = useState(false);
    const [deleteProductPop, setDeleteProductPop] = useState(false);
    const [viewProductPop, setViewProductPop] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOption, setIsOption] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredProducts = Allproducts.filter(product =>
        product?.name.toLowerCase().includes(searchTerm)
    );

    const [chosenProd, setChosenProd] = useState({});
    const [pages, setPages] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const totalPageCount = Math.ceil(filteredProducts.length / 6);
    const lastIndex = currPage * 6;
    const firstIndex = lastIndex - 6;
    const products = filteredProducts.slice(firstIndex, lastIndex);
    const prodLength = products.length;


    const range = (start, end) => {
        let length = end - start + 1;
        setPages(Array.from({ length }, (_, idx) => idx + start));
    };

    const getPop = (pop) => {
        setNewProductPop(pop);
    };

    const getIsOption = (opt) => {
        setIsOption(opt);
    };

    const getChosenProd = (prod) => {
        setChosenProd(prod);
    };

    const getEditPop = (pop) => {
        setEditProdPop(pop);
    };

    const openDeletePopup = (value) => {
        setChosenProd(value);
        setDeleteProductPop(true);
    };

    const openViewProduct = (product) => {
        setSelectedProduct(product);
        setViewProductPop(true);
    };

    const closeViewProduct = () => {
        setSelectedProduct(null);
        setViewProductPop(false);
    };

    const prevPage = () => {
        if (currPage > 1) {
            setCurrPage(currPage - 1);
        }
    };

    const nextPage = () => {
        if (currPage < pages[pages.length - 1]) {
            setCurrPage(currPage + 1);
        }
    };

    const setPage = (page) => {
        setCurrPage(page);
    };

    const getProductsCount = async (token) => {
        try {
            let response = await fetch(`http://localhost:3001/products/get-all-products-count`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const resJson = await response.json();
            if (response) {
                setProductsCount(resJson);
            } else {
                console.log(resJson);
                alert('error: ' + resJson);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getProducts = async (token) => {
        try {
            let response = await fetch(`http://localhost:3001/products/get-all-products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const resJson = await response.json();
            if (response.status === 200) {
                setAllProducts(resJson.response);
            } else {
                console.log(resJson);
                notify('error: ' + resJson.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts(authTokens.token);
        range(1, totalPageCount);
    }, [authTokens, totalPageCount]);

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value.toLowerCase();
        setSearchTerm(newSearchTerm);
    };



    const filterProducts = (newSearchTerm) => {
        if (newSearchTerm === '') {
            // If the search term is empty, reset the products list to show all products
            setAllProducts(Allproducts);
        } else {
            // Filter the products based on the new search term combined with the previous one
            const filteredProducts = Allproducts.filter((product) => {
                return product.name.toLowerCase().includes(newSearchTerm);
            });
            setAllProducts(filteredProducts);
        }
    };

    return (
        <>
            {newProductPop === true ? <NewProduct getPop={getPop} /> : ''}
            {editProdPop === true ? <EditProduct getEditPop={getEditPop} chosenProd={chosenProd} getIsOption={getIsOption} /> : ''}
            {deleteProductPop && <DeleteProduct getDeletePop={setDeleteProductPop} chosenProd={chosenProd} />}
            {viewProductPop && <ViewProduct product={selectedProduct} closeDetailView={closeViewProduct} />}

            {/* <div className="path">Dashboard/Products</div> */}
            <div className="product-container">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    className="search-bar"
                />

                {products.length > 0 && (
                    <>
                        <div className="prod">
                            {products.map((product) => (
                                <ProductBox
                                    key={product.productId}
                                    product={product}
                                    getChosenProd={getChosenProd}
                                    getEditPop={getEditPop}
                                    getIsOption={getIsOption}
                                    openDeletePopup={openDeletePopup}
                                    openViewProduct={openViewProduct}
                                />
                            ))}
                        </div>
                    </>
                )}

                <div className="prod-container-footer">
                    <div className="pagination">
                        {currPage == 1 ? (
                            <div className=""></div>
                        ) : (
                            <div className="page-no" onClick={() => { prevPage(); /*getProducts(authTokens.token); */ }}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                        )}

                        {pages.length > 0 && (
                            <div className="p">
                                {pages.map((page) => (
                                    <div
                                        key={page}
                                        onClick={() => {
                                            setPage(page);
                                        }}
                                        className={currPage === page ? 'active-page-no page-no' : 'page-no'}
                                    >
                                        {page}
                                    </div>
                                ))}
                            </div>
                        )}
                        {pages.length > 6 && <div className="page-no">...</div>}
                        {currPage == pages[pages.length - 1] ? (
                            <div className=""></div>
                        ) : (
                            <div className="page-no" onClick={() => { nextPage(); getProducts(authTokens.token); }}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        )}
                    </div>
                    <div className="newButton">
                        <button onClick={() => setNewProductPop(true)}> <FontAwesomeIcon icon={faPlus} />New Product</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;