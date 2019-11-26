<template lang="html">
  <div>
    <div class="centerx">
      <vs-navbar
        :color="colorx"
        text-color="rgba(255,255,255,.6)"
        class="myNavbar"
      >
        <div slot="title">
          <vs-navbar-title>
            SimplAds - a sample using Dapr on Microsoft Azure
          </vs-navbar-title>
        </div>

        <vs-navbar-item index="0">
          <a href="#">john.doe@email.com</a>
        </vs-navbar-item>
        <vs-navbar-item index="2">
          <a href="#">Logout</a>
        </vs-navbar-item>

        <vs-spacer></vs-spacer>
      </vs-navbar>
    </div>
    <vs-navbar v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title class="table-header">
          List of advertisements
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a href="#">Create new advertisement</a>
      </vs-navbar-item>
    </vs-navbar>
    <vs-table stripe :data="users">
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
            {{ data[indextr].image }}
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
export default {
  data: () => ({
    colorx: "#000000",
    users: [
      {
        id: 1,
        title: "Lemon Juice",
        category: "Drink",
        price: "500$",
        image: "lemonjuice.jpg",
        status: "Active",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      },
      {
        id: 2,
        title: "Coca Cola",
        category: "Drink",
        price: "1k$",
        image: "cocacola.jpg",
        status: "Active",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      },
      {
        id: 3,
        title: "Lemon Juice",
        category: "Drink",
        price: "500$",
        image: "hildegard.org",
        status: "Pending",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      },
      {
        id: 4,
        title: "Pencil",
        category: "Pen & Pencil",
        price: "2000$",
        image: "pencil.jpg",
        status: "Pending",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      },
      {
        id: 5,
        title: "Chewing Gum",
        category: "Drink",
        price: "20$",
        image: "chewing-gum.jpg",
        status: "Active",
        postedBy: "john.doe@email.com",
        postedDate: "July 9, 2019"
      }
    ]
  })
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
</style>
