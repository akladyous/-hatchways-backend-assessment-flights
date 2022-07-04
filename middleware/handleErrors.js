export const handleErrors = (error, req, res, next) => {
    console.log(
        "\x1b[31m%s\x1b[0m",
        `Error Message -> ${typeof error.message === "object"
            ? JSON.stringify(error.message)
            : error.message
        }`
    );
    res.status(error.status || 500).json(error.message);
};
