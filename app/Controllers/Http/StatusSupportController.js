'use strict'

const StatusSup = use('App/Models/StatusSupport')

class StatusSupportController {

  async index({ auth }) {
    const status = await StatusSup.all()

    return status
  }

  async store({ request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only(['name', 'priority'])

    const status = await StatusSup.create(data)

    return status
  }

  async show({ params }) {

    const status = await StatusSup.findOrFail(params.id)

    return status
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const status = await StatusSup.findOrFail(params.id)

    const data = request.only(['name', 'priority'])

    status.merge(data)

    await status.save()

    return status
  }

  async destroy({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const status = await StatusSup.findOrFail(params.id)

    await status.delete()
  }
}

module.exports = StatusSupportController
