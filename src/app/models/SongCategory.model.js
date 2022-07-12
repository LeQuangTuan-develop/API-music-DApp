'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class SongCategory extends Model {
        static associate(models) {
            // Category -> song
            SongCategory.hasMany(models.Song, {
                foreignKey: 'categoryId',
                as: 'songData',
            })
        }
    }

    SongCategory.init(
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
            imageUrl: {
                type: DataTypes.STRING(500),
                validate: {
                    isUrl: true,
                },
            },
        },
        {
            sequelize,
            timestamps: false,
        }
    )
    return SongCategory
}
