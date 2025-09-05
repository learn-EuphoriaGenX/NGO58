import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BACKENDURL from "../config/url.config";
import axios from "axios";

export default function Login({ user, setUser }) {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        // Fake validation (replace with API call later)
        if (!email || !password) {
            toast.error("Please fill all fields!");
            return;
        }

        try {
            const res = await axios.post(`${BACKENDURL}auth/login`, { email, password });
            toast.success(res.data.message || "Login successfully");
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user)
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    if (Object.keys(user).length > 0) {
        return navigate('/')
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-600 text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
