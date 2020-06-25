const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {

    // Create a Client
    Client.findAll({
        where: {
            [Op.or]: {
                email: req.body.email,
                username: req.body.username,
            }
        }
    }).then((user) => {
        if (user && user.length > 0) {

            user.forEach(element => {
                if(element.username == req.body.username){
                    return res.status(200).send({ message: `User Name already exist` });

                } else if(element.email == req.body.email) {
                    return res.status(200).send({ message: `User Email already exist` });

                }
            });
        }
        else {
            const client = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,

            };

            // Save Client in the database
            Client.create(client)
                .then(data => {
                    return res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Client."
                    });
                });
        }

    }).catch((err) => res.status(404).send({ message: 'something wrong', Error: err }));

};

exports.findAll = (req, res) => {
    Client.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Client."
            });
        });
}