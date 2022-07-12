'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            // comment -> user
            Comment.belongsTo(models.User, { foreignKey: 'userId' })
            // comment -> song
            Comment.belongsTo(models.Song, {
                foreignKey: 'songId',
                as: 'commentData',
            })
        }
    }

    Comment.init(
        {
            _id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            parentCommentId: {
                type: DataTypes.INTEGER,
                defaultValue: null,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING(500),
                validate: {
                    isUrl: true,
                },
            },
            star: {
                type: DataTypes.SMALLINT.UNSIGNED,
                validate: {
                    min: 0,
                    max: 5,
                },
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            // foreign key
            songId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
        }
    )
    return Comment
}
