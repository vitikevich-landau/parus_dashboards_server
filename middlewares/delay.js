const delay = async (req, res, next) => {
    const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

    await new Promise(resolve => setTimeout(resolve, randomInteger(250, 950)));

    next();
};

module.exports = delay;