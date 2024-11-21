import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import SecureAdminApi from '../services/SecureAdminApi';
import useSnackStore from '../store/SnackStore.js';
import AdminReview from '../components/AdminReview.jsx';

export default function AdminReviewContainer() {
    const [reviews, setReviews] = useState([]);
    const { openSnackBar } = useSnackStore();
    const navigate = useNavigate();

    const fetchReviews = async () => {
        try {
            const res = await SecureAdminApi.getReviews(
                getAccessToken(),
            );
            if (res.ok) {
                const body = await res.json();
                setReviews(body);
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

    useEffect(() => {
        fetchReviews();
        const interval = setInterval(() => {
            fetchReviews();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const sellersList =
        reviews.length > 0 ? (
            reviews.map((p) => (
                <AdminReview
                    key={p.id}
                    id={p.id}
                    productName={p.productName}
                    rating={p.rating}
                    comment={p.comment}
                    fetchReviews={fetchReviews}
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
                    No Reviews available.
                </Typography>
            </Box>
        );

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
        <div>
            <Typography
                variant="h3"
                color="textSecondary"
                sx={{ fontWeight: 'bold' }}
            >
                Reviews
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {sellersList}
            </Box>
        </div>
    );
}
