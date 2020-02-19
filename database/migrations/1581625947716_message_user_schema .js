'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Message_UserSchema extends Schema {
  up() {
    this.create('messages_user', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('message')
      table.string('protocol').notNullable().unique()
      table.datetime('message_expires').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('messages_user')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Message_UserSchema
