import request from 'supertest'
import {expect} from 'chai'

import {app} from './server'

import {Member} from './models/member'
import {Reward} from './models/reward'

import {MEMBERS, seedMembers, REWARDS, seedRewards} from './db/seed'

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
})

describe('GET /members/:memberid/rewards', () => {
  it('should get rewards for member by id', (done) => {
    const memberid = MEMBERS[1]._id.toHexString()
    request(app)
      .get(`/members/${memberid}/rewards`)
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(2)
        expect(res.body.map(r => r.id)).to.eql(REWARDS.filter(r => r._member.toHexString() === memberid).map(r => r._id.toHexString()))
      })
      .end(done)
  })
})


describe('PUT /members/:memberid/rewards', () => {
  it('should `REPLACE` rewards for member with the passed list of new rewards', (done) => {
    const memberid = MEMBERS[1]._id.toHexString()
    const newRewards = [
      {name: 'put_member_memberid_rewards_1'},
      {name: 'put_member_memberid_rewards_1'},
      ]

    request(app)
      .put(`/members/${memberid}/rewards`)
      .send(newRewards)
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(2)
        expect(res.body.map(r => r.name)).to.eql(newRewards.map(r => r.name))
      })
      .end((err, res) => {
        if (err) return done(err)
        Reward.find({_member: memberid})
          .then(docs => {
            expect(docs.length).to.eql(2)
            expect(docs.map(r => r.name)).to.eql(newRewards.map(r => r.name))
            done()
          }).catch(done)
      })
  })
})
