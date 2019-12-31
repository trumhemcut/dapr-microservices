const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
require("isomorphic-fetch");

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.post("/sample-topic", async (req, res) => {
  const fileName = req.body.fileName;
  const filePath = path.resolve("./uploads", fileName);
  const resizedFilePath = path.resolve("./uploads", `resized_${fileName}`);
  const buffer = fs.readFileSync(filePath);
  if (fileName) {
    console.log(`Resizing the image ${filePath} ...`);
    await sharp(buffer)
      .resize(undefined, 100)
      .toFile(resizedFilePath);

    res.status(200).send();
  } else {
    res.status(500).send();
  }
});

app.listen(port, () => console.log(`Node App listening on port ${port}!`));
