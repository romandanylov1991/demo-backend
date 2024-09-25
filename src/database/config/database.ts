const database = {
  development: { dialect: 'sqlite', storage: ':memory:', logging: false },
  test: { dialect: 'sqlite', storage: ':memory:', logging: false },
  production: { dialect: 'sqlite', storage: ':memory:', logging: false }
}

export default database

module.exports = database
