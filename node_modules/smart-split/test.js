/* eslint-env mocha */
var expect = require('chai').expect
var split = require('./.')

describe('smart-split', function () {
  it('splits a string properly with a string', function () {
    expect(split(' ', ' ')).to.eql(['', ' ', ''])
    expect(split('  ', ' ')).to.eql(['', ' ', '', ' ', ''])
    expect(split('test', ' ')).to.eql(['test'])
    expect(split('test ', ' ')).to.eql(['test', ' ', ''])
    expect(split('test test', ' ')).to.eql(['test', ' ', 'test'])
    expect(split('test test ', ' ')).to.eql(['test', ' ', 'test', ' ', ''])
    expect(split('test  test', ' ')).to.eql(['test', ' ', '', ' ', 'test'])
    expect(split('test test test', ' ')).to.eql(['test', ' ', 'test', ' ', 'test'])
  })

  it('splits a string properly with a regex', function () {
    expect(split(' ', / /)).to.eql(['', ' ', ''])
    expect(split('  ', / /)).to.eql(['', ' ', '', ' ', ''])
    expect(split('test', / /)).to.eql(['test'])
    expect(split('test ', / /)).to.eql(['test', ' ', ''])
    expect(split('test test', / /)).to.eql(['test', ' ', 'test'])
    expect(split('test test ', / /)).to.eql(['test', ' ', 'test', ' ', ''])
    expect(split('test  test', / /)).to.eql(['test', ' ', '', ' ', 'test'])
    expect(split('test test test', / /)).to.eql(['test', ' ', 'test', ' ', 'test'])
  })

  it('splits a string properly with a regex with capturing groups', function () {
    expect(split('a ', /((a)( ))/)).to.eql(['', 'a ', ''])
    expect(split('a a ', /((a)( ))/)).to.eql(['', 'a ', '', 'a ', ''])
    expect(split('test', /((a)( ))/)).to.eql(['test'])
    expect(split('testa ', /((a)( ))/)).to.eql(['test', 'a ', ''])
    expect(split('testa test', /((a)( ))/)).to.eql(['test', 'a ', 'test'])
    expect(split('testa testa ', /((a)( ))/)).to.eql(['test', 'a ', 'test', 'a ', ''])
    expect(split('testa a test', /((a)( ))/)).to.eql(['test', 'a ', '', 'a ', 'test'])
    expect(split('testa testa test', /((a)( ))/)).to.eql(['test', 'a ', 'test', 'a ', 'test'])
  })

  it('splits a string properly with a regex with overlap', function () {
    expect(split('xx', /xx/)).to.eql(['', 'xx', ''])
    expect(split('xxx', /xx/)).to.eql(['', 'xx', 'x'])
    expect(split('xxxx', /xx/)).to.eql(['', 'xx', '', 'xx', ''])
    expect(split('testxxxtest', /xx/)).to.eql(['test', 'xx', 'xtest'])
    expect(split('testxxxxtest', /xx/)).to.eql(['test', 'xx', '', 'xx', 'test'])
  })

  it('splits a string properly if a capturing group specifier is provided', function () {
    expect(split('testxxtest', /test(x)/, 1)).to.eql(['', 'testx', 'xtest'])
  })

  it('throws for zero-width captures', function () {
    expect(function () {
      split('xx', /\b/)
    }).to.throw(Error)

    expect(function () {
      split('xx', /$/)
    }).to.throw(Error)

    expect(function () {
      split('xx', /^/)
    }).to.throw(Error)
  })
})
