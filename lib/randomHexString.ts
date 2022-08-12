import crypto from 'crypto'

export default function randomHexString(numBytes = 8) {
  return crypto.randomBytes(numBytes).toString('hex')
}
