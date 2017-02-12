import {Router} from 'express'
const rewardsRouter = Router()
import {find, findOne, create, update, destroy, populate, add, remove, loadReward} from './actions'

rewardsRouter.post('/', create)
rewardsRouter.get('/', find)
rewardsRouter.param('rewardid', loadReward)
rewardsRouter.get('/:rewardid', findOne)
rewardsRouter.delete('/:rewardid', destroy)
rewardsRouter.put('/:rewardid', update)

export {rewardsRouter}
