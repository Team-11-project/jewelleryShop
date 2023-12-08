import React, { useState } from 'react';
import './editCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

function EditCategory({ getPop }) {
    // Initialize formData state with hardcoded values
    const [formData, setFormData] = useState({
        id: Math.random(), // Assuming you want a random ID for illustrative purposes
        categoryName: "Necklaces",
        categoryDescription: "All Necklaces"
    });

    const handlePop = () => {
        getPop(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        // Update category logic here
        console.log("Update Category:", formData);
    };

    const handleDelete = () => {
        // Delete category logic here
        console.log("Delete Category ID:", formData.id);
    };

    return (
        <div className='edit-cat-popup'>
            <div className="edit-cat-popup-inner">
                <button className="cancel-btn" onClick={handlePop}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <form onSubmit={handleUpdate}>
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
                    <div className="edit-buttons">
                        <button type='button' onClick={handleDelete} className="delete-btn">
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                        <button type='submit' className="update-btn">
                            <FontAwesomeIcon icon={faUpload} /> Submit Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCategory;
