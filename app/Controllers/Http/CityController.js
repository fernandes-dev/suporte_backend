'use strict'

const City = use('App/Models/City')

class CityController {

  async index({ auth }) {
    const cities = await City.all()

    return cities
  }

  async store({ request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only([
      'name', 'state_id'
    ])

    const city = await City.create(data)

    return city
  }

  async show({ params, auth }) {
    const city = await City.findOrFail(params.id)

    return city
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const city = await City.findOrFail(params.id)

    const data = request.only([
      'name', 'state_id'
    ])

    city.merge(data)

    await city.save()

    return city
  }

  async destroy({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const city = await City.findOrFail(params.id)

    await city.delete()
  }
}

module.exports = CityController
