<template >
    <div class="max-w-lg mx-auto py-8 px-4">
    <BaseH1 class="text-center mb-8 ">Registrate</BaseH1>
    <router-link to="/login" class="absolute top-8 left-2 scale-75">
            <button class="p-0 m-0 flex items-center justify-center">
                <img class="scale-75 p-0" src="/imgs/back.png" alt="back">
            </button>
        </router-link>
    <form action="#" @submit.prevent="handleSubmit">

        <div class="mb-2">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput type="email" id="email" v-model="newUser.email" :disabled="registerCarga" />
        </div>
        <div class="mb-2">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput type="password" id="password" v-model="newUser.password" :disabled="registerCarga"/>
        </div>    

        <BaseButton class="mt-10" :cargando="registerCarga">Registrarse</BaseButton>

    </form>
</div>
</template>
<script>
import BaseButton from '../components/BaseButton.vue';
import BaseH1 from '../components/BaseH1.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { registrar } from '../service/auth';

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput, BaseH1 },
    data() {

        return {

            registerCarga: false,

            newUser: {

                email: '',
                password: '',
                rol: 'usuario',
                calle: '',
                altura: '',
                localidad: '',
                nombre: '' 

            }

        }

    },
    methods: {

        async handleSubmit() {

            try {

                this.registerCarga = true;
                await registrar({ ...this.newUser });
                this.$router.push('/');

            } catch (error) {

            }
            this.registerCarga = false;


        }


    },
}
</script>
<style ></style>