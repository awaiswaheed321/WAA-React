import { Box, Typography, Card, CardContent } from '@mui/material';
import { getUserCookie } from '../cookies/AuthCookie';

const DashboardLanding = () => {
    console.log(getUserCookie());
    const role = getUserCookie().role;

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Welcome to Your Dashboard
            </Typography>
            {role === 'ADMIN' && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Admin Section
                        </Typography>
                        <Typography>
                            Manage users, view site statistics, and oversee operations.
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {role === 'BUYER' && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Buyer Section
                        </Typography>
                        <Typography>
                            Browse products, track orders, and manage your account.
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {role === 'SELLER' && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Seller Section
                        </Typography>
                        <Typography>
                            Manage your listings, track sales, and connect with buyers.
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default DashboardLanding;
