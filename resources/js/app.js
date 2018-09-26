
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 5000});

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
            color: [],
            time: []
    	},
        typing: '',
        numberOfUsers: 0,
    },
    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
            });
        }
    },
    methods: {
    	sendMsg() {
    		if (this.message.length == 0) {
    			return;
    		}

    		this.chat.message.push(this.message);
            this.chat.user.push('You');
            this.chat.color.push('success');
            this.chat.time.push(this.getTime());

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
    	},
        getTime() {
            let time = new Date();
            return time.getHours() + ':' + time.getMinutes();
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user.name);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());

            console.log(e.user);
        })
        .listenForWhisper('typing', (e) => {
            this.typing = '';
            if (e.name != '') {
                this.typing = 'typing...';
            }
        });
        Echo.join(`chat`)
            .here((users) => {
                this.numberOfUsers = users.length;
                console.log(users);
         })
            .joining((user) => {
                this.numberOfUsers += 1;
                this.$toaster.success(user.name + ' is joined the room');

                //console.log(user.name);
        })
            .leaving((user) => {
                this.numberOfUsers -= 1;
                this.$toaster.warning(user.name + ' has leaved the room');
                //console.log(user.name);
        });
    },
});
