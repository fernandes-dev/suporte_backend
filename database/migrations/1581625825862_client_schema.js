'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up() {
    this.create('clients', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('company_name') // razão social
      table.enu('type', ['Jurídica', 'Física']).notNullable()
      table.enu('class', ['Cliente', 'Fornecedor'])
        .defaultTo('Cliente').notNullable()
      table.string('document').notNullable().unique() // cpf ou cnpj
      table.string('state_registration') // incrição estadual
      table.string('rg') // RG
      table.string('municipal_registration') // incrição municipal
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone') // telefone empresarial
      table.string('phone_cel') // telefone pessoal / celular
      table.string('birthday') // data de aniversário ou fundação da empresa
      table.enu('simple_national', ['Sim', 'Não'])
        .defaultTo('Não') // 'sim' para optante e 'não' para não optante
      table.string('obs') // observações
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
