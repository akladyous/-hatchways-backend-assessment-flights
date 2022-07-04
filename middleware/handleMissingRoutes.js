export const handleMissingRoutes = (req, res, next) => {
    const error = new Error("404 Not Found");
    error.status = 404;
    error.name = "Router Error";
    next(error);
};