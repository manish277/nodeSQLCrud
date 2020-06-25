module.exports = (sequelize, Sequelize) => {
    const AdminUser = sequelize.define("adminuser", {
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
        adminfor: {
            type: Sequelize.STRING,
            get() {
                if (this.getDataValue('adminfor')) {
                    return this.getDataValue('adminfor').split(',')
                } else {
                    return [];
                }
            },
            set(val) {
                if (val != null) {
                    this.setDataValue('adminfor', val.join(','));
                } else {
                    val = null;
                }
            },
            allowNull: true,

        }

    });

    return AdminUser;
};