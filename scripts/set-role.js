/**
 * Promotes or demotes an account. Self-registered users are always created as
 * `user`; admin is only ever granted here, never through the signup form.
 *
 * Usage: node scripts/set-role.js someone@example.com admin
 *        node scripts/set-role.js someone@example.com user
 */
const fs = require('fs')
const path = require('path')
const { MongoClient } = require('mongodb')

// Load MONGODB_URI the same way Next does in development.
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2]
  }
}

const [identifier, role] = process.argv.slice(2)

if (!identifier || !['admin', 'user'].includes(role)) {
  console.error('Usage: node scripts/set-role.js <email-or-username> <admin|user>')
  process.exit(1)
}

;(async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set.')
    process.exit(1)
  }

  const client = await new MongoClient(process.env.MONGODB_URI).connect()
  try {
    const users = client.db().collection('users')
    const value = identifier.trim().toLowerCase()
    const query = value.includes('@') ? { email: value } : { username: value }

    const result = await users.updateOne(query, { $set: { role, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      console.error(`No account found for "${identifier}".`)
      process.exit(1)
    }
    console.log(`"${identifier}" is now a ${role}.`)
  } finally {
    await client.close()
  }
})().catch(err => {
  console.error(err.message)
  process.exit(1)
})
