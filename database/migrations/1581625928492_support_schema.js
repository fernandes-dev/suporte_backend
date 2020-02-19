'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SupportSchema extends Schema {
  up() {
    this.create('supports', (table) => {
      table.increments()
      table.string('topic').notNullable()
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('status_supports')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('description').notNullable()
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
    this.drop('supports')
  }

  status() {
    return this.hasOne('App/Models/StatusSupport')
  }
}

module.exports = SupportSchema
