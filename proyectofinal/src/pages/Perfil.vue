<template>
    <div>
        <div class="max-w-sm bg-white rounded overflow-hidden shadow-lg p-5 my-20 mx-5">

            <router-link to="/home" class="absolute top-2 left-2 scale-75">
                <button class="p-0 m-0 flex items-center justify-center">
                    <img class="scale-75 p-0" src="/imgs/back.png" alt="back">
                </button>
            </router-link>
            <BaseH1 class="font-bold text-xl text-center mb-2">Perfil de {{ getEmailPrefix(user.email) }}</BaseH1>                      
                <p class="text-center"><strong>Email:</strong> {{ user.email }}</p>           
        </div>
    </div>
</template>

<script>
import BaseH1 from '../components/BaseH1.vue';
import { subscribeToAuth } from "./../service/auth.js";

export default {
    name: 'perfil',
    components: { BaseH1 },

    data() {
        return {
            user: {
                id: null,
                email: null,
            },
        }
    },
    mounted() {
        subscribeToAuth(user => this.user = { ...user });
    },
    methods: {
    getEmailPrefix(email) {      
      return email && email.includes('@') ? email.split('@')[0] : email;
    },
  },
}
</script>
<style ></style>