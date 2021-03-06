import crypto from 'crypto'
import elliptic from 'elliptic'

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256')
  hash.update(
    inputs
      .map((input) => JSON.stringify(input))
      .sort()
      .join('')
  )
  return hash.digest('hex')
}

const ec = new elliptic.ec('secp256k1')

const verifySignature = ({ publicKey, data, signature }) => {
  const keyFromPublic = ec.keyFromPublic(publicKey, 'hex')
  return keyFromPublic.verify(cryptoHash(data), signature)
}

export { cryptoHash, ec, verifySignature }
