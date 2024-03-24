import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './subs.css'
import AuthContext from '../../Context/AuthContext';
import OrderSummany from './OrderSummany';

function Orders({ userId }) {
    let { authTokens } = useContext(AuthContext)
    const notify = (message) => toast(message);

    const [prevOrders, setPrevOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState({})
    const [view, setView] = useState(false)

    const getView = (view) => {
        setView(view)

    }
    //get Order
    const getOrder = (id) => {
        const found = prevOrders.find((element) => element.id == id);
        // console.log(found)
        setSelectedOrder(found)
    }
    //get orders
    const getOrders = async (userId) => {
        const token = authTokens.token
        // console.log(userId)
        // console.log(user?.user.id)
        try {
            const req = await fetch(` http://localhost:3001/orders/get-orders-by-customer/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            const res = await req.json();
            // console.log(res)
            setPrevOrders(res)

        } catch (error) { console.log(error) }

    }
    //order component
    const OrderComponent = (order) => {
        return (
            <>
                <div className="orderBox">
                    <div className="">
                        <p>Order Number: {order?.id}</p>
                        <p>Date: {order?.createdAt.split("T")[0]}</p>
                        <p>Total: {order?.totalPrice}</p>
                        <p>Status: {order?.status}</p>
                    </div>
                    <div className="">
                        <button onClick={() => { setView(true); setSelectedOrder(order) }}>view</button>
                    </div>

                </div>

            </>
        )

    }

    useEffect(() => {
        getOrders(userId)
    }, [view, selectedOrder])
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            {view === true ? <OrderSummany order={selectedOrder} getView={getView} /> : ""}
            <div className="displayT">Orders</div>

            <div className="ordersContainer">
                {prevOrders.length > 0 ? (
                    <>
                        {prevOrders.map(order => (
                            <div className="" key={order?.id}>
                                {OrderComponent(order)}
                            </div>
                        ))}
                    </>
                )
                    :
                    ("No Orders yet")
                }
            </div>
        </>
    )
}

export default Orders