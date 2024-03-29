import React, { useContext, useEffect, useState } from 'react'
import './newProduct.css'
import AuthContext from '../../../../../../Context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ImageUpload from './ImageUpload'
import { toast } from 'react-toastify';

function NewProduct({ getPop }) {
    const notify = (message) => { toast(message) }

    let { authTokens } = useContext(AuthContext)

    const [categories, setCategories] = useState([])

    const handlePop = () => {
        getPop(false)
    }

    const [formData, setFormData] = useState({
        name: "",
        keywords: "",
        material: "",
        detail: "",
        price: 0,
        stock: 0,
        category: 0,
    })

    const [imageData, setImageData] = useState([])
    const getImage = (image) => {
        setImageData(image[0])
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = authTokens.token
        try {
            // console.log("submitted")
            // console.log(formData)
            // console.log(imageData)
            let data = new FormData();
            data.append('name', formData.name),
                data.append('keywords', formData.keywords),
                data.append('material', formData.material),
                data.append('detail', formData.detail),
                data.append('price', formData.price),
                data.append('stock', formData.stock),
                data.append('category', formData.category),
                data.append('file', imageData)
            const req = await fetch("http://localhost:3001/products/create-product", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            });
            const res = await req.json();
            if (res.status === 200) {
                notify(res.message)
                handlePop()
            } else {
                notify("error: " + res.message);
            }
        } catch (error) {
            console.log(error.message)
        }
    }



    const getCategories = async (token) => {
        try {
            // setIsLoading(true)
            let response = await fetch('http://localhost:3001/products/get-all-categories',
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                })
            const resJson = await response.json();
            if (response.status === 200) {
                // notify(response.message)
                // console.log(resJson, "response")
                setCategories(resJson.response);
            } else {
                console.log(resJson);
                notify("error: " + resJson.message)
            }

        }
        catch (error) {
            // setIsLoading(true)
            console.log(error)
        }

    }

    useEffect(() => {
        getCategories(authTokens.token)
    }, [authTokens])

    return (
        <div className='new-prod-popup'>
            <div className="new-prod-popup-inner">
                <button className="cancel-btn" onClick={() => handlePop()}><FontAwesomeIcon icon={faXmark} /></button>
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
                            <select name="category" id="" onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                <option value={0}>Select a category</option>
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
                                type="text"
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
                                type="text"
                                name="stock"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                        <div className="form-item">

                            <label>Product Image:</label>
                            <ImageUpload getImage={getImage} />
                            {/* <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            /> */}
                        </div>
                        <div className="submit-product">
                            <button type='submit'>Create Product</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewProduct