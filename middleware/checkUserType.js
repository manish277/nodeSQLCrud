
module.exports = function (req, res, next) {
    if (req.headers.usertype == 'Admin' || req.headers.usertype == 'admin') {
        next()
    } else {
        return res.status(500).send({
            message:
                'You have not rights to this task'
        });
    }
}