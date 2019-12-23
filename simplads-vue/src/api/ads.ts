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
  async createNewAds(data: any) {
    console.log("create new ads...");
    await axios.post("/advertisements", data.newAds);
  }
  async uploadAds(data: any) {
    console.log("upload ads image ...");
    // TODO: this is temporarily fix while waiting for Dapr reply
    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL_WITHOUT_DAPR;

    const formData = new FormData();
    formData.append("file", data.uploadImage);

    await axios.post("/upload", formData);
  }
}
