import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { Calendar, Clock, FileText, Plus, Bell, ChevronRight, Activity } from 'lucide-react';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await api.get('/appointments/my-appointments');
                setAppointments(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAppointments();
    }, []);

    // Find the next upcoming appointment
    const upcomingAppointment = appointments.find(apt =>
        apt.status === 'approved' || apt.status === 'pending'
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Welcome / Next Appointment Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Hello there!</h2>
                            <p className="text-indigo-100 text-lg mb-6">How are you feeling today?</p>

                            {upcomingAppointment ? (
                                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 inline-flex flex-col sm:flex-row gap-4 sm:items-center">
                                    <div className="bg-white text-indigo-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                                        {new Date(upcomingAppointment.date).getDate()}
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-indigo-100 font-semibold">Next Appointment</p>
                                        <p className="font-bold text-white text-lg">{upcomingAppointment.doctorInfo}</p>
                                        <div className="flex items-center gap-2 text-sm text-indigo-100 mt-1">
                                            <Clock size={14} /> {upcomingAppointment.time}
                                            <span className="w-1 h-1 bg-indigo-300 rounded-full"></span>
                                            <span>{upcomingAppointment.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 inline-block">
                                    <p className="text-white font-medium">No upcoming appointments</p>
                                    <Link to="/doctors" className="text-indigo-100 text-sm hover:text-white underline mt-1 block">
                                        Book one now
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="hidden sm:block opacity-80">
                            <Activity size={120} className="text-white/20" />
                        </div>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Calendar className="text-indigo-600" /> Your Appointments
                        </h3>
                        <Link to="/doctors" className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full transition">
                            New Appointment <Plus size={16} className="ml-1" />
                        </Link>
                    </div>

                    {appointments.length === 0 ? (
                        <div className="text-center py-10">
                            <Calendar className="mx-auto text-gray-300 mb-3" size={48} />
                            <p className="text-gray-500">No appointments scheduled yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {appointments.map((apt) => (
                                <div key={apt._id} className="group border border-gray-100 rounded-xl p-4 hover:shadow-md transition hover:border-indigo-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-12 rounded-full ${apt.status === 'approved' ? 'bg-green-500' :
                                                apt.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}></div>
                                        <div>
                                            <p className="font-bold text-gray-900 line-clamp-1">{apt.doctorInfo}</p>
                                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                <Calendar size={14} /> {apt.date}
                                                <span className="text-gray-300">|</span>
                                                <Clock size={14} /> {apt.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${apt.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                            {apt.status}
                                        </span>
                                        <button className="text-gray-400 hover:text-indigo-600 transition">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-8">
                {/* Quick Actions / Notifications */}
                <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Bell className="text-orange-500" /> Notifications
                    </h3>
                    <div className="space-y-4">
                        {/* Mock Notifications */}
                        <div className="flex gap-3 items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0 relative">
                            <div className="bg-blue-100 p-2 rounded-full shrink-0">
                                <Activity size={16} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">Complete your profile</p>
                                <p className="text-xs text-gray-500 mt-0.5">Add your medical history for better diagnosis.</p>
                            </div>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </div>
                    </div>
                </div>

                {/* Medical History Placeholder */}
                <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText className="text-indigo-600" /> Recent Documents
                    </h3>
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <FileText className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-sm text-gray-500">No medical records found.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
