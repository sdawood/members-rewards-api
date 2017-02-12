import {mongoose, validator} from '../db/mongoose'

const MemberSchema = new mongoose.Schema ({
  ref: 	String,
  name: { type: String, required: true, minlength: 1, trim: true },
  email: { type: String, required: true, unique: true, trim: true,
    validate: {
      validator: v => validator.isEmail(v),
      message: '{VALUE} is not a valid email!'
  }},
  phone: String,
  points: Number,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, maxlength: 2}
  }
}, {
  timestamps: true, //automatic createdAt, updatedAt
  versionKey: false
})

MemberSchema.virtual('id')
  .get(function() {
    return this._id.toHexString()
  })

MemberSchema.set('toJSON', { virtuals: true })

MemberSchema.set('toObject', { virtuals: true })

export const Member = mongoose.model('Member', MemberSchema)