import { Link } from "react-router-dom";

export default function Header({ user, setUser }) {


    const handleLogout = () => {
        setUser({})
        localStorage.removeItem('token')
        localStorage.removeItem('userid')
        window.SharedArrayBuffer("/login")
    }

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    NGO Platform
                </Link>

                {
                    Object.keys(user).length > 0 && <span>Welcome, {user.name} ({user.role})</span>
                }

                {/* Nav Links */}
                <nav className="space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>

                    {
                        Object.keys(user).length > 0 && user.role == 'VOLUNTEER' ?
                            <>
                                <Link to="/publish" className="text-gray-700 hover:text-blue-500">Publish</Link>
                                <Link to="/myitems" className="text-gray-700 hover:text-blue-500">My Craft</Link>
                            </>
                            : Object.keys(user).length > 0 && user.role == 'NGO' &&
                            <>
                                <Link to="/allitems" className="text-gray-700 hover:text-blue-500">Products</Link>
                                <Link to="/Recieved" className="text-gray-700 hover:text-blue-500">My Recieved</Link>
                            </>
                    }
                    {
                        Object.keys(user).length > 0 ? <>
                            <Link onClick={handleLogout} className="text-red-700 hover:text-red-500">Logout</Link>
                        </> :
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
                                <Link to="/register" className="text-gray-700 hover:text-blue-500">Register</Link></>
                    }



                </nav>
            </div>
        </header >
    );
}
