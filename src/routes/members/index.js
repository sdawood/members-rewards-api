import {Router} from 'express'
const membersRouter = Router()
import {find, findOne, create, update, destroy, populate, add, remove, loadMember} from './actions'
import {rewardsRouter} from './rewards'

membersRouter.post('/', create)
membersRouter.get('/', find)
membersRouter.param('memberid', loadMember)
membersRouter.get('/:memberid', findOne)
membersRouter.delete('/:memberid', destroy)
membersRouter.put('/:memberid', update)
membersRouter.use('/:memberid/rewards', rewardsRouter)

export {membersRouter}

