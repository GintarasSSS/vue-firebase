import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from "@/routers";

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';

import BaseCard from "@/components/ui/BaseCard.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);

app.mount('#app');
