<template>
    <div>
        <BaseH1 class="text-center mb-0 text-3xl pt-2">WIKI PLANTAS</BaseH1>
        <router-link to="/wiki_home" class="absolute top-6 left-2 scale-75">
            <button class="p-0 m-0 flex items-center justify-center">
                <img class="scale-75 p-0" src="/imgs/back.png" alt="back">
            </button>
        </router-link>
        <div class="my-10 mx-8">
            <BaseLabel>Buscar planta por nombre:</BaseLabel>
            <BaseInput v-model="searchTerm" placeholder="Ingrese el nombre de la planta" />
        </div>
        <div v-if="filteredPlants.length" class="grid gap-4 md:grid-cols-3 lg:grid-cols-3 mx-8">
            <div v-for="plant in filteredPlants" :key="plant.id" class="bg-white p-4 rounded shadow-md">
                <h2 class="text-xl font-bold mb-2">{{ plant.nombre }}</h2>
                <img :src="'/imgs/plantas/' + plant.imagen" :alt="'Imagen de la planta ' + plant.nombre"
                    class="m-10 mx-auto w-1/4">
                <p class="my-3"><strong>Nombre Científico:</strong> {{ plant.nombre_cientifico }}</p>
                <p class="my-3"><strong>Estación:</strong> {{ plant.estacion }}</p>
                <p class="my-3"><strong>Cosecha aprox:</strong> {{ plant.kg_cosecha_km2 }} kg/km²</p>
                <p class="my-3"><strong>Tipo de luz:</strong> {{ plant.luz }}</p>
                <p class="my-3"><strong>Ph:</strong> {{ plant.ph }}</p>
                <p class="my-3"><strong>Tipo de planta:</strong> {{ plant.tipo }}</p>
                <p class="my-3"><strong>Tipo de terreno:</strong> {{ plant.tipo_terreno }}</p>
                <p class="my-3 leading-8">
                    <strong>Plagas: </strong>
                    <span v-for="plagueId in plant.plagas" :key="plagueId">
                        <router-link :to="{ name: 'plagueDetails', params: { idPlague: plagueId } }"
                            class="text-green-600 hover:underline" style="text-decoration: underline;">
                            {{ getPlagueName(plagueId) }}
                        </router-link>
                        <span v-if="plant.plagas.indexOf(plagueId) !== plant.plagas.length - 1">, </span>
                    </span>
                </p>
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
import BaseLabel from '../components/BaseLabel.vue';
import { subscribeToAuth } from './../service/auth.js';

export default {
    name: 'wiki_plants',
    components: { BaseLabel, BaseInput, BaseH1 },

    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            plants: [],
            plagues: [],
            searchTerm: '', // Nuevo dato para almacenar el término de búsqueda
        };
    },

    async mounted() {
        await subscribeToAuth(async (user) => {
            this.user = { ...user };
            await this.fetchPlants();
            await this.fetchPlagues();
        });
    },

    computed: {
        filteredPlants() {
            const normalizedSearchTerm = this.searchTerm.toLowerCase().trim();
            return this.plants.filter(plant =>
                plant.nombre.toLowerCase().includes(normalizedSearchTerm)
            );
        },
    },

    methods: {
        async fetchPlants() {
            try {
                const response = await axios.get('http://localhost:2023/plants');
                this.plants = response.data;
            } catch (error) {
                console.error('Error al cargar las plantas:', error);
            }
        },

        async fetchPlagues() {
            try {
                const response = await axios.get('http://localhost:2023/plagues');
                this.plagues = response.data;
            } catch (error) {
                console.error('Error al cargar las plagas:', error);
            }
        },

        getPlagueName(plagueId) {
            const foundPlague = this.plagues.find(plague => String(plague.id) === String(plagueId));
            return foundPlague ? foundPlague.nombre : 'Plaga no encontrada';
        },
    },
};
</script>
  
<style></style>
  