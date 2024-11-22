import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import AdminAPI from '../services/AdminAPI.js';
import useSnackStore from '../store/SnackStore.js';
import AdminReview from '../components/admin/AdminReview.jsx';
import HelperService from '../services/HelperService.js';

export default function AdminReviewContainer() {
    const [reviews, setReviews] = useState([]);
    const { openSnackBar } = useSnackStore();
    const navigate = useNavigate();

    const fetchReviews = async () => {
        try {
            const res = await AdminAPI.getReviews(getAccessToken());
            if (res.ok) {
                const body = await res.json();
                setReviews(body);
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
