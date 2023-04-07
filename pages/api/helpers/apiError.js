export const apiError = (res, status, message) => {
    return res.status(status).json({ message });
}