import React, { useRef } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import DataFetchingService from '../services/DataFetchingService.js';
import Box from '@mui/material/Box';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const nameRef = useRef('');
    const gpaRef = useRef('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const name = nameRef.current.value;
        const gpa = gpaRef.current.value;

        try {
            if (name === '' || gpa === '') {
                alert('Please enter all required fields.');
                return;
            }
            const student = {
                name: name,
                gpa: gpa,
            };
            await DataFetchingService.createStudent(student);
            alert('Successfully added Student');

            nameRef.current.value = '';
            gpaRef.current.value = '';
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleReset = () => {
        nameRef.current.value = '';
        gpaRef.current.value = '';
    };

    return (
        <div>
            <Header />
            <Paper
                elevation={3}
                style={{
                    padding: '20px',
                    maxWidth: '500px',
                    margin: 'auto',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Grid2
                        container
                        spacing={2}
                        direction="column"
                        sx={{ width: '100%', maxWidth: 600 }}
                    >
                        <Grid2 item xs={12} container spacing={2}>
                            <Grid2 item xs={6}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    inputRef={nameRef}
                                />
                            </Grid2>
                            <Grid2 item xs={6}>
                                <TextField
                                    label="GPA"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    inputRef={gpaRef}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{ margin: 2 }}
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleSubmit}
                                    sx={{ margin: 2 }}
                                >
                                    Submit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleReset}
                                    sx={{ margin: 2 }}
                                >
                                    Reset
                                </Button>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Box>
            </Paper>
        </div>
    );
};

export default AddStudent;
