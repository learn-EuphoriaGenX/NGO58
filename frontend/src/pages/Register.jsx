import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Register() {
    const [role, setRole] = useState("volunteer");

    return (
        <div className="flex justify-center py-10 items-center min-h-[80vh] bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Register</h2>

                <form className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-gray-600 mb-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                        >
                            <option value="volunteer">Volunteer</option>
                            <option value="ngo">NGO</option>
                        </select>
                    </div>

                    {/* NGO Extra Fields */}
                    {role === "ngo" && (
                        <>
                            <div>
                                <label className="block text-gray-600 mb-1">NGO Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter NGO name"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">NGO Registration No</label>
                                <input
                                    type="text"
                                    placeholder="Enter registration number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">NGO Address</label>
                                <textarea
                                    placeholder="Enter NGO address"
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

    );
}
