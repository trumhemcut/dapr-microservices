const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
require("isomorphic-fetch");
const axios = require("axios").default;

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.post("/ads-topic", async (req, res) => {
  console.log("RESIZE_IMAGE: Receiving new data:");
  console.log(req.body);

  if (req.body.messageType !== "ADS_CREATED") return res.status(200).send();

  const fileName = req.body.fileName;
  const filePath = path.resolve("./uploads", fileName);
  const resizedFilePath = path.resolve("./uploads", `resized_${fileName}`);
  const buffer = fs.readFileSync(filePath);
  if (fileName) {
    console.log(`Resizing the image ${filePath} ...`);
    await sharp(buffer)
      .resize(undefined, 100)
      .toFile(resizedFilePath);

    await axios.default.post("http://localhost:3500/v1.0/bindings/ads-topic", {
      data: {
        messageType: "IMAGE_RESIZED",
        resizedFileName: resizedFilePath
      }
    });
    
    console.log("Finish");
    
    res.status(200).send();
  } else {
    res.status(500).send();
  }
});

app.listen(port, () => console.log(`Node App listening on port ${port}!`));
