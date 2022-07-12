'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Song extends Model {
        static associate(models) {
            // Song -> User
            Song.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'songData',
            })
            // Song -> comment
            Song.hasMany(models.Comment, {
                foreignKey: 'songId',
                as: 'commentData',
            })
            // Song -> genre
            Song.belongsTo(models.Genre, {
                foreignKey: 'genreId',
                as: 'genreData',
            })
            // Song -> Song Category
            Song.belongsTo(models.SongCategory, {
                foreignKey: 'categoryId',
                as: 'categoryData',
            })
            // Song -> PlayListDetail
            Song.hasMany(models.PlayListDetail, {
                foreignKey: 'songId',
                as: 'playListDetailData',
            })
        }
    }

    Song.init(
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
                validate: {
                    len: [3, 255],
                },
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'PENDING',
                validate: {
                    isIn: [['PENDING', 'REFUSE', 'PUBLISH', 'HIDE']],
                },
            },
            lyric: {
                type: DataTypes.TEXT('medium'),
                allowNull: false,
                // check từ nhạy cảm phản động
            },
            lyricRendered: {
                type: DataTypes.TEXT('medium'),
                allowNull: false,
                // check từ nhạy cảm phản động
            },
            musician: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            // image
            audioUrl: {
                type: DataTypes.STRING(500),
                validate: { isUrl: true },
            },
            lengthSeconds: {
                type: DataTypes.SMALLINT.UNSIGNED,
                validate: {
                    isInt: true,
                    min: 10,
                    max: 600,
                },
            },
            hashtag: {
                type: DataTypes.STRING,
                validate: {
                    is: {
                        args: ['(^|s)(#[a-zd-]+)', 'i'],
                        msg: 'Your hashtag must be start with # character!',
                    },
                },
            },
            totalStar: {
                type: DataTypes.SMALLINT.UNSIGNED,
                defaultValue: 0,
            },
            totalView: {
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            deleteAt: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true,
                },
            },
            // foreign key column
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            genreId: {
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
    return Song
}
