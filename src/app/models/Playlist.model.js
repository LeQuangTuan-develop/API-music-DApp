'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        static associate(models) {
            // playlist -> user
            Playlist.belongsTo(models.User, {
                foreignKey: 'userId',
            })
            // playlist -> play list detail
            Playlist.hasMany(models.PlayListDetail, {
                foreignKey: 'playListId',
                as: 'playlistData',
            })
        }
    }

    Playlist.init(
        {
            _id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(128),
                defaultValue: 'My Playlist',
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            timestamps: true,
        }
    )
    return Playlist
}
