const { Model } = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    const userSchema = require('./schema/user')(Datatypes);

    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Patient, {
                foreignKey: 'patient_id',
                as: 'patient'
            });
        }

        static async getAllUsers(data = {}) {
            try {
                const users = await User.findAll();
                return users;
            } catch (error) {
                throw error;
            }
        }

        static async getUserById(id) {
            try {
                const user = await User.findByPk(id);
                return user;
            } catch (error) {
                throw error;
            }
        }

        static async createUser(data = {}) {
            try {
                const user = await User.create(data);
                return user;
            } catch (error) {
                throw error;
            }
        }

        static async updateUser(id, data = {}) {
            try {
                const [updated] = await User.update(data, { where: { id } });
                return updated;
            } catch (error) {
                throw error;
            }
        }

        static async deleteUser(id) {
            try {
                await User.destroy({ where: { id } });
            } catch (error) {
                throw error;
            }
        }
    }

    User.init(userSchema, {
        sequelize,
        tableName: 'Users',
        modelName: 'User',
        timestamps: true, 
    });

    return User;
};
