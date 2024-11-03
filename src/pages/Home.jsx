import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth.context';

const Home = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard'); 
        }
    }, [user, navigate]);

    return (
        <div className="hero min-h-screen bg-gray-800">
            <div className="hero-overlay bg-opacity-70 bg-black"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-6xl font-extrabold text-white drop-shadow-md tracking-wide">
                        SE Zone
                    </h1>
                    <p className="mb-8 text-lg text-gray-300 drop-shadow-sm leading-relaxed">
                        Track your zones like never before with ZoneChecker! Effortlessly manage, monitor, and optimize your zones in real time. Experience peace of mind with our intuitive platform, designed for accuracy and efficiency.
                    </p>
                    <Link 
                        to="/login" 
                        className="btn btn-primary btn-lg px-12 py-4 font-semibold rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 transform hover:shadow-xl"
                    >
                        Start 
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
