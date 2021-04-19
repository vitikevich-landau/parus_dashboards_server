const showAuthPrompt = async (req, res, next) => {
    /***
     *  adMin:supersecret
     * */
    if (req.header('Authorization') !== 'Basic YWRNaW46c3VwZXJzZWNyZXQ=') {
        res.header('WWW-Authenticate', 'Basic');
        res.sendStatus(401);
    } else {
        next();
    }
};

module.exports = {
    showAuthPrompt
}