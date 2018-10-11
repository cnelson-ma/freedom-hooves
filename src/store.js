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
      state.bids = val;
    },
    setLots(state, val) {
      state.lots = val;
    },
  },
  actions: {
    clearData({ commit }) {
      commit('setBids', []);
      commit('setLots', []);
    },
    removeBid(context, id) {
      fb.bidsCollection.doc(id).delete();
    },
  },
  getters: {

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
    lotsArray.push(lot);
  });
  store.commit('setLots', lotsArray);
});
