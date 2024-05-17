import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import NavigationMenu from '../profile/NavigationMenu';
import '../style/profile/NavigationMenu.css';

function Dashboard() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard">
            <NavigationMenu />
            <Sidebar handleNavigation={handleNavigation} />
        </div>
    );
}

export default Dashboard;
