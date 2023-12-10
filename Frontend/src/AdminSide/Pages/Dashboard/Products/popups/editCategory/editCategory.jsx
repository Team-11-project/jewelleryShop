import React, { useContext, useState } from 'react';
import './editCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../../../../Context/AuthContext';

function EditCategory({ getPop, selectedCat }) {
    let { authTokens } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        categoryName: selectedCat?.categoryName || "",
        description: selectedCat?.description || "", 
    });
    console.log(selectedCat)

    const handlePop = () => {
        getPop(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = authTokens.token
        try {

            const req = await fetch(`http://localhost:3000/products/update-category/${selectedCat?.id}`,
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

    const handleDelete = () => {
        // Delete category logic 
        console.log("Delete Category ID:", formData.id);
    };

    return (
        <div className='edit-cat-popup'>
            <div className="edit-cat-popup-inner">
                <button className="cancel-btn" onClick={handlePop}>
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
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
