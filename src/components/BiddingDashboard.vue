<template>
  <div class="biddingDashboard">
    <b-container class="bidding-dashboard">
      <b-row>
        <b-col>
          <h3 class="mb-4">Bid</h3>
          <p>High bid for current horse: ${{ form.highBidMin - 1 }}</p>
          <form @submit="createBid" @reset="onReset" v-if="show">
            <b-form-group>
              <b-form-radio-group
              id="lotSelectButtons"
              buttons
              button-variant="outline-primary"
              :options="lotOptions"
              v-model="form.selectedLot"
              :state="!$v.form.selectedLot.$invalid">
              </b-form-radio-group>
            </b-form-group>
            <b-input-group prepend="$" append=".00" class="mb-4">
              <b-form-input v-model="form.amount" :state="!$v.form.amount.$invalid"></b-form-input>
            </b-input-group>
            <div v-if="$v.$invalid">
              <b-button type="submit" variant="success" class="btn-block" disabled="disabled">BID</b-button>
            </div>
            <div v-else>
              <b-button type="submit" variant="success" class="btn-block">BID</b-button>
            </div>
            <b-button
            type="reset"
            variant="outline-danger"
            class="mt-4 btn-block"
            size="sm">
              Reset
            </b-button>
          </form>
        </b-col>
        <b-col>
          <h3 class="mb-4">History</h3>
          <div class="scroll-table">
            <bid-log :bids="bids" v-on:deletebid="fetchHighBid(form.selectedLot)" />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, between, minValue } from 'vuelidate/lib/validators';
import { db } from '../main';
import BidLog from './BidLog.vue';

export default {
  name: 'BiddingDashboard',

  data() {
    return {
      lotCollection: 'horses',
      bidCollection: 'bids',
      lots: [],
      bids: [],
      leaderBoard: [],
      form: {
        amount: '',
        selectedLot: '',
        highBidMin: 1,
      },
      show: true,
    };
  },
  watch: {
    'form.selectedLot': function (newLot, oldLot) {
      this.fetchHighBid(newLot);
    },
  },
  firestore() {
    return {
      lots: db.collection(this.lotCollection).orderBy('order'),
      bids: db.collection(this.bidCollection).orderBy('createdAt', 'desc'),
    };
  },
  methods: {
    createBid(evt) {
      evt.preventDefault();
      const createdAt = Date.now();
      db.collection(this.bidCollection).add({
        amount: this.form.amount,
        createdAt,
        lot: db.collection(this.lotCollection).doc(this.form.selectedLot),
      });
      this.fetchHighBid(this.form.selectedLot);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.amount = '';
      this.form.selectedLot = '';
      this.form.highBidMin = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    },
    fetchHighBid(lot) {
      const self = this;
      const bidsRef = db.collection(this.bidCollection);
      const lotRef = db.collection(this.lotCollection).doc(lot);
      const query = bidsRef.where('lot', '==', lotRef).orderBy('createdAt', 'desc').limit(1);
      query.get().then(function (querySnapshot) {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            self.form.highBidMin = Number(doc.data().amount) + 1;
          });
        } else {
          self.form.highBidMin = 1;
        }
      });
    },
  },
  computed: {
    lotOptions() {
      const lotOptions = [];
      for (let i = 0; i < this.lots.length; i += 1) {
        lotOptions[i] = {
          value: this.lots[i].id,
          text: this.lots[i].name,
        };
      }
      return lotOptions;
    },
  },
  components: {
    BidLog,
  },
  mixins: [
    validationMixin,
  ],
  validations() {
    return {
      form: {
        amount: {
          required,
          between: between(1, 10000000),
          minValue: minValue(this.form.highBidMin),
        },
        selectedLot: {
          required,
        },
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll-table {
    height: 600px;
    display: block;
    overflow-x: scroll;
  }
</style>
