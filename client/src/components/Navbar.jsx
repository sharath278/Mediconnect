import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Heart } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                                <Heart size={24} fill="currentColor" />
                            </div>
                            <span className="font-bold text-2xl text-gray-800 tracking-tight">Medi<span className="text-indigo-600">Connect</span></span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 transition font-medium">Home</Link>
                        <Link to="/doctors" className="text-gray-600 hover:text-indigo-600 transition font-medium">Find Doctors</Link>
                        <Link to="/symptom-checker" className="text-gray-600 hover:text-indigo-600 transition font-medium">Symptom Checker</Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
                                <button onClick={handleLogout} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</Link>
                        <Link to="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Find Doctors</Link>
                        <Link to="/symptom-checker" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Symptom Checker</Link>
                        {!user ? (
                            <>
                                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Login</Link>
                                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">Sign Up</Link>
                            </>
                        ) : (
                            <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
