'use strict'

const Tutorial = use('App/Models/Tutorial')

class TutorialController {

  async index() {
    const tutorials = await Sector.all()

    return tutorials
  }

  async store({ request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only([
      'name', 'url', 'date', 'user_id', 'category_id'
    ])

    const tutorial = await Tutorial.create(data)

    return tutorial
  }

  async show({ params }) {
    const tutorial = await Tutorial.findOrFail(params.id)

    return tutorial
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only([
      'name', 'url', 'date', 'user_id', 'category_id'
    ])

    const tutorial = await Tutorial.findOrFail(params.id)

    tutorial.merge(data)

    await tutorial.save()

    return tutorial
  }

  async destroy({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const tutorial = await Tutorial.findOrFail(params.id)

    tutorial.merge({ status: 'Inativo' })

    await tutorial.save()

    return tutorial
  }
}

module.exports = TutorialController
