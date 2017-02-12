import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import {errorHandler} from './config/config'
import {membersRouter} from './routes/members'
import {rewardsRouter} from './routes/rewards'

const port = process.env.PORT

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use('/members', membersRouter)
app.use('/rewards', rewardsRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

//to enable supertest unit testing
module.exports = {
  app
}