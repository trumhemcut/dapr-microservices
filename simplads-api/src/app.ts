import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { OrderRoute } from "./routes/order";
import { UserRoute } from "./routes/user";
import { AdvertisementRoute } from "./routes/advertisement";

class App {
  public app: express.Application;
  public userRoutes: UserRoute = new UserRoute();
  public orderRoutes: OrderRoute = new OrderRoute();
  public adRoutes: AdvertisementRoute = new AdvertisementRoute();
  public mongoUrl: string = `mongodb://${process.env.MONGODB ||
    "localhost"}/adsdb`;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.userRoutes.routes(this.app);
    this.orderRoutes.routes(this.app);
    this.adRoutes.routes(this.app);
    console.info(`Connecting to mongo server at ${this.mongoUrl} ...`);
    this.mongoSetup();
  }

  private mongoSetup() {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }
}

export default new App().app;
