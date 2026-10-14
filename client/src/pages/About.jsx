import React from 'react';
import { Shield, Activity, Users, Video, Smartphone, CreditCard } from 'lucide-react';

const About = () => {
    return (
        <div className="relative min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
            {/* Decorative Ambient Background Blobs */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-20 right-1/4 translate-x-1/2 w-[450px] h-[450px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="max-w-6xl mx-auto space-y-20 relative">

                {/* Header Section */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100/80 uppercase tracking-wider">
                        <Activity className="w-3.5 h-3.5" /> College Project Innovation
                    </span>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
                        About <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 bg-clip-text text-transparent">MediConnect</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                        Bridging the gap between patients and healthcare professionals through seamless, intelligent technology.
                    </p>
                </div>

                {/* Project Overview */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-100/50 border border-slate-100/80 overflow-hidden transition hover:shadow-2xl hover:shadow-slate-200/50 duration-500">
                    <div className="p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6 text-left">
                            <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Overview</h2>
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                                MediConnect is a comprehensive healthcare platform designed to simplify the process of finding and booking appointments with doctors.
                            </p>
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                                Built as a forward-thinking <strong className="text-indigo-600 font-semibold">College Project</strong>, it demonstrates how modern web technologies can be seamlessly applied to solve real-world complexities in the healthcare sector. Our platform focuses on intuitive user interfaces, secure data handling, and intelligent features.
                            </p>
                        </div>
                        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                            <div className="bg-indigo-50/40 p-6 rounded-2xl border border-indigo-50 space-y-2 text-left">
                                <div className="text-indigo-600 font-bold text-lg">AI-Powered</div>
                                <div className="text-sm text-slate-600 leading-normal">Smart checker for preliminary analysis.</div>
                            </div>
                            <div className="bg-emerald-50/40 p-6 rounded-2xl border border-emerald-50 space-y-2 text-left">
                                <div className="text-emerald-600 font-bold text-lg">Instant</div>
                                <div className="text-sm text-slate-600 leading-normal">Quick and seamless booking workflows.</div>
                            </div>
                            <div className="bg-purple-50/40 p-6 rounded-2xl border border-purple-50 space-y-2 text-left">
                                <div className="text-purple-600 font-bold text-lg">Secure</div>
                                <div className="text-sm text-slate-600 leading-normal">Role-based data access for patients & doctors.</div>
                            </div>
                            <div className="bg-blue-50/40 p-6 rounded-2xl border border-blue-50 space-y-2 text-left">
                                <div className="text-blue-600 font-bold text-lg">Modern</div>
                                <div className="text-sm text-slate-600 leading-normal">Built using React and TailwindCSS.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="space-y-12">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Key Features</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Explore the tools we've engineered to improve the patient-doctor experience.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-slate-100/30 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left">
                            <div>
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                    <Activity className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-950 mb-3">AI Symptom Checker</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Analyze symptoms instantly through our advanced checker flow and get guidance on which specialist to consult.
                                </p>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-slate-100/30 border border-slate-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-50/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left">
                            <div>
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                    <Users className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-950 mb-3">Doctor Booking</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Seamlessly search, filter, and book slots with verified healthcare professionals near you with instant validation.
                                </p>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-slate-100/30 border border-slate-100 hover:border-purple-100 hover:shadow-xl hover:shadow-purple-50/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left">
                            <div>
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                    <Shield className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-950 mb-3">Secure Dashboards</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Role-based dashboard systems custom-tailored for Patients, Doctors, and Administrators to monitor appointments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Future Roadmap Section */}
                <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-white">
                    {/* Decorative Glow within the Dark Box */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="p-8 sm:p-12 lg:p-16 relative z-10 space-y-12">
                        <div className="text-center md:text-left space-y-3">
                            <span className="text-indigo-400 font-semibold text-xs uppercase tracking-wider">Evolution Plan</span>
                            <h2 className="text-3xl font-extrabold tracking-tight">Future Roadmap</h2>
                            <p className="text-slate-400 max-w-xl text-sm">Strategic features planned to extend the capability and scope of the MediConnect platform.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800/80 hover:bg-slate-800/60 transition duration-300 space-y-4">
                                <div className="w-12 h-12 bg-indigo-950/80 rounded-xl flex items-center justify-center border border-indigo-900/50">
                                    <Video className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Phase 1</span>
                                    <h3 className="text-lg font-bold text-white mt-1 mb-2">Live Video Consultations</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">Integrated video conferencing for remote diagnoses and patient follow-ups directly within the application.</p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800/80 hover:bg-slate-800/60 transition duration-300 space-y-4">
                                <div className="w-12 h-12 bg-indigo-950/80 rounded-xl flex items-center justify-center border border-indigo-900/50">
                                    <Smartphone className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Phase 2</span>
                                    <h3 className="text-lg font-bold text-white mt-1 mb-2">Mobile Application</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">Native iOS and Android mobile apps leveraging native device features to provide healthcare access on the go.</p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800/80 hover:bg-slate-800/60 transition duration-300 space-y-4">
                                <div className="w-12 h-12 bg-indigo-950/80 rounded-xl flex items-center justify-center border border-indigo-900/50">
                                    <CreditCard className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Phase 3</span>
                                    <h3 className="text-lg font-bold text-white mt-1 mb-2">Payment Integration</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">Secure, encrypted online payment gateways for consultation fees, billing, and hassle-free transactions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
