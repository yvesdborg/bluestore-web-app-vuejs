<template>
  <div>
    <button class="btn btn-primary" data-toggle="modal" data-target="#shoppingCart">
      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      ( {{ numInCart }} )
    </button>
    <div id="shoppingCart" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                      Shopping cart
                      </h5>
                    <button class="close" data-dismiss="modal">
                    &times;
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <tbody>
                            <tr v-for="(item,idx) in cart" :key="idx">
                                <td>{{ item.title }}</td>
                                <td>${{ item.price }}</td>
                                <td>
                                    <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">&times;</button>
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <th>${{ total }}</th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>
                    <button class="btn btn-primary" @click="checkout()">Check out</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { dollars } from './filters';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ShoppingCart',
  filters: {
    dollars,
  },
  computed: {
    inCart() { 
      return this.$store.getters.inCart; 
    },
    numInCart() { 
      return this.inCart.length; },
    cart() {
      return this.$store.getters.inCart.map((cartItem) => {
        return this.$store.getters.forSale.find((forSaleItem) => {
          return cartItem === forSaleItem.id;
        });
      });
    },
    total() {
      return this.cart.reduce((acc, cur) => acc + cur.price, 0);
    },
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
    ...mapGetters([

    ]),
  },
  methods: {
    ...mapActions([
      'addMessage'
    ]),
    removeFromCart(index) {
      this.$store.dispatch('removeFromCart', index);
    },
    checkout() {
      if (this.isAuthenticated) {
        if (this.numInCart == 0) {
          //this.$store.dispatch('addMessage',{
          this.addMessage({
            messageClass: 'warning',
            message: 'Your cart is empty!',
          })
          return
        }    
      } else {
        this.addMessage({
          messageClass: 'warning',
          message: 'Please login to checkout',
        })
        return
      }
    },
  }
};
</script>