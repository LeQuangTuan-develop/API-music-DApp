'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class SongCategory extends Model {
        static associate(models) {
            // Category -> song
            SongCategory.hasMany(models.Song, {
                foreignKey: 'categoryId',
                as: 'categoryData',
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
                unique: true,
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
            indexes: [
                // add a FULLTEXT index
                { type: 'FULLTEXT', name: 'fts_cate', fields: ['name'] },
            ],
            sequelize,
            timestamps: false,
        }
    )
    return SongCategory
}
