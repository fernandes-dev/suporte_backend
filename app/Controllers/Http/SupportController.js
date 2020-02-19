'use strict'

const Support = use('App/Models/Support')

class SupportController {

  async index({ auth, request }) {
    const supports = await Support.all()

    return supports
  }

  async store({ request, auth }) {
    const data = request.only([
      'topic', 'status_id', 'description', 'client_id', 'supervisor'
    ])

    if (!data.supervisor) {
      await auth.check()
    } else {
      await auth.authenticator('jwt2').check()
    }

    const support = await Support.create(data)

    return support
  }

  async show({ params }) {
    const support = await Support.findOrFail(params.id)

    return support
  }

  async update({ params, request, auth }) {
    const data = request.only([
      'topic', 'status_id', 'description', 'client_id', 'supervisor'
    ])

    const support = await Support.findOrFail(params.id)

    if (!data.supervisor) {
      await auth.check()
    } else {
      await auth.authenticator('jwt2').check()
    }

    await support.merge(data)

    return support
  }

  async destroy({ params, request, auth }) {
    const data = request.only(['supervisor'])

    if (!data.supervisor) {
      await auth.check()
    } else {
      await auth.authenticator('jwt2').check()
    }

    const support = await Support.findOrFail(params.id)

    support.merge({ status_id: 1 }) // colocar o status de cancelado

    await support.save()

    return support
  }
}

module.exports = SupportController
