import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/buyer/CartItem.jsx';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import BuyerAPI from '../services/BuyerAPI.js';
import HelperService from '../services/HelperService.js';
import useSnackStore from '../store/SnackStore.js';

export default function CartContainer() {
    const [items, setItems] = useState([]);
    const { openSnackBar, resetSnackProps } = useSnackStore();
    const navigate = useNavigate();

    const fetchCartItems = async () => {
        try {
            const res = await BuyerAPI.getCart(getAccessToken());
            if (res.ok) {
                const body = await res.json();
                setItems(body.items || []);
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
    };

    const handle403 = async () => {
        openSnackBar('Your session has expired', 'error');
        await HelperService.delay(2000);
        deleteAllCookies();
        navigate('/');
    };

    const handleRemoveClick = async (id) => {
        try {
            console.log('Here');
            const res = await BuyerAPI.removeItemFromCart(getAccessToken(), id);
            console.log(res);
            if (res.ok) {
                openSnackBar('Item Removed', 'success');
                await HelperService.delay(1000);
                await fetchCartItems();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
    };

    const handlePlaceOrderClick = () => {
        console.log('onPlaceOrder(id);');
    };

    useEffect(() => {
        resetSnackProps();
        fetchCartItems();
        const interval = setInterval(() => {
            fetchCartItems();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const itemsList =
        items.length > 0 ? (
            items.map((p) => (
                <CartItem
                    key={p.id}
                    {...p}
                    handlePlaceOrderClick={handlePlaceOrderClick}
                    handleRemoveClick={handleRemoveClick}
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
                    Cart is Empty.
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
                Cart
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {itemsList}
            </Box>
        </div>
    );
}
