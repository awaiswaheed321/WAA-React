import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import DataFetchingService from '../services/DataFetchingService.js';
import PropTypes from 'prop-types';
import CoursesContainer from '../containers/CoursesContainer.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudent, unselectStudent } from '../state/StudentState.js';

const PostDetailsPaper = styled(Paper)(({ theme }) => ({
    width: 400,
    height: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    marginTop: 10,
}));

const StudentDetail = (props) => {
    const students = useSelector((state) => state.student.students);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [addStudent, setAddStudent] = useState(false);

    useEffect(() => {
        const doesStudentExist = () => {
            return students.some(
                (student) => student.id === props.selectedStudentId,
            );
        };

        const fetchStudent = async () => {
            try {
                const student = await DataFetchingService.getStudent(
                    props.selectedStudentId,
                );
                console.log(student);
                setStudent(student);
                setAddStudent(doesStudentExist());
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchStudent().then();
    }, [props.selectedStudentId]);

    const handleBackButtonClick = () => {
        setStudent(null);
        navigate('/');
    };

    const handleDeletePost = async (id) => {
        try {
            await DataFetchingService.deleteStudent(id);
            alert('Successfully deleted');
            props.fetchStudents();
            props.setShowStudentDetail(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCardClose = () => {
        props.setShowStudentDetail(false);
        props.setSelectedStudentId(null);
    };

    const handleSelectUnSelect = () => {
        if (addStudent) {
            dispatch(unselectStudent(student));
        } else {
            dispatch(selectStudent(student));
        }
        setAddStudent(!addStudent);
    };

    return (
        <Stack direction="column" spacing={2} sx={{ position: 'relative' }}>
            {student && (
                <PostDetailsPaper square={false}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCardClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'grey.500',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        color="inherit"
                        component="div"
                        sx={{ fontWeight: 'bold' }}
                    >
                        Post Details
                    </Typography>
                    <Box sx={{ width: '100%', overflowWrap: 'break-word' }}>
                        <Typography variant="body2">
                            <strong>ID:</strong> {student.id}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Name:</strong> {student.name}
                        </Typography>
                        <Typography variant="body2">
                            <strong>GPA:</strong> {student.gpa}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Courses
                        </Typography>
                    </Box>

                    {student.courseList && student.courseList.length > 0 ? (
                        <CoursesContainer courses={student.courseList} />
                    ) : (
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            Term status: inactive
                        </Typography>
                    )}
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="outlined"
                            onClick={handleBackButtonClick}
                        >
                            Back
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSelectUnSelect}
                        >
                            {addStudent ? 'Unselect' : 'Select'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeletePost(student.id)}
                        >
                            Delete
                        </Button>
                    </Box>
                </PostDetailsPaper>
            )}
        </Stack>
    );
};

StudentDetail.propTypes = {
    selectedStudentId: PropTypes.number.isRequired,
    setShowStudentDetail: PropTypes.func.isRequired,
    setSelectedStudentId: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
};

export default React.memo(StudentDetail);
