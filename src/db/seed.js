import {ObjectID} from 'mongodb'
import {Member} from '../models/member'
import {Reward} from '../models/reward'

const memberIds = [new ObjectID(), new ObjectID()]

export const MEMBERS =
  [
    {
      _id: memberIds[0],
      "ref": "5G6H7J88",
      "name": "Tony T",
      "email": "tony@mail.com",
      "phone": "0123456789",
      "points": "750",
      "address": {
        "line1": "616 St Kilda Road",
        "line2": "Level 8",
        "city": "Melbourne",
        "state": "VIC",
        "postalCode": "3004",
        "country": "AU"
      },
      "OrganisationMember": {
        "name": "Tony T",
        "email": "tony_t@live.com",
        "phone": "0123456789",
        "address": {
          "line1": "616 St Kilda Road",
          "line2": "Level 8",
          "city": "Melbourne",
          "state": "VIC",
          "postalCode": "3004",
          "country": "AU"
        }
      },
    },
    {
      _id: memberIds[1],
      "ref": "5G6H7J77",
      "name": "John Smith",
      "email": "smith@mail.com",
      "phone": "0987654321",
      "points": "500",
      "address": {
        "line1": "Long Road",
        "line2": "",
        "city": "Sydney",
        "state": "NSW",
        "postalCode": "2000",
        "country": "AU"
      },
      "OrganisationMember": {
        "name": "John Smith",
        "email": "john@smith.com",
        "phone": "0987654321",
        "address": {
          "line1": "Long Road",
          "line2": "",
          "city": "Sydney",
          "state": "NSW",
          "postalCode": "2000",
          "country": "AU"
        }
      },
    }
  ]


export const REWARDS =
  [
    {
      _id: new ObjectID(),
      _member: memberIds[0],
      "ref":"123",
      "name":"Buy one coffee, get one free!",
      "description":"Any suitable description if any",
      "surcountType":"percentage",
      "surcountAmount":"-100",
      "eligibleTags": ["coffee"],
      "minQty": 2,
    },
    {
      _id: new ObjectID(),
      _member: memberIds[1],
      "name":"$10 off your next shirt",
      "surcountType":"absolute",
      "surcountAmount":"-1000",
      "eligibleTags":["shirts"],
    },
    {
      _id: new ObjectID(),
      _member: memberIds[1],
      "name":"$5 off any meal (when you spend $20+)",
      "surcountType":"absolute",
      "surcountAmount":"-500",
      "minOrderValue":"2000",
    }
  ]

export const seedMembers = (done) => {
  Member.remove({})
    .then(() => {
      /*Note: insertMany does not trigget any pre('save') hooks*/
      return Member.insertMany(MEMBERS)
    })
    .then(members => done())
}

export const seedRewards = (done) => {
  Reward.remove({})
    .then(() => {
      return Reward.insertMany(REWARDS)
    })
    .then(() => done())
}

