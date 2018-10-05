<template>
  <div class="biddingDashboard">
    <b-container class="bidding-dashboard">
      <b-row>
        <b-col class="lot-card-container" v-for="leader in leaderBoard" v-bind:key="leader.id">
          <div class="lot-card" :class="isCardLeader(leader.name)">
            <h1>{{ leader.name }}</h1>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { db } from '../main';

export default {
  name: 'BiddingDashboard',

  data() {
    return {
      lotCollection: 'horses',
      bidCollection: 'bids',
      lots: [],
      bids: [],
      leaderBoard: [],
      currentHighbid: 1,
      currentLeader: '',
    };
  },
  firestore() {
    return {
      lots: db.collection(this.lotCollection).orderBy('order'),
      bids: db.collection(this.bidCollection).orderBy('createdAt', 'desc'),
    };
  },
  methods: {
    fetchLeaderBoard() {
      const self = this;
      self.lots.forEach((lot, i) => {
        const bidsRef = db.collection(this.bidCollection);
        const lotRef = db.collection(this.lotCollection).doc(lot.id);
        const query = bidsRef.where('horse', '==', lotRef).orderBy('createdAt', 'desc').limit(1);
        query.get().then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            self.leaderBoard[i] = {
              id: lot.id,
              name: lot.name,
              highBid: doc.data().amount,
            };
            if (self.currentHighbid < self.leaderBoard.i.highBid) {
              self.currentHighbid = self.leaderBoard.i.highBid;
              self.currentLeader = self.leaderBoard.i.id;
            }
          });
        });
      });
    },
    isCardLeader(id) {
      return (id === this.currentLeader ? 'leader-card' : '');
    },
  },
  computed: {
  },
  beforeMount() {
    this.fetchLeaderBoard();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
