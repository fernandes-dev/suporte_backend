'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatesSchema extends Schema {
  up() {
    this.create('states', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down() {
    this.drop('states')
  }

  cities() {
    return this.hasMany('App/Models/City')
  }
}

module.exports = StatesSchema
