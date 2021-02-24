<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark" role="navigation">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <router-link to="/" class="navbar-brand mr-auto">Blue Online Store</router-link>
      <ul class="navbar-nav mr-auto">
      </ul>
      <ul class="nav navbar-nav">
        <router-link to="/" tag="li" v-if="!isAuthenticated" class="nav-item" active-class="active">
          <a @click="onLoginClicked" class="nav-link">Login</a>
        </router-link>
        <li v-if="isAuthenticated" class="li-pointer nav-item">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ getUserName() }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Account Settings</a>
              <a @click="onLogoutClicked" class="dropdown-item">Logout {{ userEmail }}</a>
            </div>
          </div>
        </li>
        <li>
          <!-- <router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
            Checkout <span class="badge badge-light">{{ numInCart }}</span>
          </router-link> -->
          <ShoppingCart />
        </li>
      </ul>
  </div>
  <!-- /.container -->
</nav>
</template>

<script>
import {
  //mapActions, mapGetters
} from 'vuex';
import ShoppingCart from './ShoppingCart.vue';
export default {
  components: { ShoppingCart },
  name: 'NavHeader',
  data() {
    return {
      webApiUrl: this.$store.state.endpoints.api + "manage",
      isNavOpen: false,
      isLoggedIn: false
    }
  },
  computed: {
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    },
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
    isAuthenticationEnabled() {
      if (
        this.$store.state.authenticationEnabled == "authentication-enabled-yes"
      ) {
        return true;
      } else {
        return false;
      }
    },
    inCart() { return this.$store.getters.inCart; },
    numInCart() { return this.inCart.length; },
  },
  methods: {
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen
    },
    onLoginClicked() {
      window.location = this.$store.state.endpoints.login;
    },
    onLogoutClicked() {
      this.$store.commit("logout");
    },
    getUserName() {
      return this.$store.state.user.name;
    }
  }
}
</script>


<style scoped lange="sass">
.navbar-btn a {
  color: white;
}

.li-pointer {
  cursor: pointer;
}

.li-pointer:hover {
  cursor: pointer;
}
</style>
