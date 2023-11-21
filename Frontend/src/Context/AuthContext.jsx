import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router';

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
        const req = await fetch("http://localhost:3000/auth/loginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value }),
        });
        const res = await req.json();
        if (res.token) {
            setAuthTokens(res);
            localStorage.setItem("authTokens", JSON.stringify(res));
            setUser(jwtDecode(res.token));
            localStorage.setItem("user", JSON.stringify(jwtDecode(res.token).user));
            navigate("/home")
        } else {
            alert("error: " + res.message);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const contextData = {
        user,
        loginUser,
        logoutUser,
        authTokens,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;

}
