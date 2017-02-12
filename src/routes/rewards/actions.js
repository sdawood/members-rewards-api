import {Reward} from '../../models/reward'
import {loadParam} from '../utils'

export const find = (req, res) => {
  Reward.find({})
    .then(rewards => {
      res.send(rewards)
    }, err => {
      console.error(err)
      res.status(400).send(err)
    })
    .catch(err => {
      console.error(err.message)
      res.status(500).send()
    })
}
export const findOne = (req, res) => {
  const reward = req.reward
  res.send(reward)
}
export const create = (req, res) => {
  const reward = new Reward(req.body)
  reward.save()
    .then(reward => {
      res.send(reward.toObject())
    }, err => {
      res.status(400).send(err)
    }).catch(err => {
    console.error(err.message)
    res.status(500).send()
  })
}
export const update = (req, res) => {
  Reward.findOneAndUpdate({ _id: req.reward.id }
    , { $set: req.body }
    , { new: true }
  )
    .then(reward => {
      res.send(reward)
    }, err => {
      res.status(400).send(err)
    })
    .catch(err => {
      console.error(err.message)
      res.status(500).send()
    })
}
export const destroy = (req, res) => {
  Reward.findOneAndRemove({ _id: req.reward.id })
    .then(reward => {
      res.send(reward)
    }, err => {
      res.status(400).send(err)
    }).catch(err => {
    console.error(err.message)
    res.status(500).send()
  })
}

export const loadReward = loadParam(Reward, 'reward')