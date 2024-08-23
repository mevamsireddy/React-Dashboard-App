import React from 'react';
import '../css/AddWidgetButton.css';

const AddWidgetButton = ({ onOpenAddWidgetWindow }) => {
    return (
        <div className="widget unique-add-widget-button">
            <button className="unique-add-control-button" onClick={onOpenAddWidgetWindow}>
                <span className="material-icons unique-add-widget-icon">add</span>
                Add Widget
            </button>
        </div>
    );
};

export default AddWidgetButton;
