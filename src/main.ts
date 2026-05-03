import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './main.css'

import App from './App.vue'
import router from './router'
import inView from '@/directives/inView'
import countUp from '@/directives/countUp'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('in-view', inView)
app.directive('count-up', countUp)

app.mount('#app')
