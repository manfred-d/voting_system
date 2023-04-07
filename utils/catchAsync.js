


const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fin(req, res, next)).catch(next);
    };
};



// Path: utils/errorHandler.js
module.exports = { catchAsync}
