import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import NavigationMenu from '../profile/NavigationMenu';
import '../style/profile/NavigationMenu.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <NavigationMenu />
            <Sidebar />
        </div>
    );
}

export default Dashboard;
