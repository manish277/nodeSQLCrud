module.exports = (sequelize, Sequelize) => {
    const Agent = sequelize.define("agent", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING
        },
        pin: {
            type: Sequelize.INTEGER
        },
        profileavtar: {
            type: Sequelize.STRING
        },

    });

    return Agent;
};