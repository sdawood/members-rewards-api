import mongoose from 'mongoose'
import validator from 'validator'

mongoose.promise = global.Promise //use the built in Promises instead of 3rd party libraries
mongoose.connect(process.env.MONGODB_URI)

export {mongoose, validator}