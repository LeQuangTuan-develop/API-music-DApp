'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        static associate(models) {
            // foreign key
            Token.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'tokenData',
            })
        }
    }

    Token.init(
        {
            _id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // foreign key
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING(128),
                unique: true,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            expiredDate: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: true,
                },
            },
            blackListed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            timestamps: true,
        }
    )
    return Token
}
