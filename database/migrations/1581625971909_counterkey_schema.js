'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CounterkeySchema extends Schema {
  up() {
    this.create('counterkeys', (table) => {
      table.increments()
      table.integer('key').notNullable()
      table.datetime('date_client').notNullable()
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('counterkeys')
  }

  client() {
    return this.belongsTo('App/Models/Client')
  }
}

module.exports = CounterkeySchema
