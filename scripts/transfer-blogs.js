/**
 * Hands every post in the `blogs` collection to one account, so that account
 * can edit and delete them from the feed (ownership is `authorId`, the
 * account's Mongo id — see canManageBlog).
 *
 * Dry run by default: it prints what would change and writes nothing. Pass
 * --apply to make the change. The byline (`author`) is left alone unless
 * --rename is also passed, which sets it to the account's name.
 *
 * Usage: node scripts/transfer-blogs.js someone@example.com
 *        node scripts/transfer-blogs.js someone@example.com --apply
 *        node scripts/transfer-blogs.js someone@example.com --apply --rename
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

const args = process.argv.slice(2)
const email = args.find(a => !a.startsWith('--'))
const apply = args.includes('--apply')
const rename = args.includes('--rename')

if (!email) {
  console.error('Usage: node scripts/transfer-blogs.js <email> [--apply] [--rename]')
  process.exit(1)
}

;(async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set.')
    process.exit(1)
  }

  const client = await new MongoClient(process.env.MONGODB_URI).connect()
  try {
    const db = client.db()
    const user = await db.collection('users').findOne({ email: email.trim().toLowerCase() })
    if (!user) {
      console.error(`No account with email ${email}.`)
      process.exit(1)
    }
    const owner = user._id.toString()
    console.log(`Account: ${user.name || '(no name)'} <${user.email}> id=${owner} role=${user.role || 'user'}`)

    const blogs = db.collection('blogs')
    const posts = await blogs.find({}, { projection: { title: 1, author: 1, authorId: 1 } }).toArray()
    const toMove = posts.filter(p => p.authorId !== owner || (rename && p.author !== user.name))

    console.log(`\n${posts.length} posts, ${toMove.length} would change:\n`)
    for (const p of posts) {
      const mark = toMove.includes(p) ? '→' : '='
      console.log(`  ${mark} ${p.title}\n      author="${p.author ?? ''}" authorId=${p.authorId ?? '(none)'}`)
    }

    if (!apply) {
      console.log('\nDry run — nothing written. Re-run with --apply to transfer.')
      return
    }

    // updatedAt is left alone: this is a bookkeeping change, not an edit,
    // and the posts should keep their dates and order.
    const set = { authorId: owner }
    if (rename && user.name) set.author = user.name
    const result = await blogs.updateMany({ _id: { $in: toMove.map(p => p._id) } }, { $set: set })
    console.log(`\nUpdated ${result.modifiedCount} of ${toMove.length} posts.`)
  } finally {
    await client.close()
  }
})().catch(err => {
  console.error(err)
  process.exit(1)
})
