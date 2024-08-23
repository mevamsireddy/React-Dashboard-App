import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../css/DoughnutChart.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DoughnutChart = ({ data, backgroundColor }) => {
    const total = data.reduce((acc, value) => acc + value, 0);

    const chartData = {
        labels: [],
        datasets: [
            {
                data: data,
                backgroundColor: backgroundColor,
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="doughnut-container">
            <Doughnut 
                data={chartData} 
                options={{
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: () => '',
                            },
                        },
                        legend: {
                            display: false,
                        },
                        datalabels: {
                            display: false,
                        }
                    }
                }}
            />
            <div className="inner-circle">
                <div className="total-value">{total}</div>
                <div>Total</div>
            </div>
        </div>
    );
};

export default DoughnutChart;