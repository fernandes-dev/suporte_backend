'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/client_session', 'ClientSessionController.create')

Route.post('/user_session', 'UserSessionController.create')

Route.resource('clients', 'ClientController').apiOnly()

Route.resource('users', 'UserController').apiOnly()

Route.resource('sectors', 'SectorController').apiOnly()

Route.resource('adresses', 'AdressController').apiOnly()

Route.resource('cities', 'CityController').apiOnly()

Route.resource('states', 'StateController').apiOnly()

Route.resource('districts', 'DistrictController').apiOnly()

Route.resource('counterkey', 'CounterkeyController').apiOnly()

Route.resource('statussup', 'StatusSupportController').apiOnly()