import {Reward} from '../../../models/reward'
import {loadParam} from '../../utils'

export const find = (req, res) => {
  Reward.find({ _member: req.member._id})
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

export const createMany = (req, res) => {
  let rewards = req.body
  rewards = rewards.map(reward => {
    reward._member = req.member._id
    return reward
  })
  Reward.insertMany(rewards)
    .then(result => {
      res.send(result)
    }, err => {
      res.status(400).send(err)
    }).catch(err => {
    console.error(err.message)
    res.status(500).send()
  })
}

export const update = (req, res) => {
  Reward.findOneAndUpdate({ _id: req.reward.id, _member: req.member._id }
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
  Reward.findOneAndRemove({ _id: req.reward.id, _member: req.member._id })
    .then(reward => {
      res.send(reward)
    }, err => {
      res.status(400).send(err)
    }).catch(err => {
    console.error(err.message)
    res.status(500).send()
  })
}

export const replaceMany = (req, res) => {
  Reward.remove({ _member: req.member._id })
    .then(rewards => {
      createMany(req, res)
    }, err => {
      res.status(400).send(err)
    }).catch(err => {
      console.error(err.message)
      res.status(500).send()
  })
}


export const loadReward = (req, res, next, id, paramName) => {
  Reward.findOne({_id: id, _member: req.member._id})
    .then(record => {
      if(!record) {
        return res.status(404).send()
      }
      req['reward'] = record
      next()
    }, err => {
      console.error(err.message)
      res.status(404).send()
    }).catch(err => {
    console.error(err.message)
    res.status(500).send()
  })
}