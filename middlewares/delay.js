const delay = async (req, res, next) => {
    const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

    await new Promise(resolve => setTimeout(resolve, randomInteger(450, 1250)));

    next();
};

module.exports = delay;