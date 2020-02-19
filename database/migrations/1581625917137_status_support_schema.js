'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSupportSchema extends Schema {
  up () {
    this.create('status_supports', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('priority').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('status_supports')
  }

  support() {
    return this.belongsTo('App/Models/Support')
  }
}

module.exports = StatusSupportSchema
