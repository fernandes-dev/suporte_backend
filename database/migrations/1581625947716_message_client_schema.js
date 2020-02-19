'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Message_ClientSchema extends Schema {
  up() {
    this.create('messages_client', (table) => {
      table.increments()
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('message')
      table.string('protocol').notNullable().unique()
      table.datetime('message_expires').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('messages_client')
  }

  client() {
    return this.belongsTo('App/Models/Client')
  }
}

module.exports = Message_ClientSchema
