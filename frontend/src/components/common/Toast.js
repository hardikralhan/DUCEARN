import toast from 'react-hot-toast'

export function ToastError(msg) {
    toast.error(msg, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}

export function ToastSuccess(msg) {
    toast.success(msg, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}
