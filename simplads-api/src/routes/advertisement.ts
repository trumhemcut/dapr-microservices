import * as multer from "multer";
import * as adController from "../controllers/advertisement";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  }
});
const upload = multer({ storage: storage });

export class AdvertisementRoute {
  public routes(app): void {
    app.route("/advertisements").get(adController.getAllAdvertisements);
    app
      .route("/advertisements")
      .post(upload.single("file"), adController.addAdvertisement);
    app.route("/advertisements/:id").get(adController.getAdvertisement);
    app.route("/advertisements/:id").delete(adController.removead);
    app
      .route("/upload")
      .post(upload.single("file"), adController.uploadFile);
  }
}
