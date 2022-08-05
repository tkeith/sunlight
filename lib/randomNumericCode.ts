import crypto from 'crypto'

export default function randomNumericCode(length = 6) {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
}
