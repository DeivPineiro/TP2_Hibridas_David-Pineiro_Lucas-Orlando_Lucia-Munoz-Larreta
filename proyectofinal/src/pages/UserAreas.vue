<template>
    <div class="max-w-lg mx-auto py-8 px-4 relative">
        <BaseH1 class="text-center mb-0 text-3xl pt-2">TUS CULTIVOS</BaseH1>
        <router-link to="/home" class="absolute top-7 left-2 scale-75">
            <button class="p-0 m-0 flex items-center justify-center">
                <img class="scale-75 p-0" src="/imgs/back.png" alt="back">
            </button>
        </router-link>
        <img class=" scale-50 p-0 absolute top-5 right-2" src="/imgs/mockIcon.png" alt="back">

        <div class="grid grid-cols-1 gap-2">
            <div v-if="!areas || areas.length === 0" class="text-center font-bold text-gray-600 mt-4">
                <p>No tienes áreas cargadas.</p>
            </div>
            <div v-else>
                <div class="bg-white p-4 rounded shadow-md mb-4 " v-for="area in areas" :key="area.id">
                    <p class="text-center font-bold ">Nombre: <span class="font-normal">{{ area.nombreCosecha }}</span></p>
                    <p class="text-center font-bold ">Peso: <span class="font-normal">{{ area.pesoPorCosecha }}
                            kg/km²</span>
                    </p>
                    <p class="text-center font-bold">Precio ton/km²: <span class="font-normal">{{ area.valorPorTonelada }}
                            USD$
                            x ton/km²</span></p>
                    <p class="text-center font-bold">Área: <span class="font-normal">{{ area.areaKilometros.toFixed(3) }}
                            km²</span></p>
                    <p class="text-center font-bold text-green-700">Valor total: <span class="font-normal text-black">{{
                        (((area.areaKilometros * area.pesoPorCosecha) / 1000) * area.valorPorTonelada).toFixed(2) }}
                            USD$</span>
                    </p>

                    <div class="flex justify-between">
                        <div class="scale-75">
                            <button @click="goToHarvest(area.id, area.areaKilometros)"
                                class="bg-green-500 text-white font-semibold py-2 px-2 rounded-full shadow-2xl border border-green-800 max-w-xs">
                                <img src="/imgs/edit.png" alt="delete icon" class="scale-50">
                            </button>
                            <p class="text-center ">Editar</p>
                        </div>
                        <div class="scale-75">
                            <button @click="goToMap(area.poligons, area.id, area.areaKilometros)"
                                class=" bg-amber-500 text-white font-semibold py-2 px-2 rounded-full shadow-2xl border border-amber-800 max-w-xs">
                                <img src="/imgs/goMap.png" alt="delete icon" class="scale-50">
                            </button>
                            <p class="text-center ">Ver mapa</p>
                        </div>
                        <div class="scale-75">
                            <button @click="delArea(this.user.id, area.id)"
                                class=" bg-red-500 text-white font-semibold py-2 px-2 rounded-full shadow-2xl border border-red-800 max-w-xs">
                                <img src="/imgs/delete.png" alt="delete icon" class="scale-50">
                            </button>
                            <p class="text-center ">Eliminar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import BaseH1 from '../components/BaseH1.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { subscribeToAuth } from "./../service/auth.js";
import { findUserAreas, deleteArea } from "./../service/area.js";
export default {
    name: 'userAreas',
    components: { BaseButton, BaseLabel, BaseInput, BaseH1 },

    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            areas: null,
            areasUnsuscribe: () => { },
        }
    },
    mounted() {
        subscribeToAuth(user => this.user = { ...user });
        this.areasUnsuscribe = findUserAreas(this.user.id, (areas) => {
            this.areas = areas;
        });
    },
    methods: {

        goToMap(poligons, id, area) {
            this.$router.push({
                path: '/user/areas/irAMapa',
                query: {
                    id: id,
                    poligons: poligons
                },
            });
        },

        goToHarvest(idArea, areaKilometros) {
            this.$router.push({
                path: '/user/areas/editAreas',
                query: {
                    idArea: idArea,
                    areaKilometros: areaKilometros,
                },
            });
        },

        delArea(idUser, idArea) {
            const confirmDelete = window.confirm('¿Estás seguro de eliminar esta área?');
            if (confirmDelete) {
                console.log("idUser: ", idUser, "idArea: ", idArea)
                deleteArea(idUser, idArea);
                this.$router.push({ path: '/user/areas' });
            }
        }
    },
}
</script>

<style >
.static-map {
    width: 100%;
    height: auto;
}
</style>