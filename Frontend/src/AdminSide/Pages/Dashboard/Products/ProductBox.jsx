import React, { useState } from 'react'
import "./productsBox.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faEllipsis, faInfo, faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

function ProductBox({ product }) {

    const [isOption, setIsOption] = useState(false)

    const OptionMenu = () => {
        // if (isOption == true) {
        //     return (
        //         <>
        //             <div className="options-menu">
        //                 <button onClick={() => { setIsOption(false) }}> close </button>
        //             </div>
        //         </>
        //     )
        // }
        // return (
        //     <>
        //         <div className="options-menu">
        //             <button onClick={setIsOption(true)}> <FontAwesomeIcon icon={faEllipsis} /></button>
        //         </div>
        //     </>
        // )

        if (isOption === true) {
            return (
                <>
                    <div className="">
                        <button className="close-btn" onClick={() => setIsOption(false)}><FontAwesomeIcon icon={faXmark} /></button>

                        <div className="opened-menu">
                            <div className="option"><FontAwesomeIcon icon={faPenToSquare} /> Edit</div>
                            <div className="option"><FontAwesomeIcon icon={faTrash} />Delete</div>
                            <div className="option o-p"><FontAwesomeIcon icon={faCircleInfo} />View</div>
                        </div>
                    </div>

                </>
            )
            // console.log("menu is open")
        }
        else {
            return (
                <>
                    <div className="options-menu" onClick={() => setIsOption(true)}><FontAwesomeIcon icon={faEllipsis} /></div>
                </>
            )
            // console.log("menu is closed")
        }
    }

    return (
        <>
            <div className="box-container">
                <div className="box-head">
                    <div className="prod-image"></div>
                    <div className="deets">
                        <div className="prod-det">
                            <div className="name">{product?.name}</div>
                            <div className="material">{product?.material}</div>
                            <div className="price">£{product?.price}</div>
                        </div>
                        {OptionMenu()}


                    </div>
                </div>
                <div className="box-body">
                    <div className="detail-head">Detail</div>
                    <div className="detail-body">{product?.details}</div>
                </div>
                <div className="box-foot">
                    <div className="grey-box">
                        <div className="level">
                            <div className="titl">Amount sold:</div>
                            <div className="val">300</div>
                        </div>
                    </div>
                    <div className="b-line"></div>
                    <div className="grey-box-2">
                        <div className="level l2">
                            <div className="titl">Stock level:</div>
                            <div className="val">{product?.stock}</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductBox