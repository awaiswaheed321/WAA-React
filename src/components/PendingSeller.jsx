import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function PendingSeller(props) {
    const handleReject = () => {
        console.log('Rejected');
    };

    const handleApprove = () => {
        console.log('Approved');
    };

    return (
        <div>
            <Card sx={{ minWidth: 300, maxWidth: 300 }}>
                <CardContent>
                    <Box position="relative">
                        <Box sx={{ width: '100%', overflowWrap: 'break-word' }}>
                            <Typography
                                variant="body2"
                                sx={{ paddingRight: '60px' }}
                            >
                                <strong>ID:</strong> {props.id}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ paddingRight: '60px' }}
                            >
                                <strong>Name:</strong>{' '}
                                {`${props.firstName} ${props.lastName}`}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Email:</strong> {props.email}
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            gap={2}
                            justifyContent="center"
                            color="success"
                        >
                            <Button variant="outlined" onClick={handleApprove}>
                                Approve
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleReject}
                            >
                                Reject
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

PendingSeller.propTypes = {
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.number.isRequired,
};
