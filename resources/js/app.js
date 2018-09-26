
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('message', require('./components/Message.vue'));


const app = new Vue({
    el: '#app',
    data: {
    	message: '',
    	color: 'warning',
    	chat: {
    		message: [],
            user: [],
            color: []
    	},
    },
    methods: {
    	sendMsg() {
    		if (this.message.length == 0) {
    			return;
    		}

    		this.chat.message.push(this.message);
            this.chat.user.push('You');
            this.chat.color.push('success');

            axios.post('/send', {
                message: this.message,
            })
            .then(response => {
                console.log(response);
                this.message = '';
            })
            .catch(error => {
                console.log(error);
            });

    		console.log(this.message);
    	}
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user.name);
                this.chat.color.push('warning')
            console.log(e.user);
        });
    },

});
