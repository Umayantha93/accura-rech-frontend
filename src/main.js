import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes/routes'

require('bootstrap')
import "bootstrap/dist/css/bootstrap.css"

createApp(App).use(routes).mount('#app')
