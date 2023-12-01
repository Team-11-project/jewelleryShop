import React, { useContext, useEffect, useState } from 'react'
import './editProduct.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../../../../../Context/AuthContext'

function EditProduct({ getEditPop, chosenProd, getIsOption }) {

    // const categories = [2, 3, 4]

    let { authTokens } = useContext(AuthContext)

    const [categories, setCategories] = useState([])

    const [formData, setFormData] = useState({
        name: chosenProd?.name || "",
        keywords: chosenProd?.keywords || "",
        material: chosenProd?.material || "",
        detail: chosenProd?.details || "",
        price: chosenProd?.price || 0,
        image: chosenProd?.image || "",
        stock: chosenProd?.stock || 0,
        category: chosenProd?.category?.id || 0,
    })

    const handlePop = (pop) => {
        getEditPop(pop)
    }

    const handleIsOption = (opt) => {
        getIsOption(opt)
    }

    const getCategories = async (token) => {
        try {
            // setIsLoading(true)
            let response = await fetch('http://localhost:3000/products/get-all-categories',
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
                setCategories(resJson.response);
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = authTokens.token
        console.log(chosenProd.productId, "chosen")
        try {

            console.log("submitted")
            console.log(formData)
            const req = await fetch(`http://localhost:3000/products/${chosenProd?.productId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });
            const res = await req.json();
            if (res.status === 200) {
                handlePop(false)
                handleIsOption(false)
            } else {
                alert("error: " + res.message);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getCategories(authTokens.token)
    }, [authTokens])

    return (
        <div className='new-prod-popup'>
            <div className="new-prod-popup-inner">
                <button className="cancel-btn" onClick={() => { handlePop(false); }}><FontAwesomeIcon icon={faXmark} /></button>
                <form action="" onSubmit={handleSubmit}>
                    <div className="left-form">
                        <div className="form-item">
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-item">
                            <label>Product Category:</label>
                            <select name="category" id="" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} >
                                {categories.map(category =>
                                    <option key={category.id} value={category.id}>{category.categoryName}</option>)}
                            </select>
                        </div>
                        <div className="form-item">
                            <label>Product Material:</label>
                            <input
                                type="text"
                                name="material"
                                value={formData.material}
                                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                            />
                        </div>
                        <div className="form-item">
                            <label>Product Details:</label>
                            <textarea
                                name="detail"
                                id=""
                                cols="30"
                                rows="10"
                                value={formData.detail}
                                onChange={(e) => setFormData({ ...formData, detail: e.target.value })}></textarea>

                        </div>
                        <div className="form-item">
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div className="form-item">
                            <label>Product Keywords:</label>
                            <input
                                type="text"
                                name="keywords"
                                value={formData.keywords}
                                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="right-form">
                        <div className="form-item">
                            <label>Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                        <div className="form-item">
                            <label>Product Image:</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        <div className="submit-product">
                            <button type='submit'>Submit Edit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProduct