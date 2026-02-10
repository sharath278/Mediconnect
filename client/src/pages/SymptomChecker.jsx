import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, ArrowRight, Stethoscope, ShieldAlert } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

const SymptomChecker = () => {
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch doctors on mount so we can filter them later
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await api.get('/doctors');
                setDoctors(data.data);
            } catch (err) {
                console.error("Failed to fetch doctors", err);
            }
        };
        fetchDoctors();
    }, []);

    const checkSymptoms = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const { data } = await api.post('/ai/analyze', { symptoms });
            setResult(data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to analyze symptoms. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filter doctors based on recommended specialization
    const recommendedDoctors = result
        ? doctors.filter(doc => doc.specialization.toLowerCase() === result.specialization.toLowerCase() || doc.specialization.toLowerCase() === 'general physician')
        : [];

    const handleBook = (doctorId) => {
        const doctor = doctors.find(d => d._id === doctorId);
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleBookingSubmit = async (bookingData) => {
        const { date, time, description } = bookingData;
        // The modal handles the try/catch for the API call to show specific errors
        // We pass the problemDescription from the modal, but we can also append the diagnosis if needed
        // For now, let's use the user provided description, or pre-fill it with diagnosis?
        // The prompt version used result.diagnosis as problemDescription. 
        // Let's modify the modal to accept initialDescription or let the user type it.
        // The prompt version: const problemDescription = result.diagnosis;
        // The modal version: user types it.
        // Let's stick to the modal's behavior (user types it) but maybe we can pre-fill it if we pass it to modal?
        // The current BookingModal doesn't support pre-filling description via props.
        // So we will just use the description from the form.

        await api.post('/appointments/book', {
            doctorId: selectedDoctor._id,
            date,
            time,
            problemDescription: description
        });
        alert('Appointment booked successfully!');
        setIsModalOpen(false);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Input Section */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                    <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Activity className="h-6 w-6" />
                            <h3 className="text-lg font-bold">AI Symptom Checker</h3>
                        </div>
                    </div>
                    <div className="p-6 sm:p-8">
                        <p className="text-gray-600 mb-6">
                            Describe your symptoms in detail (e.g., "I have a severe headache and sensitivity to light"). Our AI will analyze the risk and suggest the right specialist.
                        </p>
                        <form onSubmit={checkSymptoms}>
                            <div>
                                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Symptoms
                                </label>
                                <textarea
                                    id="symptoms"
                                    name="symptoms"
                                    rows={4}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-xl p-4 resize-none"
                                    placeholder="Type here..."
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 transition-all transform hover:-translate-y-1"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>Analyze Now <ArrowRight className="ml-2 h-5 w-5" /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm">
                        <div className="flex">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {result && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
                        {/* Analysis Card */}
                        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <ShieldAlert className="text-indigo-600" /> Analysis Report
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Potential Diagnosis</h4>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{result.diagnosis}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Risk Level</h4>
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
                                            <div
                                                style={{ width: result.riskLevel === 'High' ? '100%' : result.riskLevel === 'Medium' ? '60%' : '30%' }}
                                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ease-out
                                                    ${result.riskLevel === 'High' ? 'bg-red-500' : result.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                                            ></div>
                                        </div>
                                        <p className={`font-bold ${result.riskLevel === 'High' ? 'text-red-600' : result.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                                            {result.riskLevel} Risk
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <h4 className="text-sm font-bold text-blue-800 mb-1">Recommendation</h4>
                                    <p className="text-blue-700">{result.recommendation}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Doctors Card */}
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
                            <div className="p-6 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Stethoscope className="text-indigo-600" /> Recommended Specialists
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Based on your analysis, we recommend seeing a <strong>{result.specialization}</strong>.
                                </p>
                            </div>
                            <div className="p-4 flex-1 overflow-y-auto max-h-[400px]">
                                {recommendedDoctors.length > 0 ? (
                                    <div className="space-y-4">
                                        {recommendedDoctors.map((doc) => (
                                            <div key={doc._id} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition hover:shadow-md bg-white">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                                        {doc.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-gray-900">{doc.name}</p>
                                                        <p className="text-xs text-gray-500">{doc.specialization}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleBook(doc._id)}
                                                    className="w-full py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition"
                                                >
                                                    Book Appointment
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 text-sm">No specific specialists found.</p>
                                        <button
                                            onClick={() => navigate('/doctors')}
                                            className="mt-4 text-indigo-600 text-sm font-medium hover:underline"
                                        >
                                            View all doctors
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleBookingSubmit}
                doctor={selectedDoctor}
            />
        </div >
    );
};

export default SymptomChecker;
