import React from 'react';
import SidebarItem from './SidebarItem';
import '../style/sidebar/Sidebar.css';

import createIcon from '../img/plus.png';
import dashboardIcon from '../img/folder.png';
import procesosIcon from '../img/procesos.png';
import organizacionIcon from '../img/Organizacion.png';

function Sidebar({ handleNavigation }) {
    console.log('Sidebar received handleNavigation:', typeof handleNavigation);

    return (
        <div className="sidebar fanci-stylish-sidebar">
            <div 
                className="sidebar-item fanci-logo" 
                onClick={() => handleNavigation('/dashboard')}
                style={{ cursor: 'pointer' }}
            >
                DGR
            </div>
            <SidebarItem
                label="Crear"
                icon={createIcon}
                onClick={() => handleNavigation('/create')}
                className="fanci-create-item"
            />
            <SidebarItem
                label="Dashboard"
                icon={dashboardIcon}
                onClick={() => handleNavigation('/dashboard')}
                className="fanci-dashboard-item"
            />
            <SidebarItem
                label="Procesos"
                icon={procesosIcon}
                onClick={() => handleNavigation('/procesos')}
                className="fanci-procesos-item"
            />
            <SidebarItem
                label="Organización"
                icon={organizacionIcon}
                onClick={() => handleNavigation('/organizacion')}
                className="fanci-organizacion-item"
            />
        </div>
    );
}

export default Sidebar;
