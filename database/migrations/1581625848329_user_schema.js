'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table
        .integer('sector_id')
        .unsigned()
        .references('id')
        .inTable('sectors')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo')
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }

  sector() {
    return this.belongsTo('App/Models/Sector')
  }

  messages() {
    return this.hasMany('App/Models/Message_User')
  }

  tutorials() {
    return this.hasMany('App/Models/Tutorial')
  }
}

module.exports = UserSchema
