import React, { useState, useEffect } from 'react';
import '../style/dashboard/Procesos.css';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import notionIcon from '../../frontend/style/icons/n.png';
import Sidebar from '../sidebar/Sidebar';
import NavigationMenu from '../profile/NavigationMenu';
import { auth } from '../../backend/firebase/firebaseConfig'; // Asegúrate de que este path sea correcto

const Procesos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [processes, setProcesses] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        name: true,
        department: true,
        collaborators: true,
        tools: true
    });
    const [isColumnFilterOpen, setIsColumnFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProcesses = async () => {
        try {
            if (!auth.currentUser) {
                throw new Error('User is not authenticated');
            }

            let token = await auth.currentUser.getIdToken(true); // Renueva el token
            console.log('Token:', token); // Verifica el token en la consola
            let response = await fetch('http://localhost:5000/api/processes', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // Manejo de errores HTTP
                if (response.status === 403) {
                    throw new Error('Failed to authenticate token');
                }
                throw new Error('Failed to fetch processes');
            }

            let data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error('Invalid data format');
            }

            setProcesses(data);
        } catch (error) {
            setError(error.message);
            if (error.message === 'User is not authenticated' || error.message === 'Failed to authenticate token') {
                navigate('/login'); // Redirigir a login si el usuario no está autenticado
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProcesses();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleExport = () => {
        const data = processes.map((process, index) => {
            const filteredData = {};
            if (visibleColumns.id) filteredData.id = index + 1;
            if (visibleColumns.name) filteredData.name = process.name;
            if (visibleColumns.department) filteredData.department = process.department;
            if (visibleColumns.collaborators) filteredData.collaborators = process.collaborators.join(', ');
            if (visibleColumns.tools) filteredData.tools = process.tools.join(', ');
            return filteredData;
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Procesos');
        XLSX.writeFile(workbook, 'procesos.xlsx');
    };

    const handleColumnToggle = (column) => {
        setVisibleColumns({
            ...visibleColumns,
            [column]: !visibleColumns[column]
        });
    };

    const toggleColumnFilter = () => {
        setIsColumnFilterOpen(!isColumnFilterOpen);
    };

    const handleNewProcessClick = () => {
        navigate('/nuevo-proceso');
    };

    const handleOpenDetail = (index) => {
        navigate(`/process-detail/${index}`);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const addProcess = (newProcess) => {
        setProcesses((prevProcesses) => [...prevProcesses, newProcess]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="procesos">
            <div className="sidebar">
                <Sidebar handleNavigation={handleNavigation} />
            </div>
            <div className="main-content">
                <div className="header">
                    <div className="user-info"></div>
                    <button className="new-process-button" onClick={handleNewProcessClick}>
                        Nuevo proceso
                    </button>
                    <NavigationMenu />
                </div>
                <div className="table-container">
                    <a href="https://www.notion.so/your-database-link" target="_blank" rel="noopener noreferrer">
                        <img className='imageNotion' src={notionIcon} alt="Notion" />
                    </a>
                    <div className="table-actions">
                        <button className="export-button" onClick={handleExport}>📥 Exportar</button>
                        <button className="columns-button" onClick={toggleColumnFilter}>🔧 Filtrar columnas</button>
                        {isColumnFilterOpen && (
                            <div className="column-filter-dropdown">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.id}
                                        onChange={() => handleColumnToggle('id')}
                                    />
                                    Nº
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.name}
                                        onChange={() => handleColumnToggle('name')}
                                    />
                                    Nombre proceso
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.department}
                                        onChange={() => handleColumnToggle('department')}
                                    />
                                    Departamento
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.collaborators}
                                        onChange={() => handleColumnToggle('collaborators')}
                                    />
                                    Colaboradores
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.tools}
                                        onChange={() => handleColumnToggle('tools')}
                                    />
                                    Herramientas
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <span className="search-icon"></span>
                    </div>
                    <table className="process-table">
                        <thead>
                            <tr>
                                {visibleColumns.id && <th>Nº</th>}
                                {visibleColumns.name && <th>Nombre proceso</th>}
                                {visibleColumns.department && <th>Departamento</th>}
                                {visibleColumns.collaborators && <th>Colaboradores</th>}
                                {visibleColumns.tools && <th>Herramientas</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((process, index) => (
                                <tr key={index}>
                                    {visibleColumns.id && <td>{index + 1}</td>}
                                    {visibleColumns.name && (
                                        <td>
                                            {process.name}
                                            <button className="open-button" onClick={() => handleOpenDetail(index)}>ABRIR</button>
                                        </td>
                                    )}
                                    {visibleColumns.department && <td>{process.department}</td>}
                                    {visibleColumns.collaborators && <td>{process.collaborators.join(', ')}</td>}
                                    {visibleColumns.tools && <td>{process.tools.join(', ')}</td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Procesos;
