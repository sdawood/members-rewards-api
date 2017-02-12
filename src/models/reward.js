import {mongoose, validator} from '../db/mongoose'

const RewardSchema = new mongoose.Schema ({
  ref: 	String,
  name: { type: String, required: true, minlength: 1, trim: true },
  description: String,
  eligibleItems: [String],
  eligibleTags: [String],
  minQty: Number,
  minOrderValue: String,
  surcountType: String,
  surcountAmount: String,
  _member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false
  }
}, {
  timestamps: true, //automatic createdAt, updatedAt
  versionKey: false
})

RewardSchema.virtual('id')
  .get(function() {
    return this._id.toHexString()
  })

RewardSchema.set('toJSON', { virtuals: true })

RewardSchema.set('toObject', { virtuals: true })

export const Reward = mongoose.model('Reward', RewardSchema)