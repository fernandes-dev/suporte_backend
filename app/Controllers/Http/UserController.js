'use strict'

const User = use("App/Models/User")

class UserController {

  async index({ auth }) {
    await auth.authenticator('jwt2').check()

    const users = await User.all()

    return users
  }

  async store({ request }) {
    const data = request.only([
      'name', 'email', 'password', 'sector_id'
    ])

    const user = await User.create(data)

    return user
  }

  async show({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const user = await User.findOrFail(params.id)

    return user
  }

  async update({ params, request, auth, response }) {
    const user = await User.findOrFail(params.id)
    const userJSON = await user.toJSON()

    await auth.check()
    const authUser = await auth.getUser()

    if (userJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    const data = request.only([
      'name', 'email', 'password', 'sector_id'
    ])

    user.merge(data)

    await user.save()

    return user
  }

  async destroy({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    const userJSON = await user.toJSON()

    await auth.check()
    const authUser = await auth.getUser()

    if (userJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    user.merge({ status: 'Inativo' })

    await user.save()

    return user
  }
}

module.exports = UserController
