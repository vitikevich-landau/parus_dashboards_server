const delay = async (req, res, next) => {
    await new Promise(resolve => setTimeout(resolve, 250));

    next();
};

module.exports = delay;