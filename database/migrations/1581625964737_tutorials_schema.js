'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TutorialsSchema extends Schema {
  up() {
    this.create('tutorials', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('url').notNullable().unique()
      table.datetime('date').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('category_tutorials')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo')
      table.timestamps()
    })
  }

  down() {
    this.drop('tutorials')
  }

  category() {
    return this.belongsTo('App/Models/CategoryTutorial')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = TutorialsSchema
