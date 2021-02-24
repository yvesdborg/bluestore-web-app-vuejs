<template>
<div id="app" class="container my-5">
  <div class="row action-panel">
      <div class="col-12">
        <div class="btn-group btn-group-sm pull-right">
          <button id="list" class="btn btn-outline-dark" @click.prevent="changeDisplay(true)">
            <i class="fa fa-list" aria-hidden="true"></i> List
          </button>
          <button id="grid" class="btn btn-outline-dark" @click.prevent="changeDisplay(false)">
            <i class="fa fa-th" aria-hidden="true"></i> Grid
          </button>
        </div>
      </div>
  </div>
  <div class="row">
    <Item
      v-for="item in forSale"
      :key="item.id"
      :idx="item.id"
      :description="item.description"
      :price="item.price"
      :quantity="item.quantity"
      :thumbnail_url="item.thumbnail_url"
      :title="item.title"
      :displayList="displayList" />
  </div>
  <!-- No more inCart -->
</div>
</template>
<script>
import Item from './Item.vue';

export default {
  name: 'app',
  data() {
    return {
      displayList: false
    }
  },
  computed: {
    forSale() { return this.$store.getters.forSale; },
    inCart() { return this.$store.getters.inCart; },
  },
  mounted() {
    this.$store.dispatch("getForSaleProducts")
  },
  components: {
    Item,
  },
  methods: {
    changeDisplay(isList) {
      this.displayList = isList;
    }
  }
};
</script>
