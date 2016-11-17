const {expect} = require('chai')
const {getToken} = require('..')

describe('adal-bridge', function () {
  describe('#getToken', function () {
    it('validates required options', function () {
      expect(() => { getToken() }).to.throw('"options" is required')
    })

    it('validates required callback', function () {
      const options = {
        resource: 'foo',
        clientId: 'bar'
      }
      expect(() => { getToken(options) }).to.throw('"callback" is required')
    })

    describe('authority', function () {
      it('validates string', function () {
        const options = {
          authority: 42,
          resource: 'foo',
          clientId: 'bar'
        }
        expect(() => { getToken(options) }).to.throw('"authority" must be a string')
      })

      it('validates format', function () {
        const options = {
          authority: 'xxx',
          resource: 'foo',
          clientId: 'bar'
        }
        expect(() => { getToken(options) }).to.throw('"authority" must be a valid uri')
      })
    })

    describe('resource', function () {
      it('validates presence', function () {
        const options = {
          clientId: 'foo'
        }
        expect(() => { getToken(options) }).to.throw('"resource" is required')
      })

      it('validates string', function () {
        const options = {
          resource: 42,
          clientId: 'foo'
        }
        expect(() => { getToken(options) }).to.throw('"resource" must be a string')
      })
    })

    describe('clientId', function () {
      it('validates presence', function () {
        const options = {
          resource: 'foo'
        }
        expect(() => { getToken(options) }).to.throw('"clientId" is required')
      })

      it('validates string', function () {
        const options = {
          resource: 'foo',
          clientId: 42
        }
        expect(() => { getToken(options) }).to.throw('"clientId" must be a string')
      })
    })

    describe('redirectUri', function () {
      it('validates string', function () {
        const options = {
          resource: 'foo',
          clientId: 'bar',
          redirectUri: 42
        }
        expect(() => { getToken(options) }).to.throw('"redirectUri" must be a string')
      })

      it('validates format', function () {
        const options = {
          resource: 'foo',
          clientId: 'bar',
          redirectUri: 'xxx'
        }
        expect(() => { getToken(options) }).to.throw('"redirectUri" must be a valid uri')
      })
    })

    describe('userId', function () {
      it('validates string', function () {
        const options = {
          resource: 'foo',
          clientId: 'bar',
          userId: 42
        }
        expect(() => { getToken(options) }).to.throw('"userId" must be a string')
      })
    })

    describe('promptBehavior', function () {
      it('validates string', function () {
        const options = {
          resource: 'foo',
          clientId: 'bar',
          promptBehavior: 42
        }
        expect(() => { getToken(options) }).to.throw('"promptBehavior" must be a string')
      })

      it('validates value', function () {
        const options = {
          resource: 'foo',
          clientId: 'bar',
          promptBehavior: 'xxx'
        }
        expect(() => { getToken(options) }).to.throw('"promptBehavior" must be one of [auto, always, refresh, force]')
      })
    })
  })
})
