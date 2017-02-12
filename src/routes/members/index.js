import {Router} from 'express'
const membersRouter = Router()
import {find, findOne, create, update, destroy, populate, add, remove, loadMember} from './actions'

membersRouter.post('/', create)
membersRouter.get('/', find)
membersRouter.param('memberid', loadMember)
membersRouter.get('/:memberid', findOne)
membersRouter.delete('/:memberid', destroy)
membersRouter.put('/:memberid', update)

export {membersRouter}

