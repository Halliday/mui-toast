import { Portal, Snackbar } from "@mui/material";
import React, { useInsertionEffect, useState } from "react";


type Toast = {
    message?: string,
    action?: React.ReactNode
    autoHideDuration?: number,
}

type ToastInstance = {
    showToast: (state: Toast | null) => void,
}

let instance: ToastInstance | null = null;

const defaultAutoHideDuration = 6000;

export interface ToastContainerProps {
}

export function ToastContainer(props: ToastContainerProps) {
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState<Toast>({});

    function handleClose() {
        setOpen(false);
    }

    useInsertionEffect(() => {
        const i: ToastInstance = {
            showToast: (toast) => {
                if (toast === null) {
                    setOpen(false);
                } else {
                    setToast(toast);
                    setOpen(true);
                }
            }
        };
        if (instance !== null) {
            console.error("There are multiple <ToastProvider/> instances! Please use only one <ToastProvider/> on the page.");
            return
        }
        instance = i;
        return () => {
            if (instance === i)
                instance = null;
        }
    }, []);

    return <Snackbar
        open={open}
        autoHideDuration={toast.autoHideDuration ?? defaultAutoHideDuration}
        onClose={handleClose}
        message={toast.message}
        action={toast.action}
    />;
}

export function toast(msg: string): void;
export function toast(toast: Toast | null): void;
export function toast(toast: Toast | string | null): void {
    if (instance === null) {
        console.error("There is no <ToastProvider/> on the page.");
        return
    }
    if (typeof toast === "string") instance.showToast({ message: toast });
    else instance.showToast(toast);
}