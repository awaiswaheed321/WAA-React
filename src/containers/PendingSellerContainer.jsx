import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PendingSeller from '../components/PendingSeller.jsx';
import { deleteAllCookies } from '../cookies/AuthCookie.js';
import SecureAdminApi from '../services/SecureAdminApi';
import useSnackStore from '../store/SnackStore.js';
import { getAccessToken } from '../cookies/AuthCookie.js';

function PendingSellerContainer() {
    const [sellers, setSellers] = useState([]);
    const { openSnackBar } = useSnackStore();
    const navigate = useNavigate();

    const fetchSellers = async () => {
        try {
            const res = await SecureAdminApi.getPendingSellers(getAccessToken());
            if (res.ok) {
                const body = await res.json();
                setSellers(body);
            } else if (res.status === 403) {
                openSnackBar('Your session has expired', 'error');
                await delay(2000);
                deleteAllCookies();
                navigate('/');
            } else {
                const body = await res.body();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Students:', error);
        }
    };

    const sellersList = sellers.map((p) => (
        <PendingSeller
            key={p.id}
            id={p.id}
            firstName={p.firstName}
            lastName={p.lastName}
            email={p.email}
            fetchSellers={fetchSellers}
        />
    ));

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    useEffect(() => {
        fetchSellers().then();
    }, []);

    return (
        <div>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {sellersList}
            </Box>
        </div>
    );
}

export default PendingSellerContainer;
