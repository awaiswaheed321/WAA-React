import { Box, Card, CardContent, Typography } from '@mui/material';
import UserRole from '../../constants/UserRoles';
import { getUserCookie } from '../../cookies/AuthCookie';

const DashboardLanding = () => {
    const user = getUserCookie();

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
            Hello, {`${user.firstName} ${user.lastName}`}! Welcome to your dashboard.
            </Typography>
            {user.role === UserRole.ADMIN && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Admin Section
                        </Typography>
                        <Typography>
                            Manage users, view site statistics, and oversee
                            operations.
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {user.role === UserRole.BUYER && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Buyer Section
                        </Typography>
                        <Typography>
                            Browse products, track orders, and manage your
                            account.
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {user.role === UserRole.SELLER && (
                <Card>
                    <CardContent>
                        {user.approved ? (
                            <>
                                <Typography variant="h5" component="h2">
                                    Seller Section
                                </Typography>
                                <Typography>
                                    Manage your listings, track sales, and
                                    connect with buyers.
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    color="error"
                                >
                                    Approval Pending
                                </Typography>
                                <Typography>
                                    Your account is not yet approved. Please
                                    have patience; an admin will review and
                                    approve your account shortly. Once approved,
                                    you will gain access to the seller section
                                    where you can manage your listings and
                                    connect with buyers. Thank you for your
                                    understanding!
                                </Typography>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default DashboardLanding;
