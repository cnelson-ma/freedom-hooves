<template>
  <div>
    <b-table striped hover :items="bidItems" :fields="bidFields">
      <template slot="tools" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button size="sm" @click.stop="removeBid(row.item.id)">
         <font-awesome-icon icon="trash"/>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    bids: {
      type: Array,
    },
  },
  data() {
    return {
      bidFields: ['horse', 'amount', 'placed', 'tools'],
    };
  },
  computed: {
    bidItems() {
      const bidItems = [];
      for (let i = 0; i < this.bids.length; i += 1) {
        const formattedDate = moment(this.bids[i].createdAt).format('LTS');
        bidItems[i] = {
          horse: this.bids[i].horse.name,
          amount: `$${this.bids[i].amount}.00`,
          placed: formattedDate,
          id: this.bids[i].id,
        };
      }
      return bidItems;
    },
  },
  methods: {
    removeBid(id) {
      db.collection('bids').doc(id).delete();
    },
  },
};
</script>
<style>
  
</style>
