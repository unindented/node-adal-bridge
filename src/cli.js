var yargs = require('yargs')

var adal = require('./main')
var pkg = require('../package.json')

var options = yargs
  .version(pkg.version)
  .usage(pkg.description + '\n\nUsage: $0 --resource <resource> --client-id <id> --redirect-uri <uri>')
  .option('authority', {
    describe: 'The AAD or ADFS authority',
    default: 'https://login.windows.net/common',
    demand: true
  })
  .option('resource', {
    describe: 'The resource whose token is needed',
    demand: true
  })
  .option('client-id', {
    describe: 'The client identifier',
    demand: true
  })
  .option('redirect-uri', {
    describe: 'The redirect URI according to OAuth2 protocol',
    default: 'urn:ietf:wg:oauth:2.0:oob',
    demand: true
  })
  .option('user-id', {
    describe: 'The user to be prepopulated in the credentials form'
  })
  .option('prompt-behavior', {
    describe: 'Controls whether credentials UI will be shown'
  })
  .option('config', {
    describe: 'JSON file with your configuration',
    config: true
  })
  .example('$0 --resource https://officeapps.live.com --client-id d3590ed6-52b3-4102-aeff-aad2292ab01c')
  .example('$0 --config config.json')
  .wrap(null)
  .argv

// Delete unnecessary keys.
delete options['_']
delete options['$0']
delete options['version']
delete options['client-id']
delete options['redirect-uri']
delete options['user-id']
delete options['prompt-behavior']
delete options['config']

// Invoke native method.
console.log(adal.getToken(options, function (err, token) {
  if (err) {
    console.error(err, err.stack)
    process.exit(1)
  }

  console.log(token)
}))
