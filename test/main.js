import { createApp } from 'vue'
import App from './App'
import Modal from '../src/Modal'
import Confirm from '../src/Confirm'

const app = createApp(App)

app.component('Modal', Modal)
app.component('Confirm', Confirm)

app.config.globalProperties.LOREM_IPSUM = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod dolor quis dui venenatis, at commodo nisi feugiat.
    Integer quis finibus lorem. Aliquam pellentesque elementum lacus quis gravida. Proin a nisl leo. Donec at fermentum lacus, viverra accumsan sem.
    Aenean non pellentesque nulla. Integer cursus elementum eros. Pellentesque porta pulvinar metus, nec imperdiet libero. Pellentesque et vehicula massa.`

app.mount('#app')