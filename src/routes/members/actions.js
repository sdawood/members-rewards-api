import {Member} from '../../models/member'

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
  Member.findOneAndUpdate({ _id: req.member.id }
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
  Member.findOneAndRemove({ _id: req.member.id })
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

export const _loadParam = (model, modelName) => (req, res, next, id, paramName) => {
  model.findOne({_id: id})
    .then(record => {
      if(!record) {
        return res.status(404).send()
      }
      req[modelName] = record
      next()
    }, err => {
      console.error(err.message)
      res.status(404).send()
    }).catch(err => {
      console.error(err.message)
      res.status(500).send()
    })
}

export const loadMember = _loadParam(Member, 'member')