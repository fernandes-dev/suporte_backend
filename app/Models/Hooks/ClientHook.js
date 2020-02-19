'use strict'

const Hash = use('Hash')

const ClientHook = exports = module.exports = {}

ClientHook.hashPassword = async (client) => {
    client.password = await Hash.make(client.password)
}
