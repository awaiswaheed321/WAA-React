import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    Rating,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAllCookies, getAccessToken } from '../../cookies/AuthCookie.js';
import HelperService from '../../services/HelperService.js';
import SellerAPI from '../../services/SellerAPI.js';
import useSnackStore from '../../store/SnackStore.js';
import CustomSnackBar from '../base/CustomSnackBar.jsx';

const SellerProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [stockToAdd, setStockToAdd] = useState(1);
    const navigate = useNavigate();
    const { openSnackBar, resetSnackProps } = useSnackStore();

    const fetchProduct = async () => {
        try {
            resetSnackProps();
            const res = await SellerAPI.getProductById(getAccessToken(), id);
            if (res.ok) {
                const body = await res.json();
                setProduct(body);
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Categories:', error);
        }
    };

    const handle403 = async () => {
        openSnackBar('Your session has expired', 'error');
        await HelperService.delay(2000);
        deleteAllCookies();
        navigate('/');
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleNextImage = () => {
        if (product && currentImageIndex < product.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePreviousImage = () => {
        if (product && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            const res = await SellerAPI.deleteProductById(getAccessToken(), id);
            if (res.ok) {
                openSnackBar('Product Deleted', 'success');
                navigate('/dashboard/seller-products');
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleBack = () => {
        navigate('/dashboard/seller-products');
    };

    const handleAddStock = async () => {
        try {
            const res = await SellerAPI.addToProductStock(
                getAccessToken(),
                id,
                stockToAdd,
            );
            if (res.ok) {
                openSnackBar('Stock Added', 'success');
                await HelperService.delay(1500);
                await fetchProduct();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdateProduct = () => {
        if (product) {
            const { name, description, price, stock, category } = product;
            navigate(`/dashboard/seller-products/update/${product.id}`, {
                state: {
                    name: name,
                    description: description,
                    price: price,
                    stock: stock,
                    categoryId: category.id,
                },
            });
        }
    };

    const handleStockInputChange = (event) => {
        const value = Math.max(1, Math.floor(event.target.value));
        setStockToAdd(value);
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 4 }}>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
            >
                {/* Back Button */}
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#748CAB' }}
                        onClick={handleBack}
                    >
                        Back to Products
                    </Button>
                </Grid>
                {/* Update and Delete Buttons */}
                <Grid item>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TextField
                                type="number"
                                label="Stock"
                                value={stockToAdd}
                                onChange={handleStockInputChange}
                                InputProps={{
                                    inputProps: { min: 1 },
                                }}
                                size="small"
                                sx={{ maxWidth: '100px' }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: '#748CAB' }}
                                onClick={handleAddStock}
                            >
                                Add Stock
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleUpdateProduct}
                                sx={{ bgcolor: '#748CAB' }}
                            >
                                Update Info
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDeleteProduct}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Product Details */}
            <Typography variant="h4" gutterBottom>
                {product.name}
            </Typography>
            <Typography variant="body1" paragraph>
                {product.description}
            </Typography>
            <Typography variant="h6">Price: ${product.price}</Typography>
            <Typography variant="body1">Stock: {product.stock}</Typography>
            <Typography variant="body2" color="textSecondary">
                Category: {product.category.name}
            </Typography>

            {/* Product Images */}
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <IconButton
                    onClick={handlePreviousImage}
                    disabled={currentImageIndex === 0}
                >
                    <ArrowBack />
                </IconButton>
                <img
                    src={product.images[currentImageIndex].imageUrl}
                    alt={`Product Image ${currentImageIndex + 1}`}
                    style={{ maxWidth: '300px', margin: '0 20px' }}
                />
                <IconButton
                    onClick={handleNextImage}
                    disabled={currentImageIndex === product.images.length - 1}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            {/* Reviews */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Reviews
            </Typography>
            {product.reviews.map((review, index) => (
                <Paper key={index} sx={{ padding: 2, marginTop: 1 }}>
                    <Rating
                        name="review-rating"
                        value={review.rating}
                        readOnly
                    />
                    <Typography variant="body2">{review.comment}</Typography>
                </Paper>
            ))}
            <CustomSnackBar />
        </Box>
    );
};

export default SellerProductDetail;
