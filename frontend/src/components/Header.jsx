import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    NGO Platform
                </Link>

                {/* Nav Links */}
                <nav className="space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                    <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
                    <Link to="/register" className="text-gray-700 hover:text-blue-500">Register</Link>
                </nav>
            </div>
        </header>
    );
}
