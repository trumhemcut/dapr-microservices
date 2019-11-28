'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import * as moongoose from 'mongoose'
import app from '../../src/app'
import Order from '../../src/model/order'
import { OrderStatus } from '../../src/model/orderStatus'
import { OrderModel } from '../../src/schemas/order'


chai.use(chaiHttp)

const expect = chai.expect

const order: Order = {
    complete: false,
    id: 1,
    quantity: 1,
    shipDate: new Date(),
    status: OrderStatus.Placed,
    userId: 20,
}

describe('orderRoutes', () => {
    before(async()=>{
        expect(OrderModel.modelName).to.be.equal('Order')
        OrderModel.collection.drop()
    })

    it('should respond with HTTP 404 status because there is no order', async () => {
        return chai
            .request(app)
            .get(`/store/orders/000000000000`)
            .then(res => {
                expect(res.status).to.be.equal(404)
            })
    })

    it('should create new user for Order tests and retrieve it back', async () =>{
        const user = {
            email: 'order@myemail.com',
            firstName: 'Order',
            lastName: 'User',
            password: 'password',
            phone: '5555555',
            userStatus: 1,
            username: 'OrderUser',
        }

        return chai
            .request(app)
            .post('/users')
            .send(user)
            .then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body.username).to.be.equal(user.username)
                order.userId = res.body._id
            })
    })

    it('should create a new order and retrieve it back', async () => {
        return chai
            .request(app)
            .post(`/store/orders`)
            .send(order)
            .then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body.userId).to.be.equal(order.userId)
                order.id = res.body._id
            })
    })

    it('should return the order created on the step before', async () => {
        return chai
            .request(app)
            .get(`/store/orders/${order.id}`)
            .then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.body._id).to.be.equal(order.id)
            })
    })

    it('should remove an existing order', async () => {
        return chai
            .request(app)
            .del(`/store/orders/${order.id}`)
            .then(res => {
                expect(res.status).to.be.equal(204)
            })
    })

    it(`should return 404 when it's trying to remove non existent product`, async () => {
        return chai
            .request(app)
            .get(`/store/orders/${order.id}`)
            .then(res => {
                expect(res.status).to.be.equal(404)
            })
    })
})