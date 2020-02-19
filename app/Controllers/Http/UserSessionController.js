'use strict'

class UserSessionController {

    async create({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.authenticator('jwt2')
            .attempt(email, password)

        return token
    }
}

module.exports = UserSessionController
