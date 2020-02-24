'use strict'

const Client = use("App/Models/Client")

class ClientController {

  async index() {
    const clients = await Client.all()

    return clients
  }

  async store({ request }) {
    const data = request.only([
      'name', 'company_name', 'type', 'class', 'document', 'state_registration',
      'rg', 'municipal_registration', 'email', 'password', 'phone', 'phone_cel',
      'birthday', 'simple_national', 'obs', 'status'
    ])

    const client = await Client.create(data)

    return client
  }

  async show({ params }) {
    const client = await Client.findOrFail(params.id)

    return client
  }

  async update({ params, auth, request, response }) {
    const client = await Client.findOrFail(params.id)
    const clientJSON = await client.toJSON()

    await auth.check()
    const authUser = await auth.getUser()

    if (clientJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    const data = request.only([
      'name', 'company_name', 'type', 'class', 'document', 'state_registration',
      'rg', 'municipal_registration', 'email', 'password', 'phone', 'phone_cel',
      'birthday', 'simple_national', 'obs', 'status'
    ])

    client.merge(data)

    await client.save()

    return client
  }

  async destroy({ params, auth, response }) {
    const client = await Client.findOrFail(params.id)
    const clientJSON = await client.toJSON()

    await auth.check()
    const authUser = await auth.getUser()

    if (clientJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    client.merge({ status: 'Inativo' })

    await client.save()

    return client
  }
}

module.exports = ClientController
