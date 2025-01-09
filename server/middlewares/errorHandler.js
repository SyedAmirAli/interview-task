/**
 * Custom error handler
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const errorHandler = (error, req, res, next) => {
    // If the response has already been sent, pass control to the default error handler
    if (res.headersSent) {
        return next(error);
    }

    // Set the status code to the error status code, defaulting to 500 if it's not set
    const status = res.statusCode ? res.statusCode : 500;

    // Send the error response
    return res.status(status).json({
        message: error.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
};
