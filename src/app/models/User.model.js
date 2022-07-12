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
                validate: {
                    len: [8, 128],
                    not: {
                        args: /((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm,
                        msg: `Your username can't be blank! `,
                    },
                    // check blank
                },
            },
            password: {
                type: DataTypes.STRING(128),
                validate: {
                    len: [8, 128],
                },
            },
            fullName: {
                type: DataTypes.STRING,
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
                type: DataTypes.STRING(10),
                validate: {
                    is: {
                        args: ['^(84|0[3|5|7|8|9])+([0-9]{8})$', 'i'],
                        msg: 'Your phone is not valid!',
                    },
                },
            },
            email: {
                type: DataTypes.STRING(320),
                validate: { isEmail: true },
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
                },
            },
        },
        {
            sequelize,
            timestamps: true,
        }
    )
    return User
}
