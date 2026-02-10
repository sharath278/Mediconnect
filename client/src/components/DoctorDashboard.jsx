import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Calendar, CheckCircle, XCircle, Clock, Users, Activity } from 'lucide-react';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await api.get('/appointments/doctor-appointments');
                setAppointments(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAppointments();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put('/appointments/status', { appointmentId: id, status });
            // Refresh
            const { data } = await api.get('/appointments/doctor-appointments');
            setAppointments(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
    const todayAppointments = appointments.filter(apt => {
        // Simple string matching for demo purpose, ideally should use Date objects
        // Assuming apt.date is YYYY-MM-DD or similar
        const today = new Date().toISOString().split('T')[0];
        return apt.date === today && apt.status === 'approved';
    });
    const totalPatients = new Set(appointments.map(apt => apt.userId)).size; // Approximate unique patients

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{pendingAppointments.length}</h3>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Appointments</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{appointments.length}</h3>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                            <Calendar size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Unique Patients</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalPatients || appointments.length}</h3>
                        </div>
                        <div className="bg-green-50 p-3 rounded-xl text-green-600">
                            <Users size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Requests Column */}
                <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6 h-full">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Activity className="text-indigo-600" size={20} /> Pending Approvals
                    </h2>
                    {pendingAppointments.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No pending appointment requests.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingAppointments.map((apt) => (
                                <div key={apt._id} className="border border-gray-100 bg-gray-50 rounded-xl p-5 hover:border-indigo-100 transition">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="font-bold text-gray-900">{apt.userInfo}</p>
                                            <p className="text-xs text-gray-500 mt-1">{apt.date} at {apt.time}</p>
                                        </div>
                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => updateStatus(apt._id, 'approved')}
                                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
                                        >
                                            <CheckCircle size={16} /> Accept
                                        </button>
                                        <button
                                            onClick={() => updateStatus(apt._id, 'rejected')}
                                            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            <XCircle size={16} /> Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* All Appointments Column */}
                <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6 h-full">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Calendar className="text-indigo-600" size={20} /> Recent Appointments
                    </h2>
                    {appointments.length === 0 ? (
                        <p className="text-gray-500">No appointments found.</p>
                    ) : (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {appointments.map((apt) => (
                                <div key={apt._id} className="flex items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition rounded-lg">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold mr-4 shrink-0 
                                        ${apt.status === 'approved' ? 'bg-green-500' : apt.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                        {apt.userInfo.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{apt.userInfo}</p>
                                        <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium
                                        ${apt.status === 'approved' ? 'bg-green-50 text-green-700' :
                                            apt.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                        {apt.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
