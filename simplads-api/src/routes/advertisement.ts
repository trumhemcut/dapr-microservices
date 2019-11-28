import * as adController from '../controllers/advertisement'

export class AdvertisementRoute {
    public routes(app): void {
        app.route('/advertisements').get(adController.getAllAdvertisements)
        app.route('/advertisements').post(adController.addAdvertisement)
        app.route('/advertisements/:id').get(adController.getAdvertisement)
        app.route('/advertisements/:id').delete(adController.removead)
    }
}