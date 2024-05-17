import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/frontend/login/LoginPage';
import RegisterPage from './components/frontend/login/RegisterPage';
import LandingPage from './components/frontend/landingPage/LandingPage';
import RolPage from './components/frontend/login/RolPage';
import Empresa from './components/frontend/login/Empresa';
import Dashboard from './components/frontend/dashboard/Dashboard';
import Procesos from './components/frontend/dashboard/Procesos';
import NewProcess from './components/frontend/dashboard/NewProcess';
import ProcessDetail from './components/frontend/dashboard/ProcessDetail';
import Organizacion from './components/frontend/dashboard/Organizacion';
import ProfilePage from './components/frontend/profile/ProfilePage';
import { UserProvider } from './components/frontend/context/UserContext';

function App() {
    const [processes, setProcesses] = useState([]);

    // Función para agregar un nuevo proceso
    const addProcess = (newProcess) => {
        setProcesses([...processes, newProcess]);
    };

    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/new-form" element={<RolPage />} />
                    <Route path="/empresa" element={<Empresa />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/nuevo-proceso" element={<NewProcess addProcess={addProcess} />} />
                    <Route path="/procesos" element={<Procesos processes={processes} />} />
                    <Route path="/process-detail/:processId" element={<ProcessDetail processes={processes} />} />
                    <Route path="/organizacion" element={<Organizacion />} />
                    <Route path="/perfil" element={<ProfilePage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
