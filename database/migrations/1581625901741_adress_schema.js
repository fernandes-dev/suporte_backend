'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdressSchema extends Schema {
  up() {
    this.create('adresses', (table) => {
      table.increments()
      table.string('street').notNullable()
      table
        .integer('district_id')
        .unsigned()
        .references('id')
        .inTable('districts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('state_id')
        .unsigned()
        .references('id')
        .inTable('states')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('complement')
      table.string('cep')
      table.enu('type', ['Comercial', 'Residencial', 'Outro']).notNullable()
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo')
      table.timestamps()
    })
  }

  down() {
    this.drop('adresses')
  }

  client() {
    return this.belongsTo('App/Models/Client')
  }
}

module.exports = AdressSchema
