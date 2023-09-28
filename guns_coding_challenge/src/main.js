import './assets/main.css'

import App from "./App.vue"
import { createApp } from 'vue'
import store from './stores'

import "./scss/style.scss";
import "bootstrap";

const app = createApp(App);

app.use(store);
app.mount("#app");