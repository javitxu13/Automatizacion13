import React, { useState } from 'react';
import '../style/dashboard/NewProcess.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../backend/firebase/firebaseConfig';

const Dropdown = ({ label, items, selectedItems, onSelect, onRemove, showDropdown, toggleDropdown }) => (
    <div className="form-group">
        <label>{label}</label>
        <div className="dropdown-container">
            {selectedItems.map((item, index) => (
                <div key={`${item}-${index}`} className="dropdown-item">
                    {item}
                    <button type="button" onClick={() => onRemove(item)}>x</button>
                </div>
            ))}
            <button type="button" onClick={toggleDropdown}>+</button>
            {showDropdown && (
                <div className="dropdown">
                    {items.map((item, index) => (
                        <div key={`${item}-${index}`} onClick={() => onSelect(item)}>
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

const NewProcess = ({ addProcess }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        department: '',
        tools: [],
        responsible: '',
        collaborators: [],
        objective: '',
        status: 'active',
        priority: 'medium'
    });

    const [availableTools] = useState(['Tool 1', 'Tool 2', 'Tool 3']);
    const [availableCollaborators] = useState(['Collaborator 1', 'Collaborator 2', 'Collaborator 3']);
    const [showToolDropdown, setShowToolDropdown] = useState(false);
    const [showCollaboratorDropdown, setShowCollaboratorDropdown] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (!formData.name || !formData.type || !formData.department || !formData.responsible) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        try {
            const token = await auth.currentUser.getIdToken(true);

            const response = await fetch('http://localhost:5000/api/processes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error guardando el proceso.');
            }

            const data = await response.json();
            addProcess(data);
            navigate('/procesos');
        } catch (error) {
            console.error('There was an error saving the process!', error);
            setError(error.message);
        }
    };

    const addTool = (tool) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            tools: [...prevFormData.tools, tool],
        }));
    };

    const removeTool = (tool) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            tools: prevFormData.tools.filter((t) => t !== tool),
        }));
    };

    const addCollaborator = (collaborator) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            collaborators: [...prevFormData.collaborators, collaborator],
        }));
    };

    const removeCollaborator = (collaborator) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            collaborators: prevFormData.collaborators.filter((c) => c !== collaborator),
        }));
    };

    return (
        <div className="new-process">
            <h2>Nuevo Proceso</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
                <label>Nombre</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group">
                <label>Tipo</label>
                <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un tipo</option>
                    <option value="Operativo">Operativo</option>
                    <option value="Estratégico">Estratégico</option>
                    <option value="Soporte">Soporte</option>
                    <option value="Mejora continua">Mejora continua</option>
                </select>
            </div>
            <div className="form-group">
                <label>Departamento</label>
                <select 
                    name="department" 
                    value={formData.department} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un departamento</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </div>
            <Dropdown
                label="Herramientas"
                items={availableTools}
                selectedItems={formData.tools}
                onSelect={addTool}
                onRemove={removeTool}
                showDropdown={showToolDropdown}
                toggleDropdown={() => setShowToolDropdown(!showToolDropdown)}
            />
            <div className="form-group">
                <label>Responsable</label>
                <select 
                    name="responsible" 
                    value={formData.responsible} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un responsable</option>
                    <option value="Responsable 1">Responsable 1</option>
                    <option value="Responsable 2">Responsable 2</option>
                </select>
            </div>
            <Dropdown
                label="Colaboradores"
                items={availableCollaborators}
                selectedItems={formData.collaborators}
                onSelect={addCollaborator}
                onRemove={removeCollaborator}
                showDropdown={showCollaboratorDropdown}
                toggleDropdown={() => setShowCollaboratorDropdown(!showCollaboratorDropdown)}
            />
            <div className="form-group">
                <label>Objetivo</label>
                <textarea 
                    name="objective" 
                    value={formData.objective} 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Estado</label>
                <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange}
                >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="completed">Completado</option>
                </select>
            </div>
            <div className="form-group">
                <label>Prioridad</label>
                <select 
                    name="priority" 
                    value={formData.priority} 
                    onChange={handleChange}
                >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                </select>
            </div>
            <button className="save-button" onClick={handleSave}>Guardar</button>
        </div>
    );
};

export default NewProcess;
