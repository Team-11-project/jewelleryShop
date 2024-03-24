import React from 'react'

function CreateReview({ getIsReview, item }) {
    return (
        <div className="createReviewContainer">
            <div className="createReviewBox">
                <button onClick={() => { getIsReview(false) }}>close</button>
                <p>{item?.name}</p>
            </div>
        </div>
    )
}

export default CreateReview