import Vue from 'vue';
import Vuex from 'vuex';

const fb = require('./firebaseConfig.js');

Vue.use(Vuex);

export const store = new Vuex.Store({ // eslint-disable-line
  state: {
    bids: [],
    lots: [],
  },
  mutations: {
    setBids(state, val) {
      // eslint-disable-next-line
      state.bids = val;
    },
    setLots(state, val) {
      // eslint-disable-next-line
      state.lots = val;
    },
  },
  actions: {
    clearData({ commit }) {
      commit('setBids', []);
      commit('setLots', []);
    },
    removeBid(context, bid) {
      fb.bidsCollection.doc(bid.id).delete()
        .then(() => {
          const lot = context.getters.getLotById(bid.lot);
          const newTotal = lot.total - parseInt(bid.amount.substr(1), 10);
          fb.lotsCollection.doc(bid.lot).update({ total: newTotal });
        });
    },
  },
  getters: {
    getLotById: state => id => state.lots.find(lot => lot.id === id),
  },
});

fb.bidsCollection.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
  const bidsArray = [];
  querySnapshot.forEach((doc) => {
    const bid = doc.data();
    bid.id = doc.id;
    bid.amount = doc.data().amount;
    bid.createdAt = doc.data().createdAt;
    bidsArray.push(bid);
  });
  store.commit('setBids', bidsArray);
});

fb.lotsCollection.orderBy('order', 'desc').onSnapshot((querySnapshot) => {
  const lotsArray = [];
  querySnapshot.forEach((doc) => {
    const lot = doc.data();
    lot.id = doc.id;
    lot.name = doc.data().name;
    lot.total = doc.data().total;
    lotsArray.push(lot);
  });
  store.commit('setLots', lotsArray);
});
