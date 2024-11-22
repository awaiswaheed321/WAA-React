import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                bgcolor: '#1D2D44',
                color: 'white',
                mt: 'auto',
                width: '100%',
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} MarketPlace Pro. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
