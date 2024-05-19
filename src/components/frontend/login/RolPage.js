// NewFormPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../context/UserContext';
import '../style/login/NewFormPage.css';

function NewFormPage() {
    const { setUserProfile, userProfile } = useContext(UserContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');

    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleRoleChange = (event) => setRole(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserProfile(prevProfile => ({ ...prevProfile, firstName, lastName, role }));
        navigate('/empresa');
    };

    return (
        <div className="new-form-container">
            <div className="new-form-sidebar">
                <div className="new-form-logo">DGR</div>
                <img src="path/to/your/image.png" alt="Diagram" />
            </div>
            <div className="new-form-content">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">Nombre</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        placeholder="Nombre"
                        required
                    />
                    <label htmlFor="lastName">Apellidos</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        placeholder="Apellidos"
                        required
                    />
                    <label htmlFor="role">¿Cómo definirías tu rol?</label>
                    <select id="role" value={role} onChange={handleRoleChange} required>
                        <option value="" disabled>Seleccione su rol</option>
                        <option value="C-Level">C-Level</option>
                        <option value="Gestor de proyectos">Gestor de proyectos</option>
                        <option value="Equipo de operaciones">Equipo de operaciones</option>
                        <option value="Equipo de IT">Equipo de IT</option>
                        <option value="Equipo de RRHH">Equipo de RRHH</option>
                        <option value="Equipo de Finanzas">Equipo de Finanzas</option>
                        <option value="Equipo de Marketing">Equipo de Marketing</option>
                        <option value="Equipo de Ventas">Equipo de Ventas</option>
                        <option value="Equipo de Soporte">Equipo de Soporte</option>
                        <option value="Equipo Legal">Equipo Legal</option>
                        <option value="Equipo de I+D+i">Equipo de I+D+i</option>
                    </select>
                    <button type="submit" className="continue-button">Continuar</button>
                </form>
            </div>
        </div>
    );
}

export default NewFormPage;
