
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex justify-between items-center bg-gray-100 p-4 shadow-md w-full">

            <div className="text-2xl font-bold text-blue-600">
                Task Manager
            </div>

            <div className="sm:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-700 focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>

            <div
                className={`${menuOpen ? "block" : "hidden"
                    } sm:flex sm:space-x-4 sm:items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-100 sm:bg-transparent shadow-md sm:shadow-none`}
            >
                <Link
                    to="/"
                    className="block sm:inline text-xl px-4 py-2 font-medium text-gray-700 hover:text-blue-600 hover:underline"
                >
                    Home
                </Link>
                <Link
                    to="/signup"
                    className="block sm:inline text-xl px-4 py-2 font-medium text-gray-700 hover:text-blue-600 hover:underline"
                >
                    Signup
                </Link>
                <Link
                    to="/login"
                    className="block sm:inline text-xl px-4 py-2 font-medium text-gray-700 hover:text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Header;
