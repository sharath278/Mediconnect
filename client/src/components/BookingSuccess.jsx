import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const BookingSuccess = ({ doctor, date, time, onClose }) => {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        onClose(); // Close the modal (clean up)
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-6">
                Your appointment has been successfully booked.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 w-full mb-6 text-left border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Doctor</span>
                    <span className="text-sm font-semibold text-gray-900">{doctor?.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Date</span>
                    <span className="text-sm font-semibold text-gray-900">{date}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Time</span>
                    <span className="text-sm font-semibold text-gray-900">{time}</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                    onClick={onClose}
                    className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                    Close
                </button>
                <button
                    onClick={handleGoToDashboard}
                    className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default BookingSuccess;
