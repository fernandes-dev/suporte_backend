'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up () {
    this.create('cities', (table) => {
      table.increments()
      table.string('name')
      table
        .integer('state_id')
        .unsigned()
        .references('id')
        .inTable('states')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('cities')
  }

  state() {
    return this.belongsTo('App/Models/State')
  }

  districts() {
    return this.hasMany('App/Models/District')
  }
}

module.exports = CitySchema
