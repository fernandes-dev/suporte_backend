'use strict'

const Client = use("App/Models/Client")
const Adress = use("App/Models/Adress")

class AdressController {

  async index({ auth }) {
    const adresses = await Adress.all()

    return adresses
  }

  async store({ request, auth }) {
    const { client_id } = request.only(['client_id'])
    const client = await Client.findOrFail(client_id)
    const clientJSON = await client.toJSON()

    await auth.check()
    const authUser = await auth.getUser()

    if (clientJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    const data = request.only([
      'street', 'district_id', 'city_id', 'state_id',
      'complement', 'cep', 'type', 'client_id'
    ])

    const adress = await Adress.create(data)

    return adress
  }

  async show({ params, auth }) {
    const adress = await Adress.findOrFail(params.id)

    return adress
  }

  async update({ params, request, response }) {
    const { client_id } = request.only(['client_id'])
    const client = await Client.findOrFail(client_id)
    const clientJSON = await client.toJSON()

    await auth.check()
    const authUser = await auth.getUser()

    if (clientJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    const adress = await Adress.findOrFail(params.id)

    const data = request.only([
      'street', 'district_id', 'city_id', 'state_id',
      'complement', 'cep', 'type', 'client_id'
    ])

    adress.merge(data)

    await adress.save()

    return adress
  }

  async destroy({ params, request, auth, response }) {
    const { client_id } = request.only(['client_id'])
    const client = await Client.findOrFail(client_id)
    const clientJSON = await client.toJSON()

    await auth.check()
    const authUser = await auth.getUser()

    if (clientJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    const adress = await Adress.findOrFail(params.id)

    await adress.delete()
  }
}

module.exports = AdressController
