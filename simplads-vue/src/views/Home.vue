<template lang="html">
  <div>
    <vs-navbar class="nabarx">
      <div slot="title">
        <vs-navbar-title class="table-header">
          List of advertisements
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <router-link to="/create-new-ads">Create new advertisement</router-link>
      </vs-navbar-item>
    </vs-navbar>
    <vs-table stripe :data="advertisements">
      <template slot="thead">
        <vs-th>Title</vs-th>
        <vs-th>Category</vs-th>
        <vs-th>Price</vs-th>
        <vs-th>Image</vs-th>
        <vs-th>Status</vs-th>
        <vs-th>Posted By</vs-th>
        <vs-th>Posted Date</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].title">
            {{ data[indextr].title }}
          </vs-td>
          <vs-td :data="data[indextr].category">
            {{ data[indextr].category }}
          </vs-td>
          <vs-td :data="data[indextr].price">
            {{ data[indextr].price }}
          </vs-td>
          <vs-td :data="data[indextr].image">
            <img
              :src="`https://${baseUrl}/uploads/resized_${data[indextr].image}`"
            />
          </vs-td>
          <vs-td :data="data[indextr].status">
            {{ data[indextr].status }}
          </vs-td>
          <vs-td :data="data[indextr].postedBy">
            {{ data[indextr].postedBy }}
          </vs-td>
          <vs-td :data="data[indextr].postedDate">
            {{ data[indextr].postedDate }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    baseUrl: process.env.VUE_APP_BASE_URL,
    select1: 3,
    options1: [
      { text: "IT", value: 0 },
      { text: "Blade Runner", value: 2 },
      { text: "Thor Ragnarok", value: 3 }
    ]
  }),
  mounted() {
    this.getAds();
  },
  computed: {
    ...mapState(["advertisements"])
  },
  methods: {
    ...mapActions(["getAds"])
  }
};
</script>
<style lang="stylus" scoped>
.table-header
  font-family "Montserrat", sans-serif
  font-weight 400
  font-size 1.3rem

.myNavbar
  color rgb(255, 255, 255)
  height 50px
</style>
