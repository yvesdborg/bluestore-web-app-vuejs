<template>
<div class="mb-3 col-sm-6 col-md-4 item" :class="{'list-group-item': displayList}">
  <div class="thumbnail card">
    <div class="img-event intrinsic">
      <img :src="thumbnail_url" alt="" class="grow thumbnail-image card-img-top intrinsic-item p-3">
    </div>
    <div class="card-body">
      <!-- <router-link :to="'/product/' + id" tag="h5" class="card-title"><a>{{ title }}</a></router-link> -->
      <h6 class="card-subtitle mb-2 remain">{{ quantity }} left in stock</h6>

      <p class="card-text truncate">{{ description | shortDescription}}</p>

      <div class="row">
        <p class="col-6 lead">${{ price }}</p>
        <p class="col-6">
          <button class="btn btn-success pull-right" :disabled="quantity === 0" @click="addToCart(idx)">
            Add to cart
          </button>
        </p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { dollars } from './filters';
export default {
  name: 'item',
  props: ['description', 'idx', 'price', 'quantity', 'thumbnail_url', 'title', 'displayList' ],
  filters: {
    dollars, // Replaces old filter definition
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + '...';
      } else {
        return value;
      }
    }
  },
  methods: {
    addToCart(idx) {
      this.$store.commit("addToCart", idx);
    },
  },
};
</script>

<style lang="scss" scoped>
div.card {
  height: 100%;
}

.card-text {
  font-size: 0.875rem;
}

.remain {
  color: #d17581;
}

.grow {
  transition: all .2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}

.list-group-item {
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 30px;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 1rem;
  border: 0;
  .thumbnail {
    display: inline-block;
    width: 100%;
  }
  .img-event {
    width: 20%;
    float: left;
    padding: 0 !important;
    margin: 0;
    height: auto;
  }

  .thumbnail-image {
    position: static;
  }

  .card-body {
    float: left;
    width: 80%;
    margin: 0;
  }

  @media (max-width: 767.98px) {
    .img-event {
      width: 30%;
      float: left;
      padding: 0 !important;
      margin: 0;
    }

    .card-body {
      float: left;
      width: 70%;
      margin: 0;
    }
  }
}

.item.list-group-item:before, .item.list-group-item:after
{
    display: table;
    content: " ";
}

.item.list-group-item:after {
  clear: both;
}
</style>

