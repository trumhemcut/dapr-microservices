'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../../src/app'
import { User } from '../../src/model/user'
import { UserModel } from '../../src/schemas/user'

chai.use(chaiHttp)

const expect = chai.expect

const user: User = {
    email: 'trumhemcut@hotmail.com',
    firstName: 'Phi',
    id: Math.floor(Math.random() * 100) + 1,
    lastName: 'Huynh',
    password: 'password',
    phone: '555555',
    userStatus: true,
    username: 'trumhemcut'
}

describe('userRoutes', () => {
    let token
    before(async () => {
        expect(UserModel.modelName).to.be.equal('User')
        UserModel.collection.drop()
    })
    it('should be able to login', () => {
        return chai
            .request(app)
            .get(`/users/login?username=${user.username}&password=${user.password}`)
            .then(res => {
                expect(res.status).to.be.equal(200)
                token = res.body.token
            })
    })
    // it('should respond with HTTP 404 status because there is no user', async () => {
    //     return chai
    //         .request(app)
    //         .get(`/users/${user.username}`)
    //         .then(res => {
    //             expect(res.status).to.be.equal(404)
    //         })
    // })

    it('should create user and retrieve it back', async () => {
        return chai
            .request(app)
            .post(`/users`)
            .send(user)
            .then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body.username).to.be.equal(user.username)
            })
    })

    it('should return the user created on the step before', async () => {
        return chai
            .request(app)
            .get(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.body.username).to.be.equal(user.username)
            })
    })

    it('should updated the user Linh', async () => {
        user.username = 'linhhoang'
        user.firstName = 'Linh'
        user.lastName = 'Hoang'

        return chai
            .request(app)
            .patch(`/users/trumhemcut`)
            .send(user)
            .then(res => {
                expect(res.status).to.be.equal(204)
            })
    })
    it('should return the user updated on the step before', async () => {
        return chai
            .request(app)
            .get(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.body.username).to.be.equal(user.username)
                expect(res.body.firstName).to.be.equal(user.firstName)
                expect(res.body.lastName).to.be.equal(user.lastName)
            })
    })
    it('should return 404 because the user does not exist', async () => {
        user.firstName = 'Phuong Le'

        return chai
            .request(app)
            .patch(`/users/phuongle`)
            .send(user)
            .then(res => {
                expect(res.status).to.be.equal(404)
            })
    })
    it('should remove an existent user', async () => {
        return chai
            .request(app)
            .del(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(204)
            })
    })
    it('should return 404 when it is trying to remove an user because the user does not exist', async () => {
        return chai
            .request(app)
            .del(`/users/trumhemcut`)
            .then(res => {
                expect(res.status).to.be.equal(404)
            })
    })
})