import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { deleteAllCookies, getAccessToken } from '../../cookies/AuthCookie.js';
import HelperService from '../../services/HelperService.js';
import SellerAPI from '../../services/SellerAPI.js';
import useSnackStore from '../../store/SnackStore.js';
import CustomSnackBar from '../base/CustomSnackBar.jsx';

const CreateProduct = () => {
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            categoryId: '',
            name: '',
            description: '',
            price: '',
            stock: '',
        },
    });
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

    useEffect(() => {
        fetchCategories();
    }, []);

    const onSubmit = async (data) => {
        const processedData = {
            ...data,
            price: parseFloat(data.price),
            stock: parseInt(data.stock, 10),
        };
        try {
            const createProductRes = await SellerAPI.createProduct(
                getAccessToken(),
                processedData,
            );

            if (!createProductRes.ok) {
                if (createProductRes.status === 403) {
                    await handle403();
                } else {
                    const errorBody = await createProductRes.json();
                    openSnackBar(errorBody.message, 'error');
                }
                return;
            }
            const productBody = await createProductRes.json();
            openSnackBar('Product Created', 'success');
            const uploadPromises = files.map((file) =>
                SellerAPI.uploadImage(getAccessToken(), productBody.id, file),
            );

            const uploadResults = await Promise.all(uploadPromises);
            uploadResults.forEach(async (uploadRes, index) => {
                if (uploadRes.ok) {
                    openSnackBar(`File ${index + 1} Uploaded`, 'success');
                } else if (uploadRes.status === 403) {
                    await handle403();
                } else {
                    const errorBody = await uploadRes.json();
                    openSnackBar(
                        errorBody.message || `File ${index + 1} Upload Failed`,
                        'error',
                    );
                }
            });
            reset();
        } catch (error) {
            console.error('Error Creating Product:', error);
            openSnackBar('An unexpected error occurred', 'error');
        }
    };

    // Handle file drop and validation with react-dropzone
    const onDrop = (acceptedFiles) => {
        const validFiles = acceptedFiles.filter((file) =>
            file.type.startsWith('image/'),
        );

        if (validFiles.length <= 5) {
            setFiles(validFiles);
        } else {
            alert('You can upload a maximum of 5 images.');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 5,
        maxSize: 1024 * 1024, // 1 MB
    });

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    const handleFormReset = () => {
        reset();
        setFiles([]);
    };

    return (
        <Paper sx={{ padding: 3, maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom align="center">
                Create Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    {/* Product Name */}
                    <Grid item xs={12}>
                        <TextField
                            label="Product Name"
                            fullWidth
                            variant="outlined"
                            {...register('name', {
                                required: 'Product name is required',
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            {...register('description', {
                                required: 'Description is required',
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Grid>

                    {/* Price */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Price"
                            fullWidth
                            variant="outlined"
                            type="number"
                            inputProps={{ step: '0.01' }}
                            {...register('price', {
                                required: 'Price is required',
                                min: {
                                    value: 1,
                                    message: 'Price cannot be less than 1',
                                },
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message:
                                        'Price must have at most 2 decimal places',
                                },
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                    </Grid>

                    {/* Stock */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Stock"
                            fullWidth
                            variant="outlined"
                            type="number"
                            step="1" // Ensure no decimal places for stock
                            {...register('stock', {
                                required: 'Stock is required',
                                min: {
                                    value: 1,
                                    message: 'Stock cannot be less than 1',
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Stock must be a whole number',
                                },
                            })}
                            error={!!errors.stock}
                            helperText={errors.stock?.message}
                        />
                    </Grid>

                    {/* Category */}
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.categoryId}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                {...register('categoryId', {
                                    required: 'Category is required',
                                })}
                                value={watch('categoryId') || ''} // Ensure categoryId is controlled
                            >
                                <MenuItem value="">
                                    <em>Choose Category</em>
                                </MenuItem>
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
                                <Typography color="error" variant="body2">
                                    {errors.categoryId.message}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>

                    {/* Image Upload with react-dropzone */}
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            Product Images (1 to 5 images required)
                        </Typography>
                        <div
                            {...getRootProps()}
                            style={{
                                border: '2px dashed #ccc',
                                padding: '20px',
                            }}
                        >
                            <input {...getInputProps()} />
                            <Typography variant="body2">
                                Drag & drop your images here, or click to select
                            </Typography>
                        </div>
                        {files.length > 0 && (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                mt={1}
                            >
                                {files.length} file(s) selected.
                            </Typography>
                        )}
                        {errors.images && (
                            <Typography color="error" variant="body2">
                                {errors.images?.message ||
                                    'At least one image is required'}
                            </Typography>
                        )}
                    </Grid>

                    {/* Remove All Images Button */}
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#1D2D44',
                                color: '#1D2D44',
                                '&:hover': {
                                    borderColor: '#172A3A', // Darker shade for hover effect
                                    backgroundColor: '#172A3A',
                                    color: 'white',
                                },
                            }}
                            fullWidth
                            onClick={handleRemoveAllFiles}
                            disabled={files.length === 0}
                        >
                            Remove All Images
                        </Button>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1D2D44',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#172A3A', // Darker shade for hover effect
                                },
                            }}
                            fullWidth
                            type="submit"
                            disabled={files.length === 0} // Disable if no files selected
                        >
                            Create Product
                        </Button>
                    </Grid>

                    {/* Reset Form Button */}
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#1D2D44',
                                color: '#1D2D44',
                                '&:hover': {
                                    borderColor: '#172A3A',
                                    backgroundColor: '#172A3A',
                                    color: 'white',
                                },
                            }}
                            fullWidth
                            onClick={handleFormReset}
                        >
                            Reset Form
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <CustomSnackBar />
        </Paper>
    );
};

export default CreateProduct;
