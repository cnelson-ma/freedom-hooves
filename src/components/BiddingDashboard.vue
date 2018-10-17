<template>
  <div class="biddingDashboard">
    <b-container class="bidding-dashboard">
      <b-row>
        <b-col>
          <h3 class="mb-4">Bid</h3>
          <form @submit="createBid" @reset="onReset" v-if="show">
            <b-form-group>
              <b-form-radio-group
              id="lotSelectButtons"
              buttons
              button-variant="outline-primary"
              :options="lotOptionArray"
              v-model="form.selectedLot"
              :state="!$v.form.selectedLot.$invalid">
              </b-form-radio-group>
            </b-form-group>
            <b-input-group prepend="$" append=".00" class="mb-4">
              <b-form-input v-model="form.amount" :state="!$v.form.amount.$invalid"></b-form-input>
            </b-input-group>
            <div v-if="$v.$invalid">
              <b-button type="submit" variant="success" class="btn-block" disabled="disabled">
                BID
              </b-button>
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
            <bid-log :bids="$store.state.bids" />
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
import { required, between } from 'vuelidate/lib/validators';
import BidLog from './BidLog.vue';

const fb = require('../firebaseConfig.js');

export default {
  name: 'BiddingDashboard',

  data() {
    return {
      form: {
        amount: '',
        selectedLot: '',
      },
      selectedLotTotal: null,
      show: true,
    };
  },
  methods: {
    createBid(evt) {
      evt.preventDefault();
      const createdAt = Date.now();
      fb.bidsCollection.add({
        amount: this.form.amount,
        createdAt,
        lot: fb.lotsCollection.doc(this.form.selectedLot),
      })
      .then((docRef) => {
        const lotTotalAmount = this.lotTotalAmount(this.form.amount, this.form.selectedLot)
        fb.lotsCollection.doc(this.form.selectedLot)
        .update({ total: lotTotalAmount })
      })
      // this.fetchHighBid(this.form.selectedLot);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.amount = '';
      this.form.selectedLot = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    },
    lotTotalAmount(amount, lot) {
      let total = parseInt(amount)
      const self = this
      fb.lotsCollection.doc(lot).get()
      .then((doc) => {
        self.selectedLotTotal = doc.data().total
      })
      return total + self.selectedLotTotal
    }
  },
  computed: {
    lotOptionArray() {
      const lotOptions = [];
      this.$store.state.lots.forEach((lot) => {
        const lotOption = lot;
        lotOption.value = lot.id;
        lotOption.text = lot.name;
        lotOptions.push(lotOption);
      });
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
