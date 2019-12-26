import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as sharp from "sharp";
import * as path from "path";
import * as fs from "fs";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("resizeImage trigger function processed a request.");
  const fileName = req.query.fileName || (req.body && req.body.fileName);
  const filePath = path.resolve("./uploads", fileName);
  const resizedFilePath = path.resolve("./uploads", `resized_${fileName}`);
  const buffer = fs.readFileSync(filePath);
  if (fileName) {
    console.log(`Resizing the image ${filePath} ...`);
    await sharp(buffer)
      .resize(undefined, 100)
      .toFile(resizedFilePath);

    context.res = { status: 200, body: "" };
  } else {
    context.res = {
      status: 500,
      body: `We can't find the file.`
    };
  }
};

export default httpTrigger;
