import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'

import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
        apiKey: "AIzaSyAI6yxuoQ8zBNUAmZxu92Y59iHMwonNH4Y",
        authDomain: "meetup-9e0fe.firebaseapp.com",
        databaseURL: "https://meetup-9e0fe.firebaseio.com",
        projectId: "meetup-9e0fe",
        storageBucket: "gs://meetup-9e0fe.appspot.com/",
        messagingSenderId: "541223027498"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
