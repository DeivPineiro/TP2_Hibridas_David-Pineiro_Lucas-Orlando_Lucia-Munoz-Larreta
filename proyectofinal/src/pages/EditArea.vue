<template >
    <div class="max-w-lg mx-auto py-8 px-4 relative">
        <BaseH1 class="text-center mb-8">Edita tu cosecha</BaseH1>
        <router-link to="/user/areas" class="absolute top-7 left-2 scale-75">
            <button class="p-0 m-0 flex items-center justify-center">
                <img class="scale-75 p-0" src="/imgs/back.png" alt="back">
            </button>
        </router-link>
        <form action="#" @submit.prevent="CrearArea">
            <div class="mb-2">
                <BaseLabel for="nombreCosecha">Identifica a tu cultivo</BaseLabel>
                <BaseInput type="text" id="nombreCosecha" v-model="nombreCosecha" />
            </div>
            <div class="mb-2">
                <BaseLabel for="pesoPorCosecha">Peso proyectado (kg/km²)</BaseLabel>
                <BaseInput type="number" id="pesoPorCosecha" v-model="pesoPorCosecha" />
            </div>
            <div class="mb-2">
                <BaseLabel for="valorPorTonelada">Valor por Tonelada (USD$)</BaseLabel>
                <BaseInput type="number" id="valorPorTonelada" v-model="valorPorTonelada" />
            </div>
            <button @click="preCalcular" class="bg-blue-500 text-white py-2 px-4 rounded">Pre-Calcular</button>
            <BaseButton @click="guardar" class="mt-10">Guardar</BaseButton>
        </form>
    </div>
    <div>
        <Notificacion v-if="showNotification" :type="notificationType" :message="notificationMessage" />
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import BaseH1 from '../components/BaseH1.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { subscribeToAuth } from "./../service/auth.js";
import { findAreaById, addNewDataArea } from "./../service/area.js";
import router from '../router/router.js';
import Notificacion from '../components/Notificacion.vue';

export default {
    name: 'areas',
    components: { BaseButton, BaseLabel, BaseInput, BaseH1, Notificacion },

    data() {

        return {
            user: {
                id: null,
                email: null,
            },
            idArea: null,
            nombreCosecha: null,
            pesoPorCosecha: null,
            valorPorTonelada: null,
            areaKilometros: 0,
            showNotification: false,
            notificationType: '',
            notificationMessage: '',
        }
    },

    mounted() {
        const areaId = this.$route.query.idArea;
        const akm = this.$route.query.areaKilometros;
        this.idArea = areaId;
        this.areaKilometros = akm;
        subscribeToAuth(user => this.user = { ...user });
        console.log(this.idArea)
        findAreaById(this.user.id, this.idArea, (area) => {
            if (area) {
                console.log("Area: ", area)
                this.nombreCosecha = area.nombreCosecha;
                this.pesoPorCosecha = area.pesoPorCosecha;
                this.valorPorTonelada = area.valorPorTonelada;
            }
        });
    },
    methods: {
        async guardar() {
            const data = {
                nombreCosecha: this.nombreCosecha,
                pesoPorCosecha: parseFloat(this.pesoPorCosecha),
                valorPorTonelada: parseFloat(this.valorPorTonelada),
            };

            await addNewDataArea(this.user.id, this.idArea, data);
            router.push('/user/areas');

        },

        preCalcular() {
            const area = parseFloat(this.areaKilometros);
            const peso = parseFloat(this.pesoPorCosecha);
            const valor = parseFloat(this.valorPorTonelada);

            if (isNaN(area) || isNaN(peso) || isNaN(valor) || !area || !peso || !valor) {
                this.showNotificationMessage('error', 'Asegúrate de ingresar valores válidos y no vacíos para área, peso y valor.');
            } else {
                this.resultado = ((area * peso) / 1000) * valor;
                this.showNotificationMessage('success', `Ganarías un aproximado de ${this.resultado.toFixed(2)} USD$`);
            }
        },
        showNotificationMessage(type, message) {
            this.showNotification = true;
            this.notificationType = type;
            this.notificationMessage = message;

            setTimeout(() => {
                this.hideNotification();
            }, 5000);
        },
        hideNotification() {
            this.showNotification = false;
            this.notificationType = '';
            this.notificationMessage = '';
        },
    },

}
</script>

<style ></style>