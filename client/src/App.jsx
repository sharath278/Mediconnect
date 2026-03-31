import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About'; // Import About page
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/AuthContext';

import Dashboard from './pages/Dashboard';

import Doctors from './pages/Doctors';
import SymptomChecker from './pages/SymptomChecker';

console.log('App.jsx: initializing');

function App() {
  console.log('App.jsx: rendering');
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} /> {/* Add About route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            {/* Add more routes here */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
