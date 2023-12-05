<template>
    <div>
        <BaseH1 class="text-center mb-0 text-3xl pt-2">WIKI PLAGAS</BaseH1>
        <router-link to="/wiki_home" class="absolute top-6 left-2 scale-75">
            <button class="p-0 m-0 flex items-center justify-center">
                <img class="scale-75 p-0" src="/imgs/back.png" alt="back" />
            </button>
        </router-link>     
        <div class="my-10 mx-8">
            <BaseLabel>Buscar plaga por nombre:</BaseLabel>
            <BaseInput class="mb-4" v-model="searchTerm" placeholder="Buscar plaga..." />
        </div>

        <div v-if="filteredPlagues.length" class="grid gap-4 md:grid-cols-3 lg:grid-cols-3 mx-8">
            <div v-for="plague in filteredPlagues" :key="plague.id" class="bg-white p-4 rounded shadow-md">
                <h2 class="text-xl font-bold mb-2">{{ plague.nombre }}</h2>
                <img :src="'/imgs/plagas/' + plague.imagen" alt="icono de plaga" class="m-10 mx-auto w-1/4">
                <p class="my-3"><strong>Nombre Científico:</strong> {{ plague.nombre_cientifico }}</p>
                <p class="my-3"><strong>Solución:</strong> {{ plague.solucion }}</p>
            </div>
        </div>

        <div v-else>
            <p>Cargando datos...</p>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import BaseH1 from '../components/BaseH1.vue';
import BaseInput from '../components/BaseInput.vue';
import { subscribeToAuth } from './../service/auth.js';
import BaseLabel from '../components/BaseLabel.vue';

export default {
    name: 'wiki_plagues',
    components: { BaseH1, BaseInput, BaseLabel },

    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            plagues: [],
            searchTerm: '',
        };
    },

    mounted() {
        subscribeToAuth((user) => {
            this.user = { ...user };
            this.fetchPlagues();
        });
    },

    computed: {        
        filteredPlagues() {
            return this.plagues.filter((plague) =>
                plague.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
    },

    methods: {
        fetchPlagues() {
            axios
                .get('http://localhost:2023/plagues')
                .then((response) => {
                    this.plagues = response.data;
                })
                .catch((error) => {
                    console.error('Error al cargar las plagas:', error);
                });
        },
    },
};
</script>
  
<style></style>
  