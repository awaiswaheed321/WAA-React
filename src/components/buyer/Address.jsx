import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@mui/material';

const Address = ({ address, onDelete }) => {
    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                p: 2,
                mb: 2,
                backgroundColor: '#f9f9f9',
            }}
        >
            <Typography variant="body1">
                <strong>Street:</strong> {address.street}
            </Typography>
            <Typography variant="body1">
                <strong>City:</strong> {address.city}
            </Typography>
            <Typography variant="body1">
                <strong>State:</strong> {address.state}
            </Typography>
            <Typography variant="body1">
                <strong>ZIP Code:</strong> {address.zipCode}
            </Typography>
            <Typography variant="body1">
                <strong>Country:</strong> {address.country}
            </Typography>
            <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => onDelete(address.id)}
            >
                Delete Address
            </Button>
        </Box>
    );
};

Address.propTypes = {
    address: PropTypes.shape({
        id: PropTypes.number.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Address;
