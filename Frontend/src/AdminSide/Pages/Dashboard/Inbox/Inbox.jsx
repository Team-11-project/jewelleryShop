import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../../Context/AuthContext';
import './inbox.css'
import img1 from '../../../../Profile/subs/pexels-dima-valkov-3266700-2-2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';

function Inbox() {

    const imgPath = "../../../../assets/"
    let { authTokens, user } = useContext(AuthContext)
    const notify = (message) => toast(message);
    const userId = user?.user?.id
    const [messages, setMessages] = useState([])
    const [selectedMessage, setSelectedMessage] = useState({})
    const [del, setDel] = useState(null)

    const getMessage = (id) => {
        const found = messages.find((element) => element.id == id);
        // console.log(found)
        setSelectedMessage(found)
    }

    //fetch messages
    const getMessages = async () => {
        const token = authTokens?.token
        // console.log(userId)
        // console.log(user?.user.id)
        try {
            const req = await fetch(`http://localhost:3001/notification/getAllNotifications`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    }
                });
            const res = await req.json();
            console.log(res)
            setMessages(res)

        } catch (error) { console.log(error) }

    }

    //delete message
    const deleteMessage = async (id) => {
        const token = authTokens.token
        try {
            const req = await fetch(`http://localhost:3001/notification/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            const res = await req.json();
            if (res.status == 200) {
                notify(res.message)
                setDel(null)
            }


        } catch (error) {
            notify(error)
        }
    }

    useEffect(() => {
        getMessages()
    }, [del])

    //empty state
    const EmptyState = () => {
        return (<>
            <div className="">
                No notifications
            </div>
        </>)

    }

    //message component
    const MessageComponent = (message) => {
        if (messages.length < 1) {
            return (
                <EmptyState />
            )
        }
        else {
            return (
                <div className="messageComponent">
                    <div className="topSect">
                        <div className="topLeft">
                            <img className="prodImg" src={imgPath + message?.product?.image} alt="image" />
                            <div className="">
                                <p>{message?.product.name}</p>
                                <p className='message'>{message?.message}</p>
                            </div>

                        </div>

                        <FontAwesomeIcon color={"red"} icon={faTrash} onClick={() => { setDel(message?.id); deleteMessage(message.id) }} />
                    </div>



                </div>
            )

        }

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            <div className='inbox-container'>

                <p className='mes-T'>Notifications:</p>
                {messages && (
                    <>
                        {messages.map(message => (
                            <div className="" key={message.id}>
                                {MessageComponent(message)}
                            </div>
                        ))}
                    </>
                )}

            </div>
        </>
    )
}

export default Inbox