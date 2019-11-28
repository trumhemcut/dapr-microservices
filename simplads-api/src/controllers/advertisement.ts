import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { AdvertisementModel } from '../schemas/advertisement';

export let getAdvertisement = (req: Request, res: Response, next: NextFunction) => {
    const title = req.params.title

    AdvertisementModel.findOne({ title: title }, (err, ad) => {
        if (!title) {
            return res.status(404).send()
        }
        ad = ad.toJSON()
        ad._id = ad._id.toString()
        return res.status(200).send(ad)
    })
}

export let getAllAdvertisements = async (req: Request, res: Response, next: NextFunction) => {
    const ads = await AdvertisementModel.find({})
    if (!ads) {
        return res.status(404).send()
    }

    return res.status(200).send(ads)
}

export let addAdvertisement = async (req: Request, res: Response, next: NextFunction) => {
    const newAd = new AdvertisementModel(req.body)
    const returnedAd = await newAd.save()

    return res
        .status(201)
        .send(returnedAd);
}

export let updatead = async (req: Request, res: Response, next: NextFunction) => {
    const adId = req.params.id

    const ad = await AdvertisementModel.findOne({ id: adId })
    if (!ad) {
        return res.status(404).send()
    }

    ad.title = req.body.title
    ad.category = req.body.category
    ad.price = req.body.price
    ad.image = req.body.image
    ad.status = req.body.status
    ad.postedBy = req.body.postedBy
    ad.postedDate = req.body.postedDate
    await ad.save()

    return res
        .status(204)
        .send(ad)
}

export let removead = async (req: Request, res: Response, next: NextFunction) => {
    const adId = req.params.id
    const ad = await AdvertisementModel.findOne({ id: adId })
    if (!ad) {
        return res.status(404).send()
    }

    await ad.remove()

    return res
        .status(204)
        .send()
}