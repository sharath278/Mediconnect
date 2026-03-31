import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch approved doctors
        const fetchDoctors = async () => {
            try {
                const { data } = await api.get('/doctors');
                setDoctors(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, []);

    const handleBook = (doctor) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleBookingSubmit = async (bookingData) => {
        const { date, time, description } = bookingData;
        // The modal handles the try/catch and success UI
        // We just need to trigger the API call here which the modal calls
        await api.post('/appointments/book', {
            doctorId: selectedDoctor._id,
            date,
            time,
            problemDescription: description
        });
        // alert('Appointment booked successfully!'); // Handled by BookingModal
        // setIsModalOpen(false); // Handled by BookingModal
    };

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900">Find the Right Doctor</h1>
                    <p className="mt-4 text-gray-500">Search by name or specialization</p>

                    <div className="mt-6 max-w-md mx-auto relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm shadow-sm transition duration-150 ease-in-out"
                            placeholder="Search doctors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor._id} className="bg-white overflow-hidden shadow rounded-2xl hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                        {doctor.name.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                                        <p className="text-sm text-indigo-600 font-medium">{doctor.specialization}</p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Star size={16} className="text-yellow-400 fill-current" /> {doctor.experience} Years Experience
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Hospital:</span> {doctor.hospital || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Address:</span> {doctor.address || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Contact:</span> {doctor.phone || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Consultation Fee: <span className="font-semibold text-gray-900">${doctor.feesPerCunsultation}</span>
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <button
                                        onClick={() => handleBook(doctor)}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors"
                                    >
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleBookingSubmit}
                doctor={selectedDoctor}
            />
        </div>
    );
};

export default Doctors;
