import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, setWidgets } from '../redux/widgetsSlice';
import '../css/AddWidgetWindow.css';

const AddWidgetWindow = ({ onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.widgets.categories);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newWidget, setNewWidget] = useState({ id: '', name: '', text: '', graphData: null });
    const [isAddingNewWidget, setIsAddingNewWidget] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/widgets.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                dispatch(setWidgets(data.categories));
                setSelectedCategory(data.categories[0]?.id);
                setError(null);
            } catch (err) {
                console.error('Error fetching the JSON data:', err);
                setError('Failed to load categories. Please try again later.');
            }
        };

        fetchCategories();
    }, [dispatch]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewWidget(prevState => ({ ...prevState, [name]: value }));
    };

    const handleConfirm = () => {
        if (selectedCategory && newWidget.name && newWidget.text) {
            const widget = { ...newWidget, id: `widget${Date.now()}` };
            dispatch(addWidget({ categoryId: selectedCategory, widget }));
            setNewWidget({ id: '', name: '', text: '', graphData: null });
            setIsAddingNewWidget(false);
            setSuccess('Widget added successfully!');
            setError(null);
            setTimeout(() => {
                onClose();
            }, 2000);
        } else {
            setError('Please fill out all fields before confirming.');
            setSuccess(null);
        }
    };

    const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

    return (
        <div className="add-widget-window">
            <div className="add-widget-header">
                <h3>Add Widget</h3>
                <button className="close-button" onClick={onClose}>✖</button>
            </div>
            <div className="add-widget-content">
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <div className="category-list">
                    {categories.length > 0 ? (
                        <div className="category-list-container">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(cat.id)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p>No categories available.</p>
                    )}
                </div>
                {selectedCategoryData && (
                    <div className="widget-list">
                        {selectedCategoryData.widgets.map(widget => (
                            <div key={widget.id} className="widget-item">
                                <input
                                    type="checkbox"
                                    id={widget.id}
                                    name={widget.name}
                                    defaultChecked
                                />
                                <label htmlFor={widget.id}>{widget.name}</label>
                            </div>
                        ))}
                        <div className={`add-new-widget ${isAddingNewWidget ? 'show' : ''}`}>
                            <h3>Add New Widget</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Widget Name"
                                value={newWidget.name}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="text"
                                placeholder="Widget Text"
                                value={newWidget.text}
                                onChange={handleChange}
                            />
                        </div>
                        {!isAddingNewWidget && (
                            <button className="dropdown-toggle" onClick={() => setIsAddingNewWidget(true)}>
                                Add New Widget
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="button-group">
                <button className="cancel-button" onClick={onClose}>Cancel</button>
                <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    );
};

export default AddWidgetWindow;