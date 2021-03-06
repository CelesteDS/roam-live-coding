const db = require('../db/db')
const { encryptPassword } = require('../utilities/password')

/**
 * Add a user to the database
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @param {string} primary_city 
 * @returns {promise} - Promise that resolves to an object 
 * representing the row added to the users table.
 */
const addUser = function(name, email, password, primary_city) {
  return encryptPassword(password).then(hashedPassword => {
    const query = `
    INSERT INTO users
      (name, email, password, primary_city)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *` 
    return db.one(query, [name, email, hashedPassword, primary_city])
  })
}

module.exports = addUser