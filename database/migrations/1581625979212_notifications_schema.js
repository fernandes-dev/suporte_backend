'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up() {
    this.create('notifications', (table) => {
      table.increments()
      table.string('description').notNullable()
      table.boolean('viewed').notNullable().defaultTo(false)
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.datetime('notification_expires').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('notifications')
  }

  clients() {
    return this.belongsTo('App/Models/Client')
  }
}

module.exports = NotificationsSchema
