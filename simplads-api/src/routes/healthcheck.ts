import * as healthCheckController from "../controllers/healthcheck";

export class HealthCheckRoute {
  public routes(app): void {
    app.route("/healthcheck").get(healthCheckController.heathcheck);
  }
}
