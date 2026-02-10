import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ShieldCheck, ArrowRight, Video, Phone, User } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
                                    <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
                                    24/7 Services Available
                                </div>
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Your Health, Our Technology.</span>{' '}
                                    <span className="block text-indigo-600">Trusted Doctors at Your Fingertips.</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Whether in person or online, MediConnect connects you with certified, compassionate healthcare professionals — quickly, safely, and effortlessly.
                                </p>
                                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                                    <Link to="/doctors" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg shadow-lg shadow-indigo-200 transition transform hover:-translate-y-1">
                                        Book Appointment
                                    </Link>
                                    <Link to="/about" className="flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg transition">
                                        See How It Works <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-indigo-50 flex items-center justify-center">
                    {/* Placeholder for the Doctor Image from reference */}
                    <div className="relative w-full h-full flex items-center justify-center p-12">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white opacity-60"></div>
                        {/*  Mockup of doctor image or illustration */}
                        <div className="relative z-10 w-full max-w-lg">
                            {/* Abstract shapes or image would go here */}
                            <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 absolute top-1/4 -left-12 animate-bounce-slow">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <ShieldCheck className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Verified Doctors</p>
                                    <p className="font-bold text-gray-800">100% Trusted</p>
                                </div>
                            </div>

                            <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Doctor" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />

                            <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center gap-4 absolute bottom-10 -right-8">
                                <div className="flex -space-x-2">
                                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/1.jpg" alt="" />
                                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/2.jpg" alt="" />
                                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/3.jpg" alt="" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold">1k+ Doctors</p>
                                    <p className="text-gray-500">Online now</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                            Medical Support for <br /> <span className="text-indigo-600">Every Need</span>
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            Comprehensive healthcare services designed to meet all your medical needs with convenience and expertise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "General Consultation", icon: <User className="w-8 h-8 text-white" />, color: "bg-blue-500" },
                            { title: "Specialist Advice", icon: <ShieldCheck className="w-8 h-8 text-white" />, color: "bg-indigo-500" },
                            { title: "Video Consulting", icon: <Video className="w-8 h-8 text-white" />, color: "bg-purple-500" },
                        ].map((service, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition duration-300 border border-gray-100 group">
                                <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-500 mb-6">Connect with top doctors for {service.title.toLowerCase()} from the comfort of your home.</p>
                                <Link to="/doctors" className="text-indigo-600 font-medium flex items-center group-hover:gap-2 transition-all">
                                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
