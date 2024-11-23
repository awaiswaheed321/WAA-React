import {
    Box,
    Button,
    Modal,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CustomSnackBar from '../components/base/CustomSnackBar.jsx';
import Address from '../components/buyer/Address.jsx';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import BuyerAPI from '../services/BuyerAPI.js';
import HelperService from '../services/HelperService.js';
import useSnackStore from '../store/SnackStore.js';

export default function AddressContainer() {
    const [addresses, setAddresses] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { openSnackBar, resetSnackProps } = useSnackStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

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
                openSnackBar('Address Removed', 'success');
                await HelperService.delay(1000);
                await fetchAddresses();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting Address:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const res = await BuyerAPI.addAddress(getAccessToken(), data);
            if (res.ok) {
                openSnackBar('Address Added', 'success');
                setOpenModal(false);
                reset();
                await fetchAddresses();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error creating Address:', error);
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
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Button
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                    sx={{ bgcolor: '#748CAB' }}
                >
                    Add New Address
                </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {addressList}
            </Box>
            <CustomSnackBar />

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
                        p: 3,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Add New Address
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField
                                label="Street"
                                {...register('street', { required: 'Street is required' })}
                                error={!!errors.street}
                                helperText={errors.street?.message}
                                fullWidth
                            />
                            <TextField
                                label="City"
                                {...register('city', { required: 'City is required' })}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                                fullWidth
                            />
                            <TextField
                                label="State"
                                {...register('state', { required: 'State is required' })}
                                error={!!errors.state}
                                helperText={errors.state?.message}
                                fullWidth
                            />
                            <TextField
                                label="Zip Code"
                                {...register('zipCode', {
                                    required: 'Zip Code is required',
                                    pattern: {
                                        value: /^\d{5}$/,
                                        message: 'Zip Code must be 5 digits',
                                    },
                                })}
                                error={!!errors.zipCode}
                                helperText={errors.zipCode?.message}
                                fullWidth
                            />
                            <TextField
                                label="Country"
                                {...register('country', { required: 'Country is required' })}
                                error={!!errors.country}
                                helperText={errors.country?.message}
                                fullWidth
                            />
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="flex-end"
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => reset()}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ bgcolor: '#748CAB' }}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
