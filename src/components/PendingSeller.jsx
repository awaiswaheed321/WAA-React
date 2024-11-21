import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import SecureAdminApi from '../services/SecureAdminApi';
import useSnackStore from '../store/SnackStore.js';

export default function PendingSeller(props) {
    const { openSnackBar } = useSnackStore();
    const navigate = useNavigate();

    const handleApprove = async () => {
        try {
            const res = await SecureAdminApi.approveSeller(
                getAccessToken(),
                props.id,
            );
            if (res.ok) {
                openSnackBar('Approved Successfully', 'success');
                props.fetchSellers();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.body();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error Approving Seller:', error);
        }
    };

    const handleReject = async () => {
        try {
            const res = await SecureAdminApi.rejectSeller(
                getAccessToken(),
                props.id,
            );
            if (res.ok) {
                openSnackBar('Rejected Successfully', 'success');
                props.fetchSellers();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.body();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error Rejecting Seller:', error);
        }
    };

    const handle403 = async () => {
        openSnackBar('Your session has expired', 'error');
        await delay(2000);
        deleteAllCookies();
        navigate('/');
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

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
    fetchSellers: PropTypes.func.isRequired,
};
