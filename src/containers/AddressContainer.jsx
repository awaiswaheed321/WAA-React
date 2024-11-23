import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSnackBar from '../components/base/CustomSnackBar.jsx';
import Address from '../components/buyer/Address.jsx';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import BuyerAPI from '../services/BuyerAPI.js';
import HelperService from '../services/HelperService.js';
import useSnackStore from '../store/SnackStore.js';

export default function AddressContainer() {
    const [addresses, setAddresses] = useState([]);
    const { openSnackBar, resetSnackProps } = useSnackStore();
    const navigate = useNavigate();

    const fetchAddresses = async () => {
        try {
            const res = await BuyerAPI.fetchAddresses(getAccessToken());
            if (res.ok) {
                const body = await res.json();
                setAddresses(body || []);
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

    const onDelete = async (id) => {
        try {
            const res = await BuyerAPI.deleteAddress(getAccessToken(), id);
            if (res.ok) {
                openSnackBar('Item Removed', 'success');
                await HelperService.delay(1000);
                await fetchAddresses();
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

    useEffect(() => {
        resetSnackProps();
        fetchAddresses();
    }, []);

    const addressList =
        addresses.length > 0 ? (
            addresses.map((p) => (
                <Address key={p.id} address={p} onDelete={onDelete} />
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
                    No Address saved.
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
                Addresses
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {addressList}
            </Box>
            <CustomSnackBar />
        </div>
    );
}
