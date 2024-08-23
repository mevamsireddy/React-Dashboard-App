import React, { useState, useEffect, useRef } from 'react';
import '../css/Header.css';
import { useSelector } from 'react-redux';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredWidgets, setFilteredWidgets] = useState([]);
    const searchBarRef = useRef(null);
    const widgets = useSelector(state => state.widgets.categories);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredWidgets([]);
        } else {
            const results = [];
            widgets.forEach(category => {
                category.widgets.forEach(widget => {
                    if (widget.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        results.push({ ...widget, categoryName: category.name });
                    }
                });
            });
            setFilteredWidgets(results);
        }
    }, [searchQuery, widgets]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleResultClick = (widget) => {
        console.log('Selected Widget:', widget);
        setSearchQuery('');
        setFilteredWidgets([]);
    };

    return (
        <header className="header">
            <div className="logo">Home</div>
            <div className="search-bar-container" ref={searchBarRef}>
                <div className="custom-search-bar">
                    <i className="material-icons custom-search-icon">search</i>
                    <input
                        type="text"
                        placeholder="Search ..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="custom-search-input"
                    />
                </div>
                {filteredWidgets.length > 0 && (
                    <div className="custom-search-dropdown">
                        {filteredWidgets.map((widget, index) => (
                            <div
                                key={index}
                                className="custom-search-result-item"
                                onClick={() => handleResultClick(widget)}
                            >
                                <span className="custom-widget-name">{widget.name}</span>
                                <span className="custom-widget-category">{widget.categoryName}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="icons">
                <i className="material-icons notification-icon">notifications_active</i>
                <i className="material-icons user-account-icon">account_circle</i>
            </div>
        </header>
    );
};

export default Header;