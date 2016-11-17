const joi = require('joi')
const adal = require('bindings')('adal-bridge')

const getTokenOptionsSchema = joi.object()
  .label('options')
  .required()
  .keys({
    authority: joi.string()
      .description('The AAD or ADFS authority')
      .default('https://login.windows.net/common')
      .uri(),
    resource: joi.string()
      .description('The resource whose token is needed')
      .required(),
    clientId: joi.string()
      .description('The client identifier')
      .required(),
    redirectUri: joi.string()
      .description('The redirect URI according to OAuth2 protocol')
      .default('urn:ietf:wg:oauth:2.0:oob')
      .uri(),
    userId: joi.string()
      .description('The user to be prepopulated in the credentials form'),
    promptBehavior: joi.string()
      .description('Controls whether credentials UI will be shown')
      .default('auto')
      .only(['auto', 'always', 'refresh', 'force'])
  }
)

const callbackSchema = joi.func()
  .label('callback')
  .required()

function getToken (options, callback) {
  joi.assert(options, getTokenOptionsSchema)
  joi.assert(callback, callbackSchema)

  return adal.getToken(options, callback)
}

module.exports = {
  getToken: getToken
}
