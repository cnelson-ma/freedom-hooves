<template>
  <div class="biddingDashboard">
    <b-container class="bidding-dashboard">
      <b-row>
        <b-col>
          <h3 class="mb-4">Bid</h3>
          <form @submit="createBid" @reset="onReset" v-if="show">
            <b-input-group prepend="$" append=".00" class="mb-4">
              <b-form-input v-model="form.amount" :state="!$v.form.amount.$invalid"></b-form-input>
            </b-input-group>
            <b-form-group>
              <b-form-radio-group
              id="horseSelectButtons"
              buttons
              button-variant="outline-primary"
              :options="horseOptions"
              v-model="form.selectedHorse"
              :state="!$v.form.selectedHorse.$invalid">
              </b-form-radio-group>
            </b-form-group>
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
            <bid-log :bids="bids" />
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
      horses: [],
      bids: [],
      leaderBoard: [],
      form: {
        amount: '',
        selectedHorse: '',
      },
      show: true,
    };
  },
  firestore() {
    return {
      horses: db.collection('horses').orderBy('order'),
      bids: db.collection('bids').orderBy('createdAt', 'desc'),
    };
  },
  methods: {
    createBid(evt) {
      evt.preventDefault();
      const createdAt = Date.now();
      db.collection('bids').add({ amount: this.form.amount, createdAt, horse: db.doc(`/horses/${this.form.selectedHorse}`) });
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.amount = '';
      this.form.selectedHorse = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    },
  },
  computed: {
    highBid() {
      const bidsRef = db.collection('bids');
      const horsesRef = db.collection('horses').doc(this.form.selectedHorse);
      const query = bidsRef.where('horse', '==', horsesRef);
      let highBidValue;
      if (query) {
        highBidValue = query;
      } else {
        highBidValue = 1;
      }
      return highBidValue;
    },
    horseOptions() {
      const horseOptions = [];
      for (let i = 0; i < this.horses.length; i += 1) {
        horseOptions[i] = {
          value: this.horses[i].id,
          text: this.horses[i].name,
        };
      }
      return horseOptions;
    },
  },
  components: {
    BidLog,
  },
  mixins: [
    validationMixin,
  ],
  validations: {
    form: {
      amount: {
        required,
        between: between(1, 10000000),
        //minValue: minValue(this.highBid),
      },
      selectedHorse: {
        required,
      },
    },
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
