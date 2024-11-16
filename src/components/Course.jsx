import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@mui/material';

const Course = (props) => {
    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                paddingTop: 0.5,
                paddingBottom: 0.5,
                minHeight: '30px',
                flexDirection: 'column', // Ensures items stack vertically
            }}
        >
            <ListItemText
                primary={`ID: ${props.id}`}
                primaryTypographyProps={{ variant: 'body2' }}
                sx={{ margin: 0 }}
            />
            <ListItemText
                primary={`Name: ${props.name}`}
                primaryTypographyProps={{ variant: 'body2' }}
                sx={{ margin: 0 }}
            />
            <ListItemText
                primary={`Program: ${props.program}`}
                primaryTypographyProps={{ variant: 'body2' }}
                sx={{ margin: 0 }}
            />
        </ListItem>
    );
};

Course.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    program: PropTypes.string.isRequired,
};

export default Course;
