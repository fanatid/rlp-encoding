import { int2hex } from './util'

export function encode (value, offset) {
  if (value <= 55) return Buffer.from([ offset + value ])

  const hexValue = int2hex(value)
  const firstByte = int2hex(offset + 55 + hexValue.length / 2)
  return Buffer.from(firstByte + hexValue, 'hex')
}

export function decode (buffer, offset, length) {
  if (buffer[offset] === 0) throw new Error('Extra zeros')

  const value = parseInt(buffer.slice(offset, offset + length).toString('hex'), 16)
  if (isNaN(value) || !isFinite(value)) throw new Error('Invalid length')

  return value
}

export function encodingLength (value) {
  let length = 1
  if (value > 55) length += int2hex(value).length / 2
  return length
}
