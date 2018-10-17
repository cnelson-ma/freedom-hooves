<template>
  <b-row class="list-container">
    <LotCard v-for="lot in lots" :lotName="lot.name" :amount="lot.total" :lotId="lot.id" />
  </b-row >
</template>

<script>
import LotCard from './LotCard.vue';

export default {
  name: 'LotCardList',
  components: {
    LotCard,
  },
  data() {
    return {
      lots: this.$store.state.lots,
    };
  },
};
</script>

<style>
.list-container {
  margin-right: 40px;
  margin-left: 40px;
}
</style>
