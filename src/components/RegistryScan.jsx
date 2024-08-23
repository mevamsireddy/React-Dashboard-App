import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Colors,
} from 'chart.js';
import AddWidgetButton from './AddWidgetButton';
import { setWidgets, removeWidget } from '../redux/widgetsSlice';
import '../css/RegistryScan.css';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Colors
);

const RegistryScan = ({ editMode, onRemoveWidget, onAddWidget }) => {
    const dispatch = useDispatch();
    const widgetsData = useSelector(state => 
        state.widgets.categories.find(category => category.id === '3')?.widgets || []
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
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleRemoveWidget = (widgetId) => {
        dispatch(removeWidget({ categoryId: "3", widgetId }));
    };

    const createChartData = (graphData) => {
        return {
            labels: [''],
            datasets: graphData.labels.map((label, index) => ({
                label: label,
                data: [graphData.data[index]],
                backgroundColor: graphData.colors[index],
                borderRadius: 5,
                borderSkipped: false,
                barThickness: 30,
            })),
        };
    };

    return (
        <div className="registry-scan-dashboard">
            <h2 className="registry-scan-title">Registry Scan Dashboard</h2>
            <div className="registry-scan-widgets">
                {widgetsData.map(widget => (
                    <div className="widget registry-scan-widget" key={widget.id}>
                        {editMode && (
                            <span className="registry-scan-remove-widget" onClick={() => handleRemoveWidget(widget.id)}>✖</span>
                        )}
                        <h3 className="registry-scan-widget-title">{widget.name}</h3>
                        <p className="registry-scan-total">{widget.text}
                            <strong>{widget.graphData ? widget.graphData.data.reduce((a, b) => a + b, 0) : ''}</strong>
                        </p>
                        {widget.graphData && (
                            <div className="registry-scan-graph-container">
                                <Bar 
                                    data={createChartData(widget.graphData)} 
                                    options={{
                                        indexAxis: 'y',
                                        scales: {
                                            x: {
                                                stacked: true,
                                                beginAtZero: true,
                                                display: false
                                            },
                                            y: {
                                                stacked: true,
                                                display: false
                                            }
                                        },
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: { enabled: false }
                                        },
                                        responsive: true,
                                        maintainAspectRatio: false,
                                    }}
                                    height={100}
                                />
                            </div>
                        )}
                        {widget.graphData && (
                            <div className="registry-scan-status-list">
                                <div>
                                    <span className="status-icon critical"></span>
                                    Critical ({widget.graphData.data[0]})
                                </div>
                                <div>
                                    <span className="status-icon high"></span>
                                    High ({widget.graphData.data[1]})
                                </div>
                                <div>
                                    <span className="status-icon medium"></span>
                                    Medium ({widget.graphData.data[2]})
                                </div>
                                <div>
                                    <span className="status-icon low"></span>
                                    Low ({widget.graphData.data[3]})
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <AddWidgetButton onOpenAddWidgetWindow={onAddWidget} />
            </div>
        </div>
    );
};

export default RegistryScan;
