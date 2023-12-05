<template>
    <form class="h-screen" action="#" @submit.prevent="Logining">
        <section class="py-26  h-screen px-4">
            <BaseH1 class="text-center hidden">Ingresar</BaseH1>
            <img class="mx-auto px-2 pt-10 h-auto max-w-full" src="/imgs/mock.png" alt="logo">
            <div class="container px-4 mx-auto">
                <div class="max-w-lg mx-auto py-8">
                    <div class="mb-2">
                        <BaseLabel for="email">Email</BaseLabel>
                        <BaseInput type="email" id="email" v-model="form.email" :disabled="logingCarga" />
                    </div>
                    <div class="mb-2">
                        <BaseLabel class="mt-10" for="password">Contraseña</BaseLabel>
                        <BaseInput type="password" id="password" v-model="form.password" :disabled="logingCarga" />
                    </div>
                    <BaseButton class="mt-10" :cargando="logingCarga">Ingresar</BaseButton>
                    <p class="my-5 text-center font-bold ">
                        ¿No tenés una cuenta?,<a class="text-green-800 hover:underline" href="/#/register"> ¡Registrate!</a>
                    </p>
                </div>
                <div v-if="errorMensaje" class="rounded mx-auto text-center text-red-700 bg-red-200 border-red-800">{{
                    errorMensaje }}</div>
            </div>
        </section>
    </form>
</template>
  
<script>
import BaseButton from '../components/BaseButton.vue';
import BaseH1 from '../components/BaseH1.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { login } from '../service/auth.js';

export default {
    name: 'Login',
    components: { BaseButton, BaseLabel, BaseInput, BaseH1 },
    emits: ['logged'],
    data() {
        return {
            logingCarga: false,
            form: {
                email: '',
                password: ''
            },
            errorMensaje: ''
        };
    },
    methods: {
        Logining() {
            this.logingCarga = true;
            this.errorMensaje = '';

            login({
                ...this.form
            })
                .then(response => {
                    if (response.code) {
                        console.error('Error de inicio de sesión:', response.code);
                        this.errorMensaje = 'Error al iniciar sesión. Verifica tu correo y contraseña.';
                    } else {
                        this.$emit('logged', { ...response.user });
                        this.$router.push('/home');
                    }
                })
                .finally(() => {
                    this.logingCarga = false;
                });
        }
    }
};
</script>
  
<style></style>
  