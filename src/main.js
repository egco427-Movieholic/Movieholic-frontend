import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FomanticUI from 'vue-fomantic-ui'
import 'fomantic-ui-css/semantic.min.css'
import 'vue3-carousel/dist/carousel.css'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { initializeApp } from "firebase/app"
import {getAuth, onAuthStateChanged} from "firebase/auth"

let app
let auth

const firebaseConfig = {
  apiKey: "AIzaSyBluaWCZBKoI0-259B1roFiTAqFUeiCz10",
  authDomain: "movieholic-auth.firebaseapp.com",
  projectId: "movieholic-auth",
  storageBucket: "movieholic-auth.appspot.com",
  messagingSenderId: "78152495374",
  appId: "1:78152495374:web:a90dec70dc5ec80c37675f",
  measurementId: "G-YYRF5VG7GV"
};

initializeApp(firebaseConfig)
auth = getAuth()

onAuthStateChanged( auth, (user) => {
    if(!app)
    {
        app = createApp(App).use(router).use(FomanticUI).mount('#app')
    }
})
