'use strict'

const Config = use('App/Models/Config')

class ConfigController {

  async index({ auth }) {
    const configs = await Config.all()

    return configs
  }

  async store({ request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only(['message_expires', 'notification_expires'])

    const config = await Config.create(data)

    return config
  }

  async show({ params, auth }) {
    const config = await Config.findOrFail(params.id)

    return config
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const config = await Config.findOrFail(params.id)

    const data = request.only(['message_expires', 'notification_expires'])

    config.merge(data)

    await config.save()

    return config
  }

  async destroy({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const config = await Config.findOrFail(params.id)

    await config.delete()
  }
}

module.exports = ConfigController
