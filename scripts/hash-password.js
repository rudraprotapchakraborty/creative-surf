const bcrypt = require('bcryptjs')

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/hash-password.js YOUR_PASSWORD')
  process.exit(1)
}

bcrypt.hash(password, 10).then(hash => {
  console.log('\nBcrypt hash:')
  console.log(hash)
  console.log('\nInsert into MongoDB users collection:')
  console.log(JSON.stringify({ username: 'admin', password: hash }, null, 2))
})

//node scripts/hash-password.js yourpassword
