'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up() {
    this.create('clients', (table) => {
      table.increments()
      table.string('identification').notNullable()
      table.enu('type', ['Jurídica', 'Física']).notNullable()
      table.string('document').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.string('birthday')
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo')
      table.timestamps()
    })
  }

  down() {
    this.drop('clients')
  }

  adresses() {
    return this.hasMany('App/Models/Adress')
  }

  // messages() {
  //   return this.hasMany('App/Models/Message_Client')
  // }

  counterkey() {
    return this.hasMany('App/Models/Counterkey')
  }

  notifications() {
    return this.hasMany('App/Models/Notification')
  }
}

module.exports = ClientSchema
