import React from 'react';
import { useParams } from 'react-router-dom';
import '../style/dashboard/ProcessDetail.css';

const ProcessDetail = ({ processes }) => {
    const { processId } = useParams();
    const process = processes.find((p, index) => index === parseInt(processId, 10));

    if (!process) {
        return <div>Proceso no encontrado</div>;
    }

    return (
        <div className="process-detail">
            <h2>Detalle del Proceso</h2>
            <div className="process-detail-item"><strong>Nombre:</strong> {process.name}</div>
            <div className="process-detail-item"><strong>Tipo:</strong> {process.type}</div>
            <div className="process-detail-item"><strong>Departamento:</strong> {process.department}</div>
            <div className="process-detail-item"><strong>Herramientas:</strong> {process.tools.join(', ')}</div>
            <div className="process-detail-item"><strong>Responsable:</strong> {process.responsible}</div>
            <div className="process-detail-item"><strong>Colaboradores:</strong> {process.collaborators.join(', ')}</div>
            <div className="process-detail-item"><strong>Objetivo:</strong> {process.objective}</div>
        </div>
    );
};

export default ProcessDetail;
