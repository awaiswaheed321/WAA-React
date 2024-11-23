import {
    Box,
    Button,
    DialogActions,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/admin/CategoryCard.jsx';
import CustomSnackBar from '../components/base/CustomSnackBar.jsx';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import AdminAPI from '../services/AdminAPI.js';
import HelperService from '../services/HelperService.js';
import SellerAPI from '../services/SellerAPI.js';
import useSnackStore from '../store/SnackStore.js';

function CategoryContainer() {
    const [categories, setCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { openSnackBar, resetSnackProps } = useSnackStore();
    const navigate = useNavigate();

    // Fetch Categories
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

    // Handle Unauthorized Access
    const handle403 = async () => {
        openSnackBar('Your session has expired', 'error');
        await HelperService.delay(2000);
        deleteAllCookies();
        navigate('/');
    };

    // Fetch Categories on Component Mount
    useEffect(() => {
        resetSnackProps();
        fetchCategories();
    }, []);

    // Handle Deletion of a Category
    const onDelete = async (id) => {
        try {
            const res = await AdminAPI.deleteCategory(getAccessToken(), id);
            if (res.ok) {
                openSnackBar('Category Deleted', 'success');
                await HelperService.delay(1000);
                await fetchCategories();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error Deleting Categories:', error);
        }
    };

    // Category List Rendering
    const categoryList =
        categories.length > 0 ? (
            categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    {...category}
                    onDelete={onDelete}
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
                    No Categories available.
                </Typography>
            </Box>
        );

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await AdminAPI.addCategory(getAccessToken(), data);
            if (res.ok) {
                openSnackBar('Category Added', 'success');
                await HelperService.delay(1000);
                await fetchCategories();
                reset();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error Adding Categories:', error);
        }
        setOpenModal(false);
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h3"
                    color="textSecondary"
                    sx={{ fontWeight: 'bold' }}
                >
                    Categories
                </Typography>
                <Button
                    variant="contained"
                    sx={{ bgcolor: '#748CAB' }}
                    onClick={() => setOpenModal(true)}
                >
                    Add Category
                </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {categoryList}
            </Box>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Add New Category
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            label="Category Name"
                            variant="outlined"
                            margin="normal"
                            {...register('name', {
                                required: 'Category name is required',
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            fullWidth
                            label="Category Description"
                            variant="outlined"
                            margin="normal"
                            {...register('description', {
                                required: 'Category description is required',
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <DialogActions>
                            <Button
                                onClick={() => setOpenModal(false)}
                                variant='outlined'
                                sx={{ color: '#748CAB' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ bgcolor: '#748CAB' }}
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Modal>

            <CustomSnackBar />
        </div>
    );
}

export default CategoryContainer;
