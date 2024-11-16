import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
    name: 'selectedStudents',
    initialState: {
        students: [],
    },
    reducers: {
        selectStudent: (state, action) => {
            const exists = state.students.some(
                (student) => student.id === action.payload.id,
            );
            if (!exists) {
                state.students.push(action.payload);
            } else {
                console.log(
                    `Student with id ${action.payload.id} already exists.`,
                );
            }
        },
        unselectStudent: (state, action) => {
            state.students = state.students.filter(
                (student) => student.id !== action.payload.id,
            );
        },
    },
});

export const { selectStudent, unselectStudent } = studentSlice.actions;

export default studentSlice.reducer;
