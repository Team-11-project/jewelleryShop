import React, { useContext, useState } from 'react';
import './newCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../../../../Context/AuthContext';

function NewCategory({ getPop }) {

    let { authTokens } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        categoryName: "",
        categoryDescription: ""
    });

    const handlePop = () => {
        getPop(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Category created", formData);
        const token = authTokens.token
        try {
            console.log("submitted")
            const req = await fetch("http://localhost:3001/products/create-category", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const res = await req.json();
            if (res.status === 200) {
                handlePop()
            } else {
                alert("error: " + res.message);
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <div className='new-cat-popup'>
            <div className="new-cat-popup-inner">
                <button className="cancel-btn" onClick={() => handlePop()}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label>Category Name:</label>
                        <input
                            type="text"
                            name="categoryName"
                            value={formData.categoryName}
                            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                            placeholder="Type name here" 
                        /> 
                    </div>
                    <div className="form-item">
                        <label>Category Description:</label>
                        <textarea
                            name="categoryDescription"
                            value={formData.categoryDescription}
                            onChange={(e) => setFormData({ ...formData, categoryDescription: e.target.value })}
                            placeholder="Type description here" 
                        />
                    </div>
                    <div className="create-category">
                        <button type='submit'>Create Category</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewCategory;
