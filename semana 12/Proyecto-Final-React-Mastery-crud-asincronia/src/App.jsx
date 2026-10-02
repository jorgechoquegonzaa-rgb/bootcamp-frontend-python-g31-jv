// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar Azul */}
        <nav className="bg-[#2b7de9] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14 items-center">
              <div className="flex-shrink-0 font-bold text-lg">
                Bootcamp Tasks Manager
              </div>
              <div className="hidden md:flex space-x-6 text-sm">
                <a href="#" className="hover:text-gray-200">Dashboard</a>
                <a href="#" className="hover:text-gray-200">Mis Tareas</a>
                <a href="#" className="hover:text-gray-200">Acerca de</a>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2b7de9] font-bold text-sm">
                  👤
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Contenido */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;