import React from 'react';
import SidebarItem from './SidebarItem';
import '../style/sidebar/Sidebar.css';

function Sidebar({ handleNavigation }) {
    console.log('Sidebar received handleNavigation:', typeof handleNavigation);

    return (
        <div className="sidebar fanci-stylish-sidebar">
            <div className="sidebar-item fanci-logo">DGR</div>
            <SidebarItem
                label="Crear"
                icon="path/to/create-icon.png"
                onClick={() => handleNavigation('/create')}
                className="fanci-create-item"
            />
            <SidebarItem
                label="Dashboard"
                icon="path/to/dashboard-icon.png"
                onClick={() => handleNavigation('/dashboard')}
                className="fanci-dashboard-item"
            />
            <SidebarItem
                label="Procesos"
                icon="path/to/procesos-icon.png"
                onClick={() => handleNavigation('/procesos')}
                className="fanci-procesos-item"
            />
            <SidebarItem
                label="Organización"
                icon="path/to/organizacion-icon.png"
                onClick={() => handleNavigation('/organizacion')}
                className="fanci-organizacion-item"
            />
        </div>
    );
}

export default Sidebar;
