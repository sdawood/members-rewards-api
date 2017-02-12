export const loadParam = (model, modelName) => (req, res, next, id, paramName) => {
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
