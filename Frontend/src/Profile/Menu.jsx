import React, { useContext, useState } from 'react'
import './menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCircleInfo, faRightLeft, faComments, faHeart, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import PersonalInfo from './subs/PersonalInfo'

function Menu({ setP }) {
    // console.log(setP, "setp")
    // const [page, setPage] = useState(0)
    let { user, logoutUser } = useContext(AuthContext)
    const u = user?.user


    const menuItems = [
        { name: "Personal Information", page: 0, icon: faCircleInfo, },
        { name: "Orders", page: 1, icon: faCartShopping },
        { name: "Returns", page: 2, icon: faRightLeft },
        { name: "My Reviews", page: 3, icon: faComments },
        { name: "My Wishlist", icon: faHeart, link: "/#" },
        { name: "Change Password", icon: faLock, link: "/forgotPassword" },
        { name: "Logout", icon: faRightFromBracket, func: logoutUser },
    ]



    return (
        <>
            <div className="menuContainer">
                <div className="menuTop">
                    <p>Hello {u?.firstName} {u?.lastName} &#128075;</p>
                </div>
                {menuItems.length > 0 && (
                    <>
                        {menuItems.map(item => (
                            <div className="menuItem" key={item.name} onClick={() => { setP(item.page) }}>
                                <FontAwesomeIcon icon={item.icon} />
                                {item.link ? <Link to={item.link}>{item.name}</Link> : <p onClick={item.func}>{item.name}</p>}
                            </div>

                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default Menu