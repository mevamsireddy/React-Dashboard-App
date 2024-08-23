import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoughnutChart from './DoughnutChart';
import AddWidgetButton from './AddWidgetButton';
import { setWidgets, removeWidget } from '../redux/widgetsSlice';
import '../css/CSPMExecutiveDashboard.css';

const CSPMExecutiveDashboard = ({ editMode, onAddWidget }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    // Fetch and set dashboard data
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

    const dashboardData = useSelector(state =>
        state.widgets.categories.find(category => category.id === "1")?.widgets || []
    );

    const handleRemoveWidget = (widgetId) => {
        dispatch(removeWidget({ categoryId: "1", widgetId }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cspm-executive-dashboard">
            <h2 className="dashboard-subtitle">CSPM Executive Dashboard</h2>
            <div className="widget-container">
                {dashboardData.map(widget => (
                    <div className="widget" key={widget.id}>
                        {editMode && (
                            <span className="remove-widget" onClick={() => handleRemoveWidget(widget.id)}>✖</span>
                        )}
                        <h3 className="widget-title">{widget.name}</h3>
                        <div className="widget-content">
                            {widget.graphData ? (
                                <div className="doughnut-graph">
                                    <DoughnutChart
                                        data={widget.graphData.data}
                                        backgroundColor={widget.graphData.backgroundColor}
                                    />
                                </div>
                            ) : (
                                <div className='new'>{widget.text}</div>
                            )}
                            {widget.graphData && (
                                <ul className="status-list">
                                    {widget.graphData.labels.map((label, index) => (
                                        <li key={index}>
                                            <span className={`status-icon ${label.toLowerCase().replace(' ', '-')}`}></span>
                                            {label} ({widget.graphData.data[index]})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
                <AddWidgetButton onOpenAddWidgetWindow={onAddWidget} />
            </div>
        </div>
    );
};

export default CSPMExecutiveDashboard;
