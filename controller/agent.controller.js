const db = require("../models");
const Agent = db.agent;
const Op = db.Sequelize.Op;

// Create and Save a new Agent
exports.create = (req, res) => {
    Agent.findAll({
        where: {
            [Op.or]: {
                email: req.body.email,
                username: req.body.username,
            }
        }
    }).then((user) => {
        console.log(user)
        if (user && user.length > 0) {
            user.forEach(element => {
                if(element.username == req.body.username){
                    return res.status(200).send({ message: `User Name already exist` });

                } else if(element.email == req.body.email) {
                    return res.status(200).send({ message: `User Email already exist` });

                }
            });

        } else {
            const agent = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                pin: req.body.pin,
                profileavtar: req.body.profileavtar,

            };
            Agent.create(agent)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Agent."
                    });
                });
        }
    }).catch((err) => res.status(404).send({ message: 'something wrong', Error: err }));

};

exports.findAll = (req, res) => {
    Agent.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        });
};