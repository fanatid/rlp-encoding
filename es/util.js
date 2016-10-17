const EMPTY_BUFFER = Buffer.alloc(0)

export function toBuffer (v) {
  if (Buffer.isBuffer(v)) return v
  if (v === null || v === undefined || v === 0) return EMPTY_BUFFER

  switch (typeof v) {
    case 'string':
      if (v.slice(0, 2) === '0x') return Buffer.from(v.slice(2), 'hex')
      return Buffer.from(v)

    case 'number':
      return Buffer.from(int2hex(v), 'hex')

    default:
      throw new Error('invalid type')
  }
}

export function int2hex (v) {
  let hex = v.toString(16)
  if (hex.length % 2 === 1) hex = '0' + hex
  return hex
}

export function bufferCopy (buffer, start, length) {
  return Buffer.from(buffer.slice(start, start + length))
}
