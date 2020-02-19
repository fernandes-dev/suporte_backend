'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
    static boot() {
        super.boot()
        this.addHook('beforeCreate', 'ClientHook.hashPassword')
        this.addHook('beforeUpdate', 'ClientHook.hashPassword')
    }
}

module.exports = Client
