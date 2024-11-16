import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./counter.js"

export default configureStore({
    reducer: {
        counter: counterReducer
    }
});
