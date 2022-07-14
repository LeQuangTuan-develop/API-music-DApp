'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Genre extends Model {
        static associate(models) {
            // genre -> song
            Genre.hasMany(models.Song, {
                foreignKey: 'songId',
                as: 'songData',
            })
        }
    }

    Genre.init(
        {
            _id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            imageUrl: {
                type: DataTypes.STRING(500),
                validate: {
                    isUrl: true,
                },
            },
        },
        {
            sequelize,
            timestamps: true,
        }
    )
    return Genre
}
