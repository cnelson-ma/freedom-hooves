import Vue from 'vue';

import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import moment from 'moment';
import Vuelidate from 'vuelidate';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(faTrash);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(BootstrapVue);
Vue.use(moment);
Vue.use(Vuelidate);

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBVE31-qgb76NSyCWn5WrzMtEDYwDgbgxE',
  authDomain: 'freedom-derby.firebaseapp.com',
  databaseURL: 'https://freedom-derby.firebaseio.com/',
  projectId: 'freedom-derby',
  storageBucket: 'freedom-derby.appspot.com',
  messagingSenderId: '1038574637211',
});
export const db = firebaseApp.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
