import React from 'react';
import { Divider, List, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import Course from '../components/Course.jsx';

const CoursesContainer = (props) => {
    return (
        <Paper elevation={2} style={{ marginBottom: 10 }}>
            <List>
                {props.courses.map((course, index) => (
                    <React.Fragment key={course.id}>
                        <Course
                            id={course.id}
                            name={course.name}
                            program={course.program}
                        />
                        {index < props.courses.length - 1 && (
                            <Divider variant="middle" component="li" />
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

CoursesContainer.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            program: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default CoursesContainer;
