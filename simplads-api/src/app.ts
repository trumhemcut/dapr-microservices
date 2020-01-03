import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { OrderRoute } from "./routes/order";
import { UserRoute } from "./routes/user";
import { AdvertisementRoute } from "./routes/advertisement";

class App {
  public expressApp: express.Application;
  public userRoutes: UserRoute = new UserRoute();
  public orderRoutes: OrderRoute = new OrderRoute();
  public adRoutes: AdvertisementRoute = new AdvertisementRoute();
  public mongoUrl: string = `mongodb://${process.env.MONGODB ||
    "localhost"}/adsdb`;

  constructor() {
    this.expressApp = express();
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(cors());
    this.expressApp.use("/uploads", express.static("uploads"));
    this.userRoutes.routes(this.expressApp);
    this.orderRoutes.routes(this.expressApp);
    this.adRoutes.routes(this.expressApp);
  }

  public async mongoSetup() {
    try {
      console.info(`Connecting to MongoDB server at ${this.mongoUrl} ...`);
      await mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    } catch (error) {
      console.error(
        `Failed to connect to MongoDB server at ${this.mongoUrl} - retry in 5 seconds.`,
        error
      );
      console.log("");
      setTimeout(() => {
        this.mongoSetup();
      }, 5000);
    }
  }
}

export default new App();
