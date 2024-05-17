import React, { useState } from 'react';
import '../style/dashboard/NewProcess.css';
import { useNavigate } from 'react-router-dom';

const NewProcess = ({ addProcess }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        department: '',
        tools: [],
        responsible: '',
        collaborators: [],
        objective: '',
    });

    const [availableTools] = useState(['Tool 1', 'Tool 2', 'Tool 3']);
    const [availableCollaborators] = useState(['Collaborator 1', 'Collaborator 2', 'Collaborator 3']);
    const [showToolDropdown, setShowToolDropdown] = useState(false);
    const [showCollaboratorDropdown, setShowCollaboratorDropdown] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        fetch('http://localhost:5000/api/processes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            addProcess(data); // Update the parent component with the new process
            navigate('/procesos');
        })
        .catch(error => {
            console.error('There was an error saving the process!', error);
        });
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
            <div className="form-group">
                <label>Nombre</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                />
            </div>
            <div className="form-group">
                <label>Tipo</label>
                <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                >
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
                >
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </div>
            <div className="form-group">
                <label>Herramientas</label>
                <div className="tools-container">
                    {formData.tools.map((tool) => (
                        <div key={tool} className="tool-item">
                            {tool}
                            <button type="button" onClick={() => removeTool(tool)}>x</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => setShowToolDropdown(!showToolDropdown)}>+</button>
                    {showToolDropdown && (
                        <div className="tool-dropdown">
                            {availableTools.map((tool) => (
                                <div key={tool} onClick={() => addTool(tool)}>
                                    {tool}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="form-group">
                <label>Responsable</label>
                <select 
                    name="responsible" 
                    value={formData.responsible} 
                    onChange={handleChange}
                >
                    <option value="Responsable 1">Responsable 1</option>
                    <option value="Responsable 2">Responsable 2</option>
                </select>
            </div>
            <div className="form-group">
                <label>Colaboradores</label>
                <div className="collaborators-container">
                    {formData.collaborators.map((collaborator) => (
                        <div key={collaborator} className="collaborator-item">
                            {collaborator}
                            <button type="button" onClick={() => removeCollaborator(collaborator)}>x</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => setShowCollaboratorDropdown(!showCollaboratorDropdown)}>+</button>
                    {showCollaboratorDropdown && (
                        <div className="collaborator-dropdown">
                            {availableCollaborators.map((collaborator) => (
                                <div key={collaborator} onClick={() => addCollaborator(collaborator)}>
                                    {collaborator}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="form-group">
                <label>Objetivo</label>
                <textarea 
                    name="objective" 
                    value={formData.objective} 
                    onChange={handleChange}
                />
            </div>
            <button className="save-button" onClick={handleSave}>Guardar</button>
        </div>
    );
};

export default NewProcess;
