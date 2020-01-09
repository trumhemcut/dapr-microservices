import { NextFunction, Request, Response } from "express";
import * as kafka from "kafka-node";

export let heathcheck = (req: Request, res: Response, next: NextFunction) => {
  var client = new kafka.KafkaClient({ kafkaHost: "simplads-kafka:9092" });
  client.on("ready", () => {
    return res.status(200).send("OK");
  });
  client.on("error", error => {
    console.log(error);
    return res.status(500).send();
  });
};
