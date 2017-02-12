import {Member} from '../../models/member'
import {loadParam} from '../utils'

export const find = (req, res) => {
  Member.find({})
    .then(members => {
        res.send(members)
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
  const member = req.member
  res.send(member)
}
export const create = (req, res) => {
  const member = new Member(req.body)
  member.save()
    .then(member => {
      res.send(member.toObject())
    }, err => {
      res.status(400).send(err)
    }).catch(err => {
      console.error(err.message)
      res.status(500).send()
    })
}
export const update = (req, res) => {
  Member.findOneAndUpdate({ _id: req.member._id }
    , { $set: req.body }
    , { new: true }
    )
    .then(member => {
      res.send(member)
    }, err => {
      res.status(400).send(err)
    })
    .catch(err => {
      console.error(err.message)
      res.status(500).send()
    })
}
export const destroy = (req, res) => {
  Member.findOneAndRemove({ _id: req.member._id })
    .then(member => {
      res.send(member)
    }, err => {
      res.status(400).send(err)
    }).catch(err => {
      console.error(err.message)
      res.status(500).send()
    })
}
export const populate = (req, res) => {

}
export const add = (req, res) => {

}
export const remove = (req, res) => {

}

export const loadMember = loadParam(Member, 'member')