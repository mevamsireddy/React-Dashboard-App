import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import CSPMExecutiveDashboard from './CSPMExecutiveDashboard';
import CWPPDashboard from './CWPPDashboard';
import RegistryScan from './RegistryScan';
import AddWidgetWindow from './AddWidgetWindow';
import '../css/DashboardPage.css';

const DashboardPage = () => {
    const [editMode, setEditMode] = useState(false);
    const [isAddWidgetWindowOpen, setAddWidgetWindowOpen] = useState(false);

    const handleOpenAddWidgetWindow = () => {
        setAddWidgetWindowOpen(true);
    };

    const handleCloseAddWidgetWindow = () => {
        setAddWidgetWindowOpen(false);
    };

    const handleConfirmAddWidget = (newWidget) => {
        console.log('New Widget:', newWidget);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleRemoveWidget = (widgetId) => {
        console.log(`Removing widget with ID: ${widgetId}`);
    };

    return (
        <div className="dashboard-page">
            <DashboardHeader
                onToggleEditMode={toggleEditMode}
                onOpenAddWidgetWindow={handleOpenAddWidgetWindow}
            />
            <CSPMExecutiveDashboard
                editMode={editMode}
                onRemoveWidget={handleRemoveWidget}
                onAddWidget={handleOpenAddWidgetWindow}
            />
            <CWPPDashboard
                editMode={editMode}
                onRemoveWidget={handleRemoveWidget}
                onAddWidget={handleOpenAddWidgetWindow}
            />
            <RegistryScan
                editMode={editMode}
                onRemoveWidget={handleRemoveWidget}
                onAddWidget={handleOpenAddWidgetWindow}
            />
            {isAddWidgetWindowOpen && (
                <AddWidgetWindow
                    onClose={handleCloseAddWidgetWindow}
                    onConfirm={handleConfirmAddWidget}
                />
            )}
        </div>
    );
};

export default DashboardPage;