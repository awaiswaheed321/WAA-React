import Header from '../components/Header.jsx';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import DataFetchingService from '../services/DataFetchingService.js';
import Student from '../components/Student.jsx';
import Box from '@mui/material/Box';
import StudentDetail from '../components/StudentDetail.jsx';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

const initialState = { params: {} };

function paramReducer(state, action) {
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                params: {
                    ...state.params,
                    filter: action.payload,
                },
            };
        case 'SET_VALUE':
            return {
                ...state,
                params: {
                    ...state.params,
                    value: action.payload,
                },
            };
        case 'RESET':
            return initialState;
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

const Students = () => {
    const [students, setStudents] = useState([]);
    const [showStudentDetail, setShowStudentDetail] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [paramState, dispatch] = useReducer(paramReducer, initialState);
    const filterTextRef = useRef();
    const [filterValue, setFilterValue] = useState('');

    const fetchStudents = async (params) => {
        try {
            const students = await DataFetchingService.getAllStudents(params);
            console.log(students);
            setStudents(students);
        } catch (error) {
            console.error('Error fetching Students:', error);
        }
    };

    useEffect(() => {
        fetchStudents(paramState.params).then();
    }, [paramState.params]);

    const handleStudentCardClick = async (postId) => {
        setSelectedStudentId(postId);
        setShowStudentDetail(true);
    };

    const studentList = students.map((p) => (
        <Student
            key={p.id}
            id={p.id}
            name={p.name}
            handleCardClick={handleStudentCardClick}
        />
    ));

    const applyFilter = () => {
        const selectedFilter = filterValue;
        const filterText = filterTextRef.current?.value;
        if (selectedFilter && filterText) {
            setShowStudentDetail(false);
            dispatch({ type: 'SET_FILTER', payload: selectedFilter });
            dispatch({ type: 'SET_VALUE', payload: filterText });
        } else {
            alert('Add both values for filter to apply');
        }
    };

    return (
        <div>
            <Header />
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">
                        Filter
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={filterValue} // Controlled value
                        onChange={(e) => setFilterValue(e.target.value)} // Manage Select value
                        label="Filter"
                        variant="standard"
                    >
                        <MenuItem value="gpa">GPA less than</MenuItem>
                        <MenuItem value="program">Program</MenuItem>
                    </Select>
                    <TextField
                        label="Value"
                        variant="outlined"
                        fullWidth
                        size="small"
                        inputRef={filterTextRef}
                    />
                    <Button
                        variant="contained"
                        sx={{ margin: 2 }}
                        onClick={applyFilter}
                    >
                        Apply Filter
                    </Button>
                </FormControl>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    {studentList}
                </Box>
            </Box>
            {showStudentDetail && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <StudentDetail
                        fetchStudents={fetchStudents}
                        selectedStudentId={selectedStudentId}
                        setSelectedStudentId={setSelectedStudentId}
                        setShowStudentDetail={setShowStudentDetail}
                    />
                </Box>
            )}
        </div>
    );
};

export default Students;
