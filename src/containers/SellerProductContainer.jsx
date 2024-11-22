import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSnackBar from '../components/base/CustomSnackBar.jsx';
import SellerProduct from '../components/seller/SellerProduct.jsx';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import HelperService from '../services/HelperService.js';
import SellerAPI from '../services/SellerAPI.js';
import useSnackStore from '../store/SnackStore.js';

function SellerProductContainer() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        priceMin: '',
        priceMax: '',
        categoryId: '',
        sellerId: '',
        description: '',
        stockAvailable: 1, // default to checked (1)
        page: 0,
        size: 8,
    });
    const [totalPages, setTotalPages] = useState(0);

    const { openSnackBar } = useSnackStore();
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const res = await SellerAPI.getCategories(getAccessToken());
            if (res.ok) {
                const body = await res.json();
                setCategories(body);
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

    const fetchProducts = async () => {
        try {
            // Build the params object dynamically based on the filters with non-empty values
            const params = {
                name: filters.name,
                priceMin: filters.priceMin,
                priceMax: filters.priceMax,
                categoryId: filters.categoryId,
                sellerId: filters.sellerId,
                description: filters.description,
                stockAvailable: filters.stockAvailable,
                page: filters.page,
                size: filters.size,
            };

            // Remove filters with empty or falsy values
            Object.keys(params).forEach((key) => {
                if (!params[key] && params[key] !== 0) {
                    delete params[key];
                }
            });

            const res = await SellerAPI.getProducts(getAccessToken(), params);
            if (res.ok) {
                const body = await res.json();
                setProducts(body.content);
                setTotalPages(body.totalPages);
            } else if (res.status === 403) {
                handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message || 'An error occurred', 'error');
            }
        } catch (error) {
            console.error('Error fetching Products:', error);
            openSnackBar(
                'Failed to fetch Products. Please try again.',
                'error',
            );
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleStockAvailableChange = (e) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            stockAvailable: e.target.checked ? 1 : 0,
        }));
    };

    const handleApplyFilters = () => {
        fetchProducts();
    };

    const handleResetFilters = () => {
        setFilters({
            name: '',
            priceMin: '',
            priceMax: '',
            categoryId: '',
            sellerId: '',
            description: '',
            stockAvailable: 1,
            page: 0,
            size: 8,
        });
        fetchProducts();
    };

    const productsList =
        products.length > 0 ? (
            products.map((p) => <SellerProduct key={p.id} {...p}/>)
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
                    You do not have any Products.
                </Typography>
            </Box>
        );

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        const interval = setInterval(() => {
            fetchProducts();
        }, 60000);
        return () => clearInterval(interval);
    }, [filters.page]);

    return (
        <div>
            <Typography
                variant="h3"
                color="textSecondary"
                sx={{ fontWeight: 'bold' }}
            >
                Products
            </Typography>

            {/* Filter Section */}
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ maxWidth: '250px' }} // Reduce width
                />
                <TextField
                    label="Min Price"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{ maxWidth: '150px' }} // Reduce width
                />
                <TextField
                    label="Max Price"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{ maxWidth: '150px' }} // Reduce width
                />
                <FormControl
                    variant="outlined"
                    size="small"
                    sx={{ maxWidth: '250px' }}
                >
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="categoryId"
                        value={filters.categoryId || ''}
                        onChange={handleFilterChange}
                        label="Category"
                        displayEmpty // This ensures that the placeholder text is shown when no option is selected
                    >

                        {/* Render category options */}
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.stockAvailable === 1}
                            onChange={handleStockAvailableChange}
                            name="stockAvailable"
                            color="primary"
                        />
                    }
                    label="Stock Available"
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                </Box>
            </Box>

            {/* Products Display */}
            <Box display="flex" flexWrap="wrap" gap={2}>
                {productsList}
            </Box>

            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="outlined"
                    disabled={filters.page <= 0}
                    onClick={() =>
                        setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                    }
                >
                    Previous
                </Button>
                <Button
                    variant="outlined"
                    disabled={filters.page >= totalPages - 1}
                    onClick={() =>
                        setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                    }
                >
                    Next
                </Button>
            </Box>

            <CustomSnackBar />
        </div>
    );
}

export default SellerProductContainer;
