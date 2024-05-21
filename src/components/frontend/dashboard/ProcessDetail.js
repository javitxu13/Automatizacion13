import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/dashboard/ProcessDetail.css';
import SidebarOrganizacion from '../sidebar/SidebarOrganizacion';
import { auth } from '../../backend/firebase/firebaseConfig';

const ProcessDetail = () => {
    const { processId } = useParams();
    const [process, setProcess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProcess = async () => {
            try {
                if (!auth.currentUser) {
                    throw new Error('User is not authenticated');
                }

                const token = await auth.currentUser.getIdToken(true);
                const response = await fetch(`http://localhost:5000/api/processes/${processId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch process');
                }

                const data = await response.json();
                setProcess(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProcess();
    }, [processId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!process) {
        return <div>Proceso no encontrado</div>;
    }

    return (
        <div className="process-detail">
            <SidebarOrganizacion />
            <h2>Detalle del Proceso</h2>
            <div className="process-detail-item"><strong>Nombre:</strong> {process.name}</div>
            <div className="process-detail-item"><strong>Tipo:</strong> {process.type}</div>
            <div className="process-detail-item"><strong>Departamento:</strong> {process.department}</div>
            <div className="process-detail-item"><strong>Herramientas:</strong> {process.tools.join(', ')}</div>
            <div className="process-detail-item"><strong>Responsable:</strong> {process.responsible}</div>
            <div className="process-detail-item"><strong>Colaboradores:</strong> {process.collaborators.join(', ')}</div>
            <div className="process-detail-item"><strong>Objetivo:</strong> {process.objective}</div>
            <div className="process-detail-item"><strong>Estado:</strong> {process.status}</div>
            <div className="process-detail-item"><strong>Prioridad:</strong> {process.priority}</div>
        </div>
    );
};

export default ProcessDetail;
