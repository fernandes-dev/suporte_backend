'use strict'

const District = use('App/Models/District')

class DistrictController {

  async index({ auth }) {
    const district = await District.all()

    return district
  }

  async store({ request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only([
      'name', 'city_id'
    ])

    const district = await District.create(data)

    return district
  }

  async show({ params, auth }) {
    const district = await District.findOrFail(params.id)

    return district
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const district = await District.findOrFail(params.id)

    const data = request.only(['name', 'city_id'])

    district.merge(data)

    await district.save()

    return district
  }

  async destroy({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const district = await District.findOrFail(params.id)

    await district.delete()
  }
}

module.exports = DistrictController
