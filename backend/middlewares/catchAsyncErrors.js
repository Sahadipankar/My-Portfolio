// Middleware to catch errors in async route handlers and pass them to Express error handler
export const catchAsyncErrors = (theFunction) => {
    return (req, res, next) => {
        Promise.resolve(theFunction(req, res, next)).catch(next); // Catch errors and forward to next()
    };
};
