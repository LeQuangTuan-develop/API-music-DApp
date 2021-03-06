'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        static associate(models) {
            // foreign key
            Token.belongsTo(models.User, {
                foreignKey: 'userId',
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
                type: DataTypes.STRING(256),
                unique: true,
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: false,
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
