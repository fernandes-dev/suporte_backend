'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DistrictSchema extends Schema {
  up() {
    this.create('districts', (table) => {
      table.increments()
      table.string('name')
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('districts')
  }

  city() {
    return this.belongsTo('App/Models/City')
  }
}

module.exports = DistrictSchema
