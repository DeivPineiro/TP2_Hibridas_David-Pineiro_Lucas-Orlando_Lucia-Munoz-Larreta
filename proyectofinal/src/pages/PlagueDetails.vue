<template>
    <BaseH1 class="text-center mb-0 text-3xl pt-2">Detalle {{ plagueDetails ? plagueDetails.nombre : '' }}</BaseH1>
    <div class="mx-auto" style="max-width: 640px;">
        <router-link to="/wiki_home/wiki_plants" class="absolute top-10 left-2 scale-75">
            <button class="p-0 m-0 flex items-center justify-center">
                <img class="scale-75 p-0" src="/imgs/back.png" alt="back">
            </button>
        </router-link>
        <div v-if="plagueDetails" class="bg-white p-4 rounded shadow-md mt-10 mx-8">
            <img :src="'/imgs/plagas/' + plagueDetails.imagen" alt="icono de plaga" class="m-10 mx-auto w-1/2">
            <p class="my-3"><strong>Nombre Científico:</strong> {{ plagueDetails.nombre_cientifico }}</p>
            <p><strong>Solución:</strong> {{ plagueDetails.solucion }}</p>
        </div>
        <div v-else>
            <p>Cargando detalles de la plaga...</p>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { subscribeToAuth } from './../service/auth.js';
import BaseH1 from '../components/BaseH1.vue';
export default {
    name: 'plagueDetails',
    components: { BaseH1 },

    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            plagueDetails: null,
        };
    },
    mounted() {
        subscribeToAuth((user) => {
            this.user = { ...user };
            this.fetchPlagueDetails();
        });
    },
    methods: {
        fetchPlagueDetails() {
            const idPlague = this.$route.params.idPlague;
            axios
                .get(`http://localhost:2023/plagues/${idPlague}`)
                .then((response) => {
                    this.plagueDetails = response.data;
                })
                .catch((error) => {
                    console.error('Error al cargar los detalles de la plaga:', error);
                });
        },
    },
};
</script>
  
<style></style>
  
  