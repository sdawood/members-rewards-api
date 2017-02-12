const env = process.env.NODE_ENV || 'development'

if(env === 'development' || env === 'test') {
  const config = require('./config.json')
  const envConfig = config[env]
  Object.assign(process.env, envConfig)
}

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal error')
}