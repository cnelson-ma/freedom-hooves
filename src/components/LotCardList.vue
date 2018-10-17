<template>
  <div class="list-container">
    <LotCard v-for="lot in lots" :lotName="lot.name" :amount="lot.amount" />
  </div>
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
      lots: [
        {
          name: 'Honey Bee',
          amount: '5000',
        },
        {
          name: 'Honey Bee',
          amount: '5000',
        },
        {
          name: 'Honey Bee',
          amount: '5000',
        },
        {
          name: 'Honey Bee',
          amount: '5000',
        },
        {
          name: 'Honey Bee',
          amount: '5000',
        },
        {
          name: 'Honey Bee',
          amount: '5000',
        },
        {
          name: 'Honey Bee',
          amount: '5000',
        },
      ],
    };
  },
};
</script>

<style>
  .list-container {
    margin: 80px auto;
    display: grid;
    grid-template-columns: 200px 200px 200px 200px;
    grid-gap: 30px;
    justify-content: center;
  }
</style>
