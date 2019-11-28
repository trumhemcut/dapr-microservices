import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../schemas/user';

export let getUser = (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username

    UserModel.findOne({ username: username }, (err, user) => {
        if (!user) {
            return res.status(404).send()
        }
        user = user.toJSON()
        user._id = user._id.toString()
        return res.status(200).send(user)
    })
}

export let getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find({})
    if (!users) {
        return res.status(404).send()
    }

    return res.status(200).send(users)
}

export let addUser = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = new UserModel(req.body)
    newUser.password = bcrypt.hashSync(newUser.password, 10)
    const returnedUser = await newUser.save()

    return res
        .status(201)
        .send(returnedUser);
}

export let updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username

    const user = await UserModel.findOne({ username: username })
    if (!user) {
        return res.status(404).send()
    }

    user.email = req.body.email
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.password = req.body.password
    user.phone = req.body.phone
    user.userStatus = req.body.userStatus
    user.username = req.body.username
    await user.save()

    return res
        .status(204)
        .send(user)
}

export let removeUser = async (req: Request, res: Response, next: NextFunction) => {
    const userName = req.params.username
    const user = await UserModel.findOne({ username: userName })
    if (!user) {
        return res.status(404).send()
    }

    await user.remove()

    return res
        .status(204)
        .send()
}