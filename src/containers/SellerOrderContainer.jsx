import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSnackBar from '../components/base/CustomSnackBar.jsx';
import SellerOrder from '../components/seller/SellerOrder.jsx';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import HelperService from '../services/HelperService.js';
import SellerAPI from '../services/SellerAPI.js';
import useSnackStore from '../store/SnackStore.js';

function SellerOrderContainer() {
    const [orders, setOrders] = useState([]);
    const { openSnackBar, resetSnackProps } = useSnackStore();
    const navigate = useNavigate();

    const OrderStatusOrder = [
        'PENDING',
        'SHIPPED',
        'ON_THE_WAY',
        'DELIVERED',
        'CANCELLED',
    ];

    const fetchOrders = async () => {
        try {
            const res = await SellerAPI.getSellerOrders(getAccessToken());
            if (res.ok) {
                const body = await res.json();
                const sortedOrders = body.sort((a, b) => {
                    const statusA = OrderStatusOrder.indexOf(a.status);
                    const statusB = OrderStatusOrder.indexOf(b.status);
                    return statusA - statusB;
                });
                setOrders(sortedOrders);
            } else if (res.status === 403) {
                openSnackBar('Your session has expired', 'error');
                await HelperService.delay(2000);
                deleteAllCookies();
                navigate('/');
            } else {
                const body = await res.body();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Reviews:', error);
        }
    };

    useEffect(() => {
        resetSnackProps();
        fetchOrders();
        const interval = setInterval(() => {
            fetchOrders();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const ordersList =
        orders.length > 0 ? (
            orders.map((p) => (
                <SellerOrder key={p.id} {...p} fetchOrders={fetchOrders} />
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
                    No Reviews available.
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
                Orders
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {ordersList}
            </Box>
            <CustomSnackBar />
        </div>
    );
}

export default SellerOrderContainer;
