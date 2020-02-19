'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectorSchema extends Schema {
  up () {
    this.create('sectors', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sectors')
  }

  users () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = SectorSchema
