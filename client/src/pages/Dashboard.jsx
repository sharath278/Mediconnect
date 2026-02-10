import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PatientDashboard from '../components/PatientDashboard';
import DoctorDashboard from '../components/DoctorDashboard';
import AdminDashboard from '../components/AdminDashboard';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, {user.name}</h1>

                {user.role === 'patient' && <PatientDashboard />}
                {user.role === 'doctor' && <DoctorDashboard />}
                {user.role === 'admin' && <AdminDashboard />}
            </div>
        </div>
    );
};

export default Dashboard;
