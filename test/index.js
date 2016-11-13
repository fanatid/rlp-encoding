const test = require('tape')
const RLP = require('../')
const fixtures = require('./fixtures.json')

function toBuffers (value) {
  if (Array.isArray(value)) return value.map(toBuffers)
  if (typeof value === 'string') return Buffer.from(value, 'hex')
  return value
}

test('encode', (t) => {
  for (let fixture of fixtures.valid.concat(...fixtures.encode)) {
    t.test(fixture.description, (t) => {
      let data = fixture.data
      if (fixture.toBuffers !== false) data = toBuffers(data)

      const encoded = RLP.encode(data)
      t.same(encoded.toString('hex'), fixture.encoded)
      t.same(RLP.encode.bytes, fixture.length)
      t.end()
    })
  }

  t.end()
})

test('decode', (t) => {
  for (let fixture of fixtures.valid) {
    t.test(fixture.description, (t) => {
      const data = RLP.decode(Buffer.from(fixture.encoded, 'hex'))
      t.same(data, toBuffers(fixture.data))
      t.same(RLP.decode.bytes, fixture.length)
      t.end()
    })
  }

  for (let fixture of fixtures.invalid.decode) {
    t.test(fixture.description, (t) => {
      t.throws(() => {
        RLP.decode(Buffer.from(fixture.data, 'hex'))
      }, new RegExp(fixture.regexp))
      t.end()
    })
  }

  t.end()
})

test('encodingLength', (t) => {
  for (let fixture of fixtures.valid) {
    t.test(fixture.description, (t) => {
      const length = RLP.encodingLength(toBuffers(fixture.data))
      t.same(length, fixture.length)
      t.end()
    })
  }

  t.end()
})
