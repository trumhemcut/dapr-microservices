import axios from "axios";
import { Advertisement } from "../store/advertisement";

export class Ads {
  constructor() {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
  }
  async getAllAds() {
    let result = await axios.get("/advertisements");
    console.log("data" + result.data);
    return result.data;
  }
  async createNewAds(newAds: Advertisement) {
    console.log("create new ads");
    await axios.post("/advertisements", newAds);
  }
}
