import request from 'supertest'
import {expect} from 'chai'

import {app} from './server'

// describe('GET /', () => {
//   it('should say hello in json format', (done) => {
//     request(app)
//       .post('/')
//       .send({name: 'world'})
//       .expect(res => {
//         expect(res.body.hello).to.equal('world')
//       })
//       .end((err, res) => {
//         done(err)
//       })
//   })
// })