import React from 'react';
import Header from './components/Header';
import DashboardPage from './components/DashboardPage';
import './css/App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <DashboardPage />
        </div>
    );
}

export default App;