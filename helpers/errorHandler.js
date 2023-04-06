const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    switch (err.status) {
        case (err.status):
            res.status(err.status).json({ error: err.message });
            break;
        default:
            res.status(500).json({ error: 'Internal Server Error' });
            break;
    }
}


module.exports = errorHandler;

