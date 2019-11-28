import { ObjectID } from 'bson';
import { NextFunction, Request, Response } from 'express'
import * as _ from 'lodash'
import { OrderModel, } from '../schemas/order'
import { UserModel } from '../schemas/user'

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id

    const order = await OrderModel.findOne(new ObjectID(orderId))
    if (!order) {
        return res.status(404).send()
    }
    return res.status(200).send(order)
}

export let createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findOne(new ObjectID(req.body.userId))
    if (!user) {
        return res.status(404).send()
    }

    const newOrder = new OrderModel(req.body)
    await newOrder.save()

    return res.status(201).send(newOrder)
}

export let removeOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id
    const order = await OrderModel.findOne(new ObjectID(orderId))

    if (!order) {
        return res.status(404).send()
    }

    await order.remove()
    return res.status(204).send()
}

export let getInventory = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await OrderModel.find({})
    const grouppedOrders = _.groupBy(orders, 'userId')

    return res
        .status(200)
        .send(grouppedOrders)
}