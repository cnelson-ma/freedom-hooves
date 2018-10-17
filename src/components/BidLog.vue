<template>
  <div>
    <b-table striped hover :items="bidItems" :fields="bidFields">
      <template slot="tools" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button size="sm" @click.stop="removeBid(row.item)">

         <font-awesome-icon icon="trash"/>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
  props: {
    bids: {
      type: Array,
    },
  },
  data() {
    return {
      bidFields: ['lot', 'amount', 'placed', 'tools'],
    };
  },
  computed: {
    bidItems() {
      const bidArray = [];
      this.bids.forEach((bid) => {
        const formattedDate = moment(bid.createdAt).format('LTS');
        const bidItem = {};
        bidItem.lot = bid.lot.id;
        bidItem.amount = `$${bid.amount}`;
        bidItem.placed = formattedDate;
        bidItem.id = bid.id;
        bidArray.push(bidItem);
      });
      return bidArray;
    },
  },
  methods: {
    ...mapActions({
      removeBidFromStore: 'removeBid',
    }),
    removeBid(bid) {
      this.removeBidFromStore(bid);
      this.$emit('deletebid');
    },
  },
};
</script>
<style>
</style>
