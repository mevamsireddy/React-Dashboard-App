import React from 'react';
import '../css/DashboardHeader.css';

const DashboardHeader = ({ onOpenAddWidgetWindow, onToggleEditMode }) => {
    return (
        <div className="dashboard-header">
            <h1 className="dashboard-title">CNAPP Dashboard</h1>
            <div className="dashboard-controls">
                <button className="control-button" onClick={onOpenAddWidgetWindow}>
                    <span className="material-icons">add</span> Add Widget
                </button>
                <button className="control-button">
                    <span className="material-icons">refresh</span>
                </button>
                <button className="control-button" onClick={onToggleEditMode}>
                    <span className="material-icons">more_vert</span>
                </button>
                <button className="control-button time-control">
                    <span className="material-icons">schedule</span> | Last 2 days 
                    <span className="material-icons">arrow_drop_down</span>
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;