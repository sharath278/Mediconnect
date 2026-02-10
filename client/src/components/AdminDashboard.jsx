import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Users, UserPlus, Calendar, Trash2, Check, Plus, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('doctors');
    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [showAddDoctor, setShowAddDoctor] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        name: '', email: '', password: '', specialization: '', experience: '', feesPerCunsultation: '', phone: '', timings: {}, hospital: '', address: ''
    });

    const fetchData = async () => {
        try {
            const doctorsRes = await api.get('/admin/doctors');
            setDoctors(doctorsRes.data.data);
            const usersRes = await api.get('/admin/users');
            setUsers(usersRes.data.data);
            const appointmentsRes = await api.get('/appointments/all');
            setAppointments(appointmentsRes.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = async (doctorId) => {
        try {
            await api.put('/admin/approve-doctor', { doctorId, status: 'approved' });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteDoctor = async (doctorId) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) return;
        try {
            await api.delete(`/admin/delete-doctor/${doctorId}`);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            // Basic timings formatting for the demo
            const doctorData = { ...newDoctor, timings: { "Mon-Fri": "09:00-17:00" } };
            await api.post('/admin/add-doctor', doctorData);
            setShowAddDoctor(false);
            setNewDoctor({ name: '', email: '', password: '', specialization: '', experience: '', feesPerCunsultation: '', phone: '', timings: {}, hospital: '', address: '' });
            fetchData();
            alert("Doctor added successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to add doctor");
        }
    };

    // Stats Calculation
    const totalDoctors = doctors.length;
    const totalUsers = users.length;
    const totalAppointments = appointments.length;
    const pendingDoctors = doctors.filter(d => d.status === 'pending').length;

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Doctors</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalDoctors}</h3>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                        <UserPlus size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Users</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalUsers}</h3>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                        <Users size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Appointments</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalAppointments}</h3>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl text-green-600">
                        <Calendar size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Pending Approvals</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{pendingDoctors}</h3>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
                        <Activity size={24} />
                    </div>
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100">
                    <button
                        className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'doctors' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('doctors')}
                    >
                        Manage Doctors
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'appointments' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('appointments')}
                    >
                        All Appointments
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'users' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Registered Users
                    </button>
                </div>

                <div className="p-6">
                    {/* Doctors Tab */}
                    {activeTab === 'doctors' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Doctor List</h3>
                                <button
                                    onClick={() => setShowAddDoctor(!showAddDoctor)}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-md shadow-indigo-200"
                                >
                                    <Plus size={18} /> Add Doctor
                                </button>
                            </div>

                            {showAddDoctor && (
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 animate-fade-in-down">
                                    <h3 className="text-md font-bold text-gray-700 mb-4">New Doctor Details</h3>
                                    <form onSubmit={handleAddDoctor} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" placeholder="Name" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} />
                                        <input type="email" placeholder="Email" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.email} onChange={e => setNewDoctor({ ...newDoctor, email: e.target.value })} />
                                        <input type="password" placeholder="Password" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.password} onChange={e => setNewDoctor({ ...newDoctor, password: e.target.value })} />
                                        <input type="text" placeholder="Specialization" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.specialization} onChange={e => setNewDoctor({ ...newDoctor, specialization: e.target.value })} />
                                        <input type="number" placeholder="Experience (years)" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.experience} onChange={e => setNewDoctor({ ...newDoctor, experience: e.target.value })} />
                                        <input type="number" placeholder="Fees" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.feesPerCunsultation} onChange={e => setNewDoctor({ ...newDoctor, feesPerCunsultation: e.target.value })} />
                                        <input type="text" placeholder="Phone" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.phone} onChange={e => setNewDoctor({ ...newDoctor, phone: e.target.value })} />
                                        <input type="text" placeholder="Hospital" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.hospital} onChange={e => setNewDoctor({ ...newDoctor, hospital: e.target.value })} />
                                        <input type="text" placeholder="Address" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required value={newDoctor.address} onChange={e => setNewDoctor({ ...newDoctor, address: e.target.value })} />
                                        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                            <button type="button" onClick={() => setShowAddDoctor(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                                            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200">Save Doctor</button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {doctors.map((doc) => (
                                            <tr key={doc._id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                                            {doc.name.charAt(0)}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                                                            <div className="text-sm text-gray-500">{doc.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{doc.specialization}</div>
                                                    <div className="text-sm text-gray-500">{doc.hospital}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doc.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {doc.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-3">
                                                        {doc.status === 'pending' && (
                                                            <button onClick={() => handleApprove(doc._id)} className="text-green-600 hover:text-green-900" title="Approve">
                                                                <Check size={18} />
                                                            </button>
                                                        )}
                                                        <button onClick={() => handleDeleteDoctor(doc._id)} className="text-red-600 hover:text-red-900" title="Delete">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">All Appointments History</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {appointments.map((apt) => (
                                            <tr key={apt._id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{apt.userInfo}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{apt.doctorInfo}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apt.date} at {apt.time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                         ${apt.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                        {apt.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {appointments.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No appointments found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Users</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {users.map((u) => (
                                    <div key={u._id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-gray-900">{u.name}</p>
                                            <p className="text-xs text-gray-500">{u.email}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs uppercase font-bold tracking-wide 
                                            ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                u.role === 'doctor' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'}`}>
                                            {u.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
