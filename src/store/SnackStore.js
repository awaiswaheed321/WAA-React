import { create } from 'zustand';

const useSnackStore = create((set) => ({
    snackProps: {
        open: false,
        message: '',
        severity: 'info',
    },
    setSnackProps: (newProps) =>
        set((state) => ({
            snackProps: { ...state.snackProps, ...newProps },
        })),
    resetSnackProps: () =>
        set({
            snackProps: {
                open: false,
                message: '',
                severity: 'info',
            },
        }),
    openSnackBar: (message, severity) =>
        set((state) => ({
            snackProps: {
                ...state.snackProps,
                message,
                open: true,
                severity,
            },
        })),
}));

export default useSnackStore;
