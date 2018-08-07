module.exports = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
};
