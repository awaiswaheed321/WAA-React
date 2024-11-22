import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PendingSeller from '../components/admin/PendingSeller.jsx';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import AdminAPI from '../services/AdminAPI.js';
import useSnackStore from '../store/SnackStore.js';
import HelperService from '../services/HelperService.js';

function PendingSellerContainer() {
    const [sellers, setSellers] = useState([]);
    const { openSnackBar } = useSnackStore();
    const navigate = useNavigate();

    const fetchSellers = async () => {
        try {
            const res = await AdminAPI.getPendingSellers(getAccessToken());
            const body = await res.json();
    
            if (res.ok) {
                setSellers(body);
            } else if (res.status === 403) {
                openSnackBar('Your session has expired', 'error');
                await HelperService.delay(2000);
                deleteAllCookies();
                navigate('/');
            } else {
                openSnackBar(body.message || 'An error occurred', 'error');
            }
        } catch (error) {
            console.error('Error fetching Sellers:', error);
            openSnackBar('Failed to fetch sellers. Please try again.', 'error');
        }
    };
    

    useEffect(() => {
        fetchSellers();
        const interval = setInterval(() => {
            fetchSellers();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const sellersList =
        sellers.length > 0 ? (
            sellers.map((p) => (
                <PendingSeller
                    key={p.id}
                    id={p.id}
                    firstName={p.firstName}
                    lastName={p.lastName}
                    email={p.email}
                    fetchSellers={fetchSellers}
                />
            ))
        ) : (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    mt: 2,
                }}
            >
                <Typography variant="h4" color="textSecondary">
                    No new sellers available.
                </Typography>
            </Box>
        );

    return (
        <div>
            <Typography
                variant="h3"
                color="textSecondary"
                sx={{ fontWeight: 'bold' }}
            >
                Pending Sellers
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {sellersList}
            </Box>
        </div>
    );
}

export default PendingSellerContainer;
