'use strict'

const CounterKey = use('App/Models/Counterkey')

class CounterkeyController {

  async index({ auth, request }) {
    const { supervisor } = request.only(['supervisor'])

    if (!supervisor) {
      await auth.check()
    } else {
      await auth.authenticator('jwt2').check()
    }

    const counterkeys = await CounterKey.all()

    return counterkeys
  }

  async store({ request, auth }) {
    const data = request.only(['key', 'date_client', 'client_id', 'supervisor'])

    if (!data.supervisor) {
      await auth.check()
    } else {
      await auth.authenticator('jwt2').check()
    }

    const counterkey = await CounterKey.create(data)

    const { key } = request.only(['key'])

    const date = new Date()

    const liberation = ((parseFloat(key) * 2) * (parseFloat(date.getMonth()) + 1) * (parseFloat(date.getFullYear()))) - 88

    return { key: liberation, data: counterkey }
  }

  async show({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const counterkey = await CounterKey.findOrFail(params.id)

    return counterkey
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const counterkey = await CounterKey.findOrFail(params.id)

    const data = request.only(['key', 'date_client', 'client_id'])

    counterkey.merge(data)

    await counterkey.save()

    return counterkey
  }

  async destroy({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const counterkey = await CounterKey.findOrFail(params.id)

    await counterkey.delete()
  }
}

module.exports = CounterkeyController
