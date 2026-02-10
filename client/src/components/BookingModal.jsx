import React, { useState } from 'react';
import { X, Calendar, Clock, AlertCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, onSubmit, doctor }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!date || !time || !description) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        try {
            await onSubmit({ date, time, description });
            onClose(); // Close modal on success
            // Reset form
            setDate('');
            setTime('');
            setDescription('');
        } catch (err) {
            console.error("Booking error:", err);
            setError(err.response?.data?.message || 'Failed to book appointment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Background overlay */}
            <div
                className="fixed inset-0 bg-gray-500/75 transition-opacity"
                aria-hidden="true"
                onClick={onClose}
            ></div>

            {/* Modal panel */}
            <div className="relative bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full ring-1 ring-black/5">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <div className="flex justify-between items-center mb-5 border-b pb-3 border-gray-100">
                                <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                                    Book Appointment
                                    {doctor && <span className="block text-sm text-indigo-600 font-normal mt-1">with {doctor.name}</span>}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all focus:outline-none"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {error && (
                                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700 font-medium">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">
                                        Select Date
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-1">
                                        Select Time
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Clock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="time"
                                            name="time"
                                            id="time"
                                            className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                                        Problem Description
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="3"
                                            className="block w-full px-3 py-2.5 sm:text-sm border-gray-300 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none resize-none"
                                            placeholder="Describe your symptoms or reason for visit..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                    <button
                                        type="button"
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Booking...
                                            </>
                                        ) : 'Confirm Booking'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
