import React, { useContext, useState } from 'react';
import './newCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function NewCategory({ getPop }) {
    const [formData, setFormData] = useState({
        categoryName: "",
        categoryDescription: ""
    });

    const handlePop = () => {
        getPop(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Category submitted", formData);
    };

    return (
        <div className='new-cat-popup'>
            <div className="new-cat-popup-inner">
                <button className="cancel-btn" onClick={() => getPop(false)}>
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
                    <div className="submit-category">
                        <button type='submit'>Create Category</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewCategory;
