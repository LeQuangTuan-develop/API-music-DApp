'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class PlayListDetail extends Model {
        static associate(models) {
            // foreign key
            PlayListDetail.belongsTo(models.Song, {
                foreignKey: 'songId',
                as: 'playListDetailData',
            })
            // play list detail -> playlist
            PlayListDetail.belongsTo(models.Playlist, {
                foreignKey: 'playListId',
                as: 'playlistData',
            })
        }
    }

    PlayListDetail.init(
        {
            _id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            playListId: {
                type: DataTypes.INTEGER,
            },
            songId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            timestamps: false,
        }
    )
    return PlayListDetail
}
