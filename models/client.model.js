module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
    });
    return Client;
};