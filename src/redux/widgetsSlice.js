// src/redux/widgetsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const widgetsSlice = createSlice({
    name: 'widgets',
    initialState: {
        categories: []
    },
    reducers: {
        setWidgets: (state, action) => {
            state.categories = action.payload;
        },
        addWidget: (state, action) => {
            const { categoryId, widget } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets.push(widget);
            }
        },
        removeWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
            }
        }
    }
});

export const { setWidgets, addWidget, removeWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
