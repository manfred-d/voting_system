
//errorHandler

module.exports = function (err, req, res, next) {
    console.log(err);
    res.status(500).json({
        success: false,
        error: "Server Error",
    });
}
    