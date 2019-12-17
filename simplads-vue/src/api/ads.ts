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
    const formData = new FormData();
    formData.append("title", newAds.title);
    formData.append("category", newAds.category);
    formData.append("file", newAds.image);
    formData.append("image", "");
    formData.append("postedBy", newAds.postedBy);
    formData.append("postedDate", newAds.postedDate.toString());
    formData.append("price", newAds.price);
    formData.append("status", newAds.status);
    await axios.post("/advertisements", formData);
  }
}
