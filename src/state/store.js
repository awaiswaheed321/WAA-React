import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './StudentState.js';

export default configureStore({
    reducer: {
        student: studentReducer,
    },
});
