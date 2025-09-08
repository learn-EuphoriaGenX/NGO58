import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BACKENDURL from "../config/url.config";

export default function Register({ user }) {
    const [role, setRole] = useState("volunteer");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "VOLUNTEER",
        ngoName: "",
        ngoRegNo: "",
        ngoType: "",
        ngoAddress: ""
    });

    const navigate = useNavigate();

    // handle input change
    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    // handle register
    async function handleRegister(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKENDURL}auth/register`, data);
            toast.success(res.data.message || "Registered successfully");
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Registration failed");
        }
    }

    if (Object.keys(user).length > 0) {
        return navigate('/')
    }

    return (
        <>
            <div className="flex justify-center py-10 items-center min-h-[80vh] bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Register</h2>

                    <form className="space-y-4" onSubmit={handleRegister}>
                        {/* Name */}
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-600 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-gray-600 mb-1">Role</label>
                            <select
                                name="role"
                                value={role}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    setData({ ...data, role: e.target.value });
                                }}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                            >
                                <option value="VOLUNTEER">Volunteer</option>
                                <option value="NGO">NGO</option>
                            </select>
                        </div>

                        {/* NGO Extra Fields */}
                        {role === "NGO" && (
                            <>
                                <div>
                                    <label className="block text-gray-600 mb-1">NGO Name</label>
                                    <input
                                        type="text"
                                        name="ngoName"
                                        value={data.ngoName}
                                        onChange={handleChange}
                                        placeholder="Enter NGO name"
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">NGO Type</label>
                                    <select
                                        name="ngoType"
                                        value={data.ngoType}
                                        onChange={(e) => {
                                            setData({ ...data, ngoType: e.target.value });
                                        }}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    >
                                        <option value="Charity">Charity</option>
                                        <option value="Non-Profit">Non-Profit</option>
                                        <option value="Foundation">Foundation</option>
                                        <option value="Trust">Trust</option>
                                    </select>

                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">NGO Registration No</label>
                                    <input
                                        type="text"
                                        name="ngoRegNo"
                                        value={data.ngoRegNo}
                                        onChange={handleChange}
                                        placeholder="Enter registration number"
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">NGO Address</label>
                                    <textarea
                                        name="ngoAddress"
                                        value={data.ngoAddress}
                                        onChange={handleChange}
                                        placeholder="Enter NGO address"
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    ></textarea>
                                </div>
                            </>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-gray-600 text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
