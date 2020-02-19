'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
    static boot() {
        super.boot()
        this.addHook('beforeCreate', 'UserHook.hashPassword')
        this.addHook('beforeUpdate', 'UserHook.hashPassword')
    }
}

module.exports = User
