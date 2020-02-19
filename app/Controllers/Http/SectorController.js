'use strict'

const Sector = use("App/Models/Sector")

class SectorController {

  async index({ auth }) {
    await auth.authenticator('jwt2').check()

    const sectors = await Sector.all()

    return sectors
  }

  async store({ request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only(['name'])

    const sector = await Sector.create(data)

    return sector
  }

  async show({ params }) {
    await auth.authenticator('jwt2').check()

    const sector = await Sector.findOrFail(params.id)

    return sector
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const sector = await Sector.findOrFail(params.id)

    const data = request.only(['name'])

    sector.merge(data)

    await sector.save()

    return sector
  }

  async destroy({ params, auth, response }) {
    await auth.authenticator('jwt2').check()

    const sector = await Sector.findOrFail(params.id)

    await sector.delete()
  }
}

module.exports = SectorController
