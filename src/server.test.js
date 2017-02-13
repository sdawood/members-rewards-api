import request from 'supertest'
import {expect} from 'chai'

import {app} from './server'

import {Member} from './models/member'
import {Reward} from './models/reward'

import {MEMBERS, seedMembers, REWARDS, seedRewards} from './test/seed'

beforeEach(seedMembers)
beforeEach(seedRewards)

describe('GET /members', () => {
  it('should get all members', (done) => {
    request(app)
      .get('/members')
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(2)
      })
      .end(done)
  })
})

describe('GET /members/:memberid', () => {
  it('should get member by id', (done) => {
    const memberid = MEMBERS[0]._id.toHexString()
    request(app)
      .get(`/members/${memberid}`)
      .expect(200)
      .expect(res => {
        expect(res.body.email).to.equal(MEMBERS[0].email)
      })
      .end(done)
  })
})

describe('POST /members', () => {
  it('should create a new member', (done) => {
    const name = 'post/members/valid'
    const email = 'post_members_valid@example.com'

    request(app)
      .post('/members')
      .send({name, email})
      .expect(200)
      .expect(res => {
        expect(res.body.email).to.equal(email)
      })
      .end((err, res) => {
        if(err) return done(err)

        Member.find({email})
          .then(docs => {
            expect(docs.length).to.equal(1)
            expect(docs[0].name).to.equal(name)
            done()
          }).catch(done)
      })
  })
})

describe('DELETE /members/:memberid', () => {
  it('should delete member by id', (done) => {
    const memberid = MEMBERS[1]._id.toHexString()
    request(app)
      .delete(`/members/${memberid}`)
      .expect(200)
      .expect(res => {
        expect(res.body.id).to.equal(memberid)
      })
      .end((err, res) => {
        if(err) return done(err)

        Member.findById(memberid).then(member => {
          expect(member).to.not.exist
          done()
        }).catch(done)
      })
  })
})

describe('PUT /members/:memberid', () => {
  it('should update member by id', (done) => {
    const memberid = MEMBERS[1]._id.toHexString()
    const name = 'put_members_memberid_name'
    const email = 'put_members_memberid_email'
    request(app)
      .put(`/members/${memberid}`)
      .send({name, email})
      .expect(200)
      .expect(res => {
        expect(res.body.name).to.equal(name)
        expect(res.body.email).to.equal(email)
      })
      .end(done)
  })

  it('should NOT update member createdAt field', (done) => {
    const memberid = MEMBERS[1]._id.toHexString()
    Member.findById(memberid)
      .then(member => {
        const name = 'put_members_memberid_name'
        const email = 'put_members_memberid_email'
        const createdAt = new Date()
        const _createdAt = member.toJSON().createdAt
        request(app)
          .put(`/members/${memberid}`)
          .send({name, email, createdAt})
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.equal(name)
            expect(res.body.email).to.equal(email)
            expect(Date.parse(res.body.createdAt)).not.to.equal(Date.parse(createdAt))
          })
          .end(done)
      })

  })
})

