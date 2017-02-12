import {Router} from 'express'
const rewardsRouter = Router({mergeParams: true})
import {find, findOne, createMany, update, replaceMany, destroy, loadReward} from './actions'

rewardsRouter.post('/', createMany)
rewardsRouter.get('/', find)
rewardsRouter.put('/', replaceMany)
rewardsRouter.param('rewardid', loadReward)
rewardsRouter.get('/:rewardid', findOne)
rewardsRouter.delete('/:rewardid', destroy)
rewardsRouter.put('/:rewardid', update)

export {rewardsRouter}
