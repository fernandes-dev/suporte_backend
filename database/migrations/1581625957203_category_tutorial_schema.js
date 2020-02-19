'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryTutorialSchema extends Schema {
  up() {
    this.create('category_tutorials', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('category_tutorials')
  }

  tutorials() {
    return this.hasMany('App/Models/Tutorial')
  }
}

module.exports = CategoryTutorialSchema
