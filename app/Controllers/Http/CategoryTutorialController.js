'use strict'

const Category = use('App/Models/CategoryTutorial')

class CategoryTutorialController {

  async index({ auth }) {
    const categories = await Category.all()

    return categories
  }

  async store({ request, auth }) {
    await auth.authenticator('jwt2').check()

    const data = request.only(['name'])

    const category = await Category.create(data)

    return category
  }

  async show({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const category = await Category.findOrFail(params.id)

    return category
  }

  async update({ params, request, auth }) {
    await auth.authenticator('jwt2').check()

    const category = await Category.findOrFail(params.id)

    const data = request.only(['name'])

    category.merge(data)

    await category.save()

    return category
  }

  async destroy({ params, auth }) {
    await auth.authenticator('jwt2').check()

    const category = await Category.findOrFail(params.id)

    await category.delete()
  }
}

module.exports = CategoryTutorialController
