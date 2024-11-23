import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteAllCookies, getAccessToken } from '../../cookies/AuthCookie';
import HelperService from '../../services/HelperService';
import SellerAPI from '../../services/SellerAPI';
import useSnackStore from '../../store/SnackStore.js';
import CustomSnackBar from '../base/CustomSnackBar.jsx';

const UpdateProduct = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { openSnackBar } = useSnackStore();

    const { name, description, price, stock, categoryId } =
        location.state || {};

    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        fetchCategories();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: name || '',
            description: description || '',
            price: price || 0,
            stock: stock || 0,
            categoryId: categoryId || 1,
        },
    });

    const onSubmit = async (data) => {
        const updatedProduct = {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId,
        };
        if (
            updatedProduct.name !== name ||
            updatedProduct.description !== description ||
            updatedProduct.price !== price ||
            updatedProduct.stock !== stock ||
            updatedProduct.categoryId !== categoryId
        ) {
            try {
                const res = await SellerAPI.updateProductById(
                    getAccessToken(),
                    id,
                    updatedProduct,
                );
                if (res.ok) {
                    openSnackBar('Product Updated', 'success');
                    await HelperService.delay(1000);
                    navigate(`/dashboard/seller-products/${id}`);
                } else if (res.status === 403) {
                    await handle403();
                } else {
                    const body = await res.json();
                    openSnackBar(body.message, 'error');
                }
            } catch (error) {
                console.error('Error fetching Categories:', error);
            }
        } else {
            openSnackBar('Nothing to Update', 'info');
        }
    };

    const handleBack = () => {
        navigate(`/dashboard/seller-products/${id}`);
    };

    return (
        <Box
            sx={{
                padding: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 600, padding: 2 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                        Update Product
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register('description')}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            inputProps={{
                                step: 0.01,
                                min: 1,
                            }}
                            {...register('price', {
                                required: 'Price is required',
                                min: {
                                    value: 1,
                                    message: 'Price cannot be below 1',
                                },
                                validate: (value) =>
                                    /^\d+(\.\d{1,2})?$/.test(value) ||
                                    'Price must have up to 2 decimal places',
                            })}
                            error={!!errors.price}
                            helperText={
                                errors.price ? errors.price.message : ''
                            }
                        />

                        <TextField
                            label="Stock"
                            type="number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register('stock', {
                                required: 'Stock is required',
                                min: {
                                    value: 1,
                                    message: 'Stock cannot be below 1',
                                },
                            })}
                            error={!!errors.stock}
                            helperText={
                                errors.stock ? errors.stock.message : ''
                            }
                        />

                        <FormControl
                            fullWidth
                            margin="normal"
                            error={!!errors.categoryId}
                        >
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                {...register('categoryId', {
                                    required: 'Category is required',
                                })}
                                defaultValue=""
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.categoryId && (
                                <FormHelperText>
                                    {errors.categoryId.message}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Grid
                            container
                            justifyContent="center"
                            spacing={2}
                            sx={{ marginTop: 2 }}
                        >
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ bgcolor: '#748CAB' }}
                                >
                                    Update
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <CustomSnackBar />
        </Box>
    );
};

export default UpdateProduct;
