import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BACKENDURL from "./config/url.config";

function App() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await axios.get(
                        `${BACKENDURL}auth/me`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    
                    localStorage.setItem("token", res.data.token);
                    setUser(res.data.user);
                } catch (err) {
                    console.error(err);
                    toast.error(err.response?.data?.message || "Session expired");
                    setUser({});
                    localStorage.removeItem("token");
                }
            }
        };

        checkAuth();
    }, []); // run once on mount

    return (
        <>
            <ToastContainer />
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/register" element={<Register user={user} />} />
            </Routes>
        </>
    );
}

export default App;
