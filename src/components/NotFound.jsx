import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function NotFound() {
    return (<Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        bgcolor="#f8f8f8"
    >
        <Typography variant="h1" color="error" gutterBottom>
            404
        </Typography>
        <Typography variant="h4" color="textSecondary" gutterBottom>
            Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary">
            Sorry, the page you are looking for doesn’t exist or has been
            moved.
        </Typography>
        <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
        >
            Go Back to Home
        </Button>
    </Box>);
}
