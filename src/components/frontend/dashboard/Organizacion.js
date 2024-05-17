import React, { useState, useEffect } from 'react';
import '../style/dashboard/Organizacion.css';
import Sidebar from '../sidebar/Sidebar';
import NavigationMenu from '../profile/NavigationMenu';
import { useNavigate } from 'react-router-dom';

function Organizacion() {
    const navigate = useNavigate();
    const [isAddDepartmentPopupOpen, setIsAddDepartmentPopupOpen] = useState(false);
    const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);
    const [departments, setDepartments] = useState([
        { id: 1, name: 'Operaciones', employees: [] },
        { id: 2, name: 'Marketing', employees: [] },
        { id: 3, name: 'Ventas', employees: [] },
        { id: 4, name: 'Finanzas', employees: [] }
    ]);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        let isMounted = true;
        fetch('http://localhost:5000/api/users')
            .then(response => response.json())
            .then(data => {
                if (isMounted) {
                    if (Array.isArray(data)) {
                        setAvailableUsers(data);
                    } else {
                        console.error('Expected an array but got:', data);
                    }
                }
            })
            .catch(error => console.error('Error fetching users:', error));

        return () => {
            isMounted = false; // Cleanup the effect
        };
    }, []);

    const toggleAddDepartmentPopup = () => {
        setIsAddDepartmentPopupOpen(!isAddDepartmentPopupOpen);
    };

    const toggleAddEmployeePopup = (department) => {
        setSelectedDepartment(department);
        setIsAddEmployeePopupOpen(!isAddEmployeePopupOpen);
    };

    const handleAddDepartment = () => {
        if (newDepartmentName.trim() !== '') {
            fetch('http://localhost:5000/api/departments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newDepartmentName }),
            })
                .then(response => response.json())
                .then(data => {
                    setDepartments([...departments, { ...data, employees: [] }]);
                    setNewDepartmentName('');
                    toggleAddDepartmentPopup();
                })
                .catch(error => console.error('Error adding department:', error));
        }
    };

    const handleAddEmployee = () => {
        if (selectedUser) {
            fetch('http://localhost:5000/api/departments/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ departmentId: selectedDepartment.id, userId: selectedUser }),
            })
                .then(response => response.json())
                .then(() => {
                    setDepartments(departments.map(dept => 
                        dept.id === selectedDepartment.id 
                        ? { ...dept, employees: [...dept.employees, availableUsers.find(user => user.id === parseInt(selectedUser))] } 
                        : dept
                    ));
                    setSelectedUser('');
                    toggleAddEmployeePopup();
                })
                .catch(error => console.error('Error adding employee:', error));
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="Organizacion">
            <div className="sidebar">
                <Sidebar handleNavigation={handleNavigation} />
            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Organización XYZ</h1>
                    <div className="profile">
                        <button className="new-department-btn" onClick={toggleAddDepartmentPopup}>Nuevo departamento</button>
                        <NavigationMenu />
                    </div>
                </div>
                <div className="department-list">
                    {departments.map((department) => (
                        <div className="department" key={department.id}>
                            <div className="department-header">
                                <h2>{department.name}</h2>
                                <button className="add-employee-btn" onClick={() => toggleAddEmployeePopup(department)}>+</button>
                            </div>
                            <ul className="employee-list">
                                {department.employees.map((employee) => (
                                    <li key={employee.id}>{employee.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {isAddDepartmentPopupOpen && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Añadir departamento</h2>
                        <label htmlFor="departmentName">Nombre</label>
                        <input
                            type="text"
                            id="departmentName"
                            value={newDepartmentName}
                            onChange={(e) => setNewDepartmentName(e.target.value)}
                        />
                        <button className="add-btn" onClick={handleAddDepartment}>Añadir</button>
                        <button className="close-btn" onClick={toggleAddDepartmentPopup}>Cerrar</button>
                    </div>
                </div>
            )}
            {isAddEmployeePopupOpen && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Añadir empleado a {selectedDepartment.name}</h2>
                        <label htmlFor="userSelect">Usuarios disponibles</label>
                        <select 
                            id="userSelect" 
                            value={selectedUser} 
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Seleccione un usuario</option>
                            {availableUsers.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                        <button className="add-btn" onClick={handleAddEmployee}>Añadir</button>
                        <button className="close-btn" onClick={toggleAddEmployeePopup}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Organizacion;
