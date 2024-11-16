import React from 'react';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { unselectStudent } from '../state/StudentState.js';

const SelectedStudent = (props) => {
    const dispatch = useDispatch();
    const handleUnselect = () => {
        dispatch(unselectStudent({ id: props.id }));
    };

    return (
        <Card sx={{ minWidth: 290, maxWidth: 290 }}>
            <CardContent>
                <Box position="relative">
                    <Box sx={{ width: '100%', overflowWrap: 'break-word' }}>
                        <Typography
                            variant="body2"
                            sx={{ paddingRight: '60px' }}
                        >
                            <strong>ID:</strong> {props.id}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Name:</strong> {props.name}
                        </Typography>
                    </Box>
                    <Button variant="outlined" onClick={handleUnselect}>
                        Unselect
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

SelectedStudent.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default SelectedStudent;
