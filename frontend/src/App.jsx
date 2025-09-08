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
import PublishItem from "./pages/PublishItem";
import MyItems from "./pages/MyItems";
import AllItems from "./pages/AllItems";
import Recieved from "./pages/Recieved";

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


                    localStorage.setItem('userid', res.data.user.id)

                    setUser(res.data.user);
                    localStorage.setItem("token", res.data.token);
                } catch (err) {
                    console.error(err);
                    toast.error(err.response?.data?.message || "Session expired");
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
                <Route path="/" element={<Home user={user} />} />
                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/register" element={<Register user={user} />} />
                <Route path="/publish" element={<PublishItem />} />
                <Route path="/myitems" element={<MyItems user={user} />} />
                <Route path="/allitems" element={<AllItems />} />
                <Route path="/recieved" element={<Recieved />} />
            </Routes>
        </>
    );
}

export default App;
