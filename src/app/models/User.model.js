'use-strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // user -> token
            User.hasMany(models.Token, {
                foreignKey: 'userId',
                as: 'tokenData',
            })
            // user -> song
            User.hasMany(models.Song, { foreignKey: 'userId', as: 'songData' })
            // user -> playlist
            User.hasMany(models.Playlist, {
                foreignKey: 'userId',
                as: 'playListData',
            })
            // user -> comment
            User.hasMany(models.Comment, {
                foreignKey: 'userId',
                as: 'commentData',
            })
        }
    }

    User.init(
        {
            _id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(60),
                unique: true,
                allowNull: false,
                validate: {
                    len: [1, 128],
                    not: {
                        args: /((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm,
                        msg: `Your username can't be blank! `,
                    },
                    isAlphanumeric : true,
                    // check blank
                },
            },
            password: {
                type: DataTypes.STRING(256),
                allowNull: false,
                validate: {
                    len: [8, 256],
                },
            },
            fullName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(360),
            },
            gender: {
                type: DataTypes.BOOLEAN,
                defaultValue: false, // false = FeMale, true = Male
            },
            birthDate: {
                type: DataTypes.DATEONLY,
                validate: {
                    isDate: true,
                    isBefore: new Date()
                        .toJSON()
                        .slice(0, 10)
                        .replace(/-/g, '-'), // before current date
                },
            },
            phone: {
                type: DataTypes.STRING(12),
                validate: {
                    is: {
                        args: ['^(84|0[3|5|7|8|9])+([0-9]{8})$', 'i'],
                        msg: 'Your phone is not valid!',
                    },
                },
            },
            email: {
                type: DataTypes.STRING(100),
                validate: { isEmail: true },
                unique: true,
            },
            avatarUrl: {
                type: DataTypes.STRING(500),
                validate: { isUrl: true },
            },
            description: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'USER',
                validate: {
                    isIn: [['USER', 'ADMIN']],
                    isUppercase: true,
                },
            },
            isBlock : {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        },
        {
            sequelize,
            timestamps: true,
        }
    )
    return User
}
