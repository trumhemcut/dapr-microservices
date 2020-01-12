<template>
  <div id="app">
    <div class="centerx">
      <vs-navbar
        color="#000000"
        text-color="rgba(255,255,255,.6)"
        class="myNavbar"
      >
        <div slot="title">
          <vs-navbar-title>
            SimplAds - a sample using Dapr on Microsoft Azure
          </vs-navbar-title>
        </div>

        <vs-navbar-item index="0">
          <a href="#" v-if="isAuthenticated">{{ email }}</a>
        </vs-navbar-item>
        <vs-navbar-item index="2">
          <a href="#" v-if="!isAuthenticated" @click="$adal.login()">Login</a>
          <a href="#" v-if="isAuthenticated" @click="$adal.logout()">Logout</a>
        </vs-navbar-item>

        <vs-spacer></vs-spacer>
      </vs-navbar>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // email: ""
      // isAuthenticated: false
    };
  },
  computed: {
    ...mapState(["email", "isAuthenticated"])
  },
  methods: {
    ...mapMutations(["setAuthStatus"])
  },
  async created() {
    let authenticated = this.$adal.isAuthenticated();
    this.setAuthStatus({
      email: authenticated ? this.$adal.user.profile.email : "unknown user",
      isAuthenticated: authenticated
    });
  }
};
</script>
<style>
#app {
  font-family: "MontserratThin", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
