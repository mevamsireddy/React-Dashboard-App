import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWidgets, removeWidget } from '../redux/widgetsSlice';
import AddWidgetButton from './AddWidgetButton';
import '../css/CWPPDashboard.css';

const CWPPDashboard = ({ editMode, onRemoveWidget, onAddWidget }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const dashboardData = useSelector(state =>
        state.widgets.categories.find(category => category.id === "2")?.widgets || []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/widgets.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                dispatch(setWidgets(data.categories));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleRemoveWidget = (widgetId) => {
        dispatch(removeWidget({ categoryId: "2", widgetId }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cwpp-dashboard">
            <h2 className="cwpp-dashboard-subtitle">CWPP Dashboard</h2>
            <div className="cwpp-widget-container">
                {(
                    dashboardData.map(widget => (
                        <div className="widget cwpp-widget" key={widget.id}>
                            {editMode && (
                                <span className="cwpp-remove-widget" onClick={() => handleRemoveWidget(widget.id)}>✖</span>
                            )}
                            <h3 className="cwpp-widget-title">{widget.name}</h3>
                            <div className="cwpp-widget-content">
                                <div className="cwpp-bar-graph-icon">
                                    <span className="material-icons">bar_chart</span>
                                </div>
                                <div className='new'>{widget.text}</div>
                            </div>
                        </div>
                    ))
                )}
                <AddWidgetButton onOpenAddWidgetWindow={onAddWidget} />
            </div>
        </div>
    );
};

export default CWPPDashboard;
