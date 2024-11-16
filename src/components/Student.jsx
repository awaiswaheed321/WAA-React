import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Student = (props) => {
    return (
        <Card
            sx={{ minWidth: 290, maxWidth: 290 }}
            onClick={() => {
                props.handleCardClick(props.id);
            }}
        >
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
                </Box>
            </CardContent>
        </Card>
    );
};

Student.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    handleCardClick: PropTypes.func.isRequired,
};

export default Student;
