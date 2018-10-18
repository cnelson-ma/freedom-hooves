<template>
  <b-row class="list-container">
    <b-col cols="3" v-for="lot in lots">
      <div class="card-container">
        <img class="card-image" v-bind:src="'/images/' + lot.id + '.jpg'">
        <div class="card-title">
          <span v-bind:class="[lot.id == 'winnie_the_pooh' ? smallClass : '']">
            {{ lot.name }}
          </span>
        </div>
        <div class="card-amount">
          ${{ lot.total }}
        </div>
      </div>
    </b-col>
  </b-row >
</template>

<script>
export default {
  name: 'LotCardList',
  data() {
    return {
      smallClass: 'small-title',
    };
  },
  computed: {
    lots() {
      return this.$store.state.lots;
    },
  },
};
</script>

<style>
.list-container {
  margin-right: 40px;
  margin-left: 40px;
}

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300i,800');
  .card-container {
    border-radius: 20px;
    margin: 30px 0;
    box-shadow: 0px 3px 12px rgba(0,0,0,0.2);
    margin-top: 104px;
    border: 1px solid #206D64;
    text-align: center;
  }
  .card-image {
    height: 208px;
    width: 208px;
    border-radius: 50%;
    margin-top: -104px;
    box-shadow: 0px 3px 12px rgba(0,0,0,0.2);
  }
  .card-title {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-weight: 300;
    font-style: italic;
    font-size: 50px;
    color: #7C5D54;
    margin-bottom: 0;
  }
  .small-title {
    font-size: 40px;
  }
  .card-amount {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 80px;
    font-weight: 800;
    color: #206D64;
  }
</style>
