'use strict'

const State = use('App/Models/State')

class StateController {

  async index({ auth }) {
    const states = await State.all()

    return states
  }

  async store({ request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only(['name'])

    const state = await State.create(data)

    return state
  }

  async show({ params, auth }) {
    const state = await State.findOrFail(params.id)

    return state
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const state = await State.findOrFail(params.id)

    const data = request.only(['name'])

    state.merge(data)

    await state.save()

    return state
  }

  async destroy({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const state = await State.findOrFail(params.id)

    await state.delete()
  }
}

module.exports = StateController
