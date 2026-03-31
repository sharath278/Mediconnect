import React from 'react';
import { Shield, Activity, Users, Video, Smartphone, Award, CreditCard } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        About <span className="text-indigo-600">MediConnect</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500">
                        Bridging the gap between patients and healthcare professionals through technology.
                    </p>
                </div>

                {/* Project Overview */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-indigo-100 p-3 rounded-lg">
                                <Activity className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Project Overview</h2>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            MediConnect is a comprehensive healthcare platform designed to simplify the process of finding and booking appointments with doctors.
                            Built as a <strong>College Project</strong>, it aims to demonstrate how modern web technologies can be applied to solve real-world problems in the healthcare sector.
                            Our platform focuses on user-friendly interfaces, secure data handling, and intelligent features like an AI-powered symptom checker.
                        </p>
                    </div>
                </div>

                {/* Features Section */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Activity className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Symptom Checker</h3>
                            <p className="text-gray-600">Analyze symptoms instantly and get recommendations on which specialist to visit.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <Users className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Doctor Booking</h3>
                            <p className="text-gray-600">Seamlessly search, filter, and book appointments with verified doctors in your area.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Dashboards</h3>
                            <p className="text-gray-600">Role-based dashboards for Patients, Doctors, and Admins to manage appointments and profiles.</p>
                        </div>
                    </div>
                </div>

                {/* Future Improvements */}
                <div className="bg-indigo-900 rounded-2xl shadow-xl overflow-hidden text-white">
                    <div className="p-8 sm:p-12">
                        <h2 className="text-3xl font-bold mb-8">Future Roadmap</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex gap-4">
                                <div className="bg-indigo-800 p-3 rounded-lg h-fit">
                                    <Video className="w-6 h-6 text-indigo-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Live Video Consultations</h3>
                                    <p className="text-indigo-200">Integrated video calling for remote checkups and follow-ups directly within the platform.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-indigo-800 p-3 rounded-lg h-fit">
                                    <Smartphone className="w-6 h-6 text-indigo-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Mobile Application</h3>
                                    <p className="text-indigo-200">Native mobile apps for iOS and Android to provide healthcare on the go.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-indigo-800 p-3 rounded-lg h-fit">
                                    <CreditCard className="w-6 h-6 text-indigo-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Payment Integration</h3>
                                    <p className="text-indigo-200">Secure online payment gateway for hassle-free consultation fee payments.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Team</h2>
                    <p className="text-gray-500 mb-10">The talented students behind this project.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Team Lead */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-600 transform transition hover:-translate-y-1">
                            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Sharath</h3>
                            <p className="text-indigo-600 font-medium text-sm uppercase tracking-wide">Team Lead</p>
                        </div>

                        {/* Team Member 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-300 hover:border-indigo-400 transition">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Ganesh Reddy</h3>
                            <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">Team Member</p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-300 hover:border-indigo-400 transition">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Santosh</h3>
                            <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">Team Member</p>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-300 hover:border-indigo-400 transition">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Ramu</h3>
                            <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">Team Member</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
