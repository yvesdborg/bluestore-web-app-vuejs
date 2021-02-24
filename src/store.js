import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    forSale: [],
    inCart: [],
    authenticationEnabled: "authentication-enabled-yes", // use "authentication-enabled-yes" to turn it on
    endpoints: {
      login: "http://localhost:3000/login" // example: "http://localhost:3000/login"
    },
    user: {
      isAuthenticated: false,
      name: "",
      email: "",
      idToken: ""
    },
    messageGroup: {
      // messageClass: 'danger',
      // message: 'Test'
      messageClass: '',
      message: '',
      timeoutEvent: null,
    }
  },
  getters: {
    forSale: function (state) {
        return state.forSale;
    },
    inCart: state => state.inCart,
    messages: (state) => {
      return state.messageGroup;
    }
  },
  mutations: { //synchronous
    addToCart(state, idx) { 
      state.inCart.push(idx);
    },
    //ADD_TO_CART(state, idx) { 
    //  state.inCart.push(idx);
    //},
    REMOVE_FROM_CART(state, index) { state.inCart.splice(index, 1); },
    SET_FORSALE(state, products) { state.forSale = products },
    logout(state) {
      state.user.isAuthenticated = false;
      state.user.name = "";
      state.user.email ="";
      state.user.idToken ="";
    },
    login(state, payload) {
      state.user.isAuthenticated = true;
      state.user.name = payload.name;
      state.user.email =payload.email;
      state.user.idToken =payload.idToken;
    },
    ADD_MESSAGE(state, {message, messageClass}) {
      state.messageGroup = {
        messageClass,
        message
      }  
      if (state.timeoutEvent) {
        clearTimeout(state.timeoutEvent);
      }
      state.timeoutEvent = setTimeout(function() {
        state.messageGroup = {
          messageClass: '',
          message: ''
        }
      }, 5000);
    },
    CLEAR_MESSAGE(state) {
      state.messageGroup = {
        messageClass: '',
        message: ''
      }
    }
  },
  actions: {
    addMessage(context, obj) {
      context.commit('ADD_MESSAGE', obj);
    },
    clearMessage({commit}) {
      commit('CLEAR_MESSAGE');
    },
    removeFromCart(context, index) { context.commit('REMOVE_FROM_CART', index) },
    getForSaleProducts({ commit }) {
        axios.get('http://localhost:8080/products')
          .then((response) => {
            commit('SET_FORSALE', response.data);
            console.log(response.data)
          })
      }
    },
});