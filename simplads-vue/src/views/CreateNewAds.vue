<template lang="html">
  <div>
    <vs-navbar class="nabarx">
      <div slot="title">
        <vs-navbar-title class="table-header">
          Create New Advertisement
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <router-link to="/">List of advertisements</router-link>
      </vs-navbar-item>
    </vs-navbar>
    <vs-row style="padding-top:20px;padding-left:10px;" vs-w="6">
      <vs-col vs-type="flex" vs-w="12">
        <vs-alert :active.sync="NewAdsCreated" closable close-icon="cancel">
          Created new ads successfully!
        </vs-alert>
      </vs-col>
      <vs-col vs-type="flex" vs-w="12">
        <vs-row>
          <vs-col vs-w="2"><span>Title</span></vs-col>
          <vs-col vs-w="10"
            ><vs-input
              size="default"
              class="inputx"
              placeholder="Title"
              v-model="title"
          /></vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-w="12">
        <vs-row>
          <vs-col vs-w="2"><span>Category</span></vs-col>
          <vs-col vs-w="10">
            <vs-select class="selectExample" v-model="selectedCategory">
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in categories"
              />
            </vs-select>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-w="12">
        <vs-row>
          <vs-col vs-w="2"><span>Price</span></vs-col>
          <vs-col vs-w="10"
            ><vs-input
              class="inputx"
              size="default"
              v-model="price"
              placeholder="Price"
          /></vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-w="12">
        <vs-row>
          <vs-col vs-w="2"><span>Status</span></vs-col>
          <vs-col vs-w="10"
            ><vs-input disabled class="inputx" size="default" v-model="state"
          /></vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-w="12">
        <vs-row>
          <vs-col vs-w="2"><span>Description</span></vs-col>
          <vs-col vs-w="10">
            <vs-textarea v-model="description" placeholder="Description" />
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-w="12">
        <vs-row>
          <vs-col vs-w="2"><span>Image</span></vs-col>
          <vs-col vs-w="10"
            ><input id="image" type="file" @change="fileChanged"
          /></vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-w="12">
        <vs-row>
          <vs-col vs-w="2"></vs-col>
          <vs-col vs-w="10"
            ><vs-button size="large" @click="saveAds"
              >Save Ads</vs-button
            ></vs-col
          >
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import "material-icons/iconfont/material-icons.css";
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    title: "",
    price: undefined,
    description: "",
    selectedCategory: 2,
    categories: [
      { text: "Drinks and foods", value: 0 },
      { text: "Computers", value: 2 },
      { text: "Thor Ragnarok", value: 3 }
    ],
    state: "PENDING",
    uploadImage: undefined,
    NewAdsCreated: false
  }),
  computed: {
    ...mapState(["advertisements", "email", "isAuthenticated"])
  },
  methods: {
    ...mapActions(["createNewAds"]),
    async fileChanged(event) {
      if (event.target.files.length >= 1) {
        this.uploadImage = event.target.files[0];
      }
    },
    async saveAds() {
      await this.createNewAds({
        newAds: {
          title: this.title,
          categoryId: this.selectedCategory,
          category: this.categories.filter(
            c => c.value == this.selectedCategory
          )[0].text,
          price: this.price,
          status: "Pending",
          postedBy: this.email,
          postedDate: Date.now()
        },
        uploadImage: this.uploadImage
      });
      this.NewAdsCreated = true;
    }
  }
};
</script>
<style lang="stylus">
.table-header
  font-family "Montserrat", sans-serif
  font-weight 400
  font-size 1.3rem

.myNavbar
  color rgb(255, 255, 255)
  height 50px

.vs-col
  margin-bottom 10px

.con-input-upload
  margin: 0px
.vs-con-textarea
  margin: 0px
</style>
