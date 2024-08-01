import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice'; // Ensure the correct path to your authSlice

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
