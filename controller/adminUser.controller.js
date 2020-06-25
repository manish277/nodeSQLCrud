const db = require("../models");
const AdminUser = db.adminUser;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
    AdminUser.findAll({
        where: {
            [Op.or]: {
                email: req.body.email,
                username: req.body.username,
            }
        }
    }).then((user) => {
        if (user && user.length > 0) {

            user.forEach(element => {
                if (element.username == req.body.username) {
                    return res.status(200).send({ message: `User Name already exist` });

                } else if (element.email == req.body.email) {
                    return res.status(200).send({ message: `User Email already exist` });

                }
            });
        }
        else {
            let adminUser;
            if (req.body.adminfor) {
                adminUser = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    email: req.body.email,
                    role: req.body.role,
                    adminfor: req.body.adminfor
                };
            } else {
                adminUser = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    email: req.body.email,
                    role: req.body.role,
                };
            }
            AdminUser.create(adminUser)
                .then(data => {
                    return res.send(data);
                })
                .catch(err => {
                    return res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the user."
                    });
                });
        }
    }).catch((err) => res.status(404).send({ message: 'something wrong', Error: err }));


};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    AdminUser.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving AdminUser."
            });
        });
};

// // Find a single AdminUser with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//     AdminUser.findByPk(id)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving AdminUser with id=" + id
//             });
//         });
// };

// // Update a AdminUser by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;

//     AdminUser.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "AdminUser was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update AdminUser with id=${id}. Maybe AdminUser was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating AdminUser with id=" + id
//             });
//         });
// };

// // Delete a AdminUser with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     AdminUser.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "AdminUser was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete AdminUser with id=${id}. Maybe AdminUser was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete AdminUser with id=" + id
//             });
//         });
// };

// // Delete all AdminUser from the database.
// exports.deleteAll = (req, res) => {
//     AdminUser.destroy({
//         where: {},
//         truncate: false
//       })
//         .then(nums => {
//           res.send({ message: `${nums} AdminUsers were deleted successfully!` });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all AdminUsers."
//           });
//         });
// };

