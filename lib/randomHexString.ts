import crypto from 'crypto'

export default function randomHexString(length = 16) {
  return crypto.randomBytes(length).toString('hex')
}
