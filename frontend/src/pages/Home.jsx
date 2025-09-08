import { Link } from "react-router-dom";

export default function Home({ user }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">NGO & Volunteer Platform</h1>
            <p className="text-gray-600 mb-6">
                A place where Volunteers donate handcrafted items & NGOs claim them.
            </p>

            {
                Object.keys(user).length == 0 && <div className="flex space-x-4">
                    <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Login
                    </Link>
                    <Link to="/register" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Register
                    </Link>
                </div>
            }

        </div>
    );
}
