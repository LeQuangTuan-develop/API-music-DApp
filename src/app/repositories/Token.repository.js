const { Token } = require('../models')

class TokenRepository {
    async logout(refreshToken) {
        const logoutToken = await Token.update(
            {
                token: null,
            },
            {
                where: {
                    token: refreshToken,
                },
            }
        )
        return logoutToken
    }
}

module.exports = new TokenRepository()
