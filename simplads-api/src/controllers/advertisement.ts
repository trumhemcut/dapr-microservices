import { NextFunction, Request, Response } from "express";
import { AdvertisementModel } from "../schemas/advertisement";
import * as axios from "axios";

export let getAdvertisement = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title = req.params.title;

  AdvertisementModel.findOne({ title: title }, (err, ad) => {
    if (!title) {
      return res.status(404).send();
    }
    ad = ad.toJSON();
    ad._id = ad._id.toString();
    return res.status(200).send(ad);
  });
};

export let getAllAdvertisements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ads = await AdvertisementModel.find({});
  if (!ads) {
    return res.status(404).send();
  }

  return res.status(200).send(ads);
};

export let addAdvertisement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Creating new ads: ");
  const newAd = new AdvertisementModel(req.body);
  console.info(newAd);
  const returnedAd = await newAd.save();

  return res.status(201).send(returnedAd);
};

export let updatead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adId = req.params.id;

  const ad = await AdvertisementModel.findOne({ id: adId });
  if (!ad) {
    return res.status(404).send();
  }

  ad.title = req.body.title;
  ad.category = req.body.category;
  ad.price = req.body.price;
  ad.image = req.file.filename;
  ad.status = req.body.status;
  ad.postedBy = req.body.postedBy;
  ad.postedDate = req.body.postedDate;
  await ad.save();

  return res.status(204).send(ad);
};

export let removead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adId = req.params.id;
  const ad = await AdvertisementModel.findOne({ id: adId });
  if (!ad) {
    return res.status(404).send();
  }

  await ad.remove();

  return res.status(204).send();
};

export let uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Uploading image to server: ${req.file?.filename}`);
  console.log(`Updating item ${req.body.adId}`);
  const adId = req.body.adId;

  const ad = await AdvertisementModel.findById(adId);
  if (!ad) {
    return res.status(404).send();
  }

  ad.image = req.file.filename;
  await ad.save();

  axios.default.post("http://localhost:3500/v1.0/bindings/ads-topic", {
    data: {
      messageType: "ADS_CREATED",
      fileName: req.file.filename
    }
  });

  return res.status(200).send();
};

export let imageResized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("SIMPLADS_API: Receiving new data:");
  console.log(req.body);

  if (req.body.messageType !== "IMAGE_RESIZED") return res.status(200).send();

  console.log(`Updating the resized image state to MongoDB...`);
  const adId = req.body.adId;

  const ad = await AdvertisementModel.findById(adId);
  if (!ad) {
    return res.status(404).send();
  }

  ad.status = "RESIZED";
  await ad.save();

  return res.status(204).send(ad);
};
