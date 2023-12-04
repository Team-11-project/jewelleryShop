import React, { useEffect, useState } from 'react'
import "./productsBox.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faEllipsis, faInfo, faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

function ProductBox({ product, getChosenProd, getEditPop, getIsOption }) {

    const [isOption, setIsOption] = useState(false)
    const empty = {}

    const handleChosenProd = (prod) => {
        getChosenProd(prod)
    }

    const handleEditPop = (pop) => {
        getEditPop(pop)
    }

    const handleOption = (opt) => {
        // if (isOption === true) {
        //     getIsOption(true)
        // }
        getIsOption(opt)
    }

    const OptionMenu = () => {

        if (isOption === true) {
            return (
                <>
                    <div className="">
                        <button className="close-btn" onClick={() => { setIsOption(false); handleChosenProd(empty); handleOption(false) }}><FontAwesomeIcon icon={faXmark} /></button>

                        <div className="opened-menu">
                            <div className="option" onClick={() => { handleChosenProd(product); handleEditPop(true) }}><FontAwesomeIcon icon={faPenToSquare} /> Edit</div>
                            <div className="option"><FontAwesomeIcon icon={faTrash} />Delete</div>
                            <div className="option o-p"><FontAwesomeIcon icon={faCircleInfo} />View</div>
                        </div>
                    </div>

                </>
            )
        }
        else {
            return (
                <>
                    <div className="options-menu" onClick={() => { setIsOption(true); handleOption(true) }}><FontAwesomeIcon icon={faEllipsis} /></div>
                </>
            )
        }
    }

    return (
        <>
            {/* {editProdPop === true ? <EditProduct getEditPop={getEditPop} /> : ""} */}
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

                    <div className="detail-body">{product?.details.length > 140 ? `${product.details.substring(0, 130)}...` : product.details}</div>
                </div>
                <div className="box-foot">
                    {/* <div className="grey-box"> will add this later
                        <div className="level">
                            <div className="titl">Amount sold:</div>
                            <div className="val">300</div>
                        </div>
                    </div> */}
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