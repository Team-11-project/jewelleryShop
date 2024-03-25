import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

import { toast } from 'react-toastify';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const req = await fetch("http://localhost:3001/auth/loginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value }),
        });
        const res = await req.json();
        if (res.token) {
            notify("log in successful")
            setAuthTokens(res);
            localStorage.setItem("authTokens", JSON.stringify(res));
            setUser(jwtDecode(res.token));
            localStorage.setItem("user", JSON.stringify(jwtDecode(res.token).user));
            navigate("/")
        } else {
            notify("error: " + res.message);
        }
    };

    const autoLogOut = () => {
        const tokenDecode = jwtDecode(authTokens?.token)
        if (tokenDecode?.exp * 1000 < Date.now()) {
            localStorage.clear();
            navigate("/")
        }
    }

    const notify = (message) => toast(message);

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            // setIsLoading(true)
            let response = await fetch(`http://localhost:3001/products/get-all-products`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            const resJson = await response.json();
            if (response.status === 200) {
                // console.log(resJson.response)
                setProducts(resJson.response);
            } else {
                console.log(resJson);
                alert("error: " + resJson.message)
            }
        }
        catch (error) {
            // setIsLoading(true)
            console.log(error)
        }
    }

    const checkStocks = async () => {
        try {
            // console.log("------here!!!!!")
            if (user) {

                getProducts()
                if (user.user.role == "admin") {
                    if (!products.length < 1) {
                        for (let i = 0; i < products.length; i++) {
                            // console.log()
                            const id = products[i].productId
                            // console.log(id, "id")
                            const req = await fetch(`http://localhost:3001/notification/checkProd/${id}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            });
                            const res = await req.json();
                            // console.log(res)
                            if (res.status == 200) {
                                notify(res.message)
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    setTimeout(() => {
        // console.log("yo")
        checkStocks()
    }, 10 * 60 * 1000); //10 minutes

    useEffect(() => {
        // if (user) {
        //     autoLogOut()
        // }

    }, [])

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("user");
        setTimeout(() => {
            navigate("/");
        }, 1500);

    };

    const contextData = {
        user,
        setUser,
        loginUser,
        logoutUser,
        authTokens,
        checkStocks,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;

}
