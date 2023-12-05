<template>
    <BaseH1 class="hidden">Mapa</BaseH1>
    <div style="max-height: 100vh; overflow-y: auto;">
        <div id="mapContainer" class="h-screen relative">
            <div id="map" class="w-full h-full"></div>
            <router-link to="/home" class="absolute top-14 left-2 scale-75">
                <button class="p-0 m-0 flex items-center justify-center">
                    <img class="scale-75 p-0" src="/imgs/back.png" alt="back">
                </button>
            </router-link>
            <div id="areaKilometros"
                class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 rounded-xl p-2 z-10 text-sm opacity-90">
                <div>
                    <p>{{ areaText }}</p>
                </div>
            </div>
            <div id="buttonContainer" class="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
                <button @click="handleSubmit()"
                    class="bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md border border-amber-800">
                    Finalizar
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { CreateArea } from "../service/area.js";
import { subscribeToAuth } from "./../service/auth.js";
import googleMapsLoader from "../service/google-maps-config.js";
import BaseH1 from "../components/BaseH1.vue";
export default {
    name: 'mapa',
    components: { BaseH1 },

    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            map: null,
            polygonCoords: [],
            areaKilometros: 0,
            unsuscribe: () => { },
        };
    },
    async mounted() {
        try {
            await googleMapsLoader.load();
            this.initMap();
        } catch (error) {
            console.error("Error al cargar la API de Google Maps", error);
        }
    },
    computed: {
        areaText() {
            if (this.areaKilometros >= 0.99) {
                return `Área en km²: ${this.areaKilometros.toFixed(2)} km²`;
            } else {
                const areaMetrosCuadrados = this.areaKilometros * 1000000;
                return `Área en m²: ${areaMetrosCuadrados.toFixed(2)} m²`;
            }
        },
    },
    methods: {
        calcularArea(coords) {
            const area = google.maps.geometry.spherical.computeArea(coords);
            return Math.abs(area);
        },
        initMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    const map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat: userLat, lng: userLng },
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                    });
                    this.polygonCoords = [
                        { lat: userLat - 0.005, lng: userLng - 0.005 },
                        { lat: userLat - 0.005, lng: userLng + 0.005 },
                        { lat: userLat + 0.005, lng: userLng + 0.005 },
                        { lat: userLat + 0.005, lng: userLng - 0.005 },
                    ];
                    this.polygon = new google.maps.Polygon({
                        paths: [
                            { lat: userLat - 0.005, lng: userLng - 0.005 },
                            { lat: userLat - 0.005, lng: userLng + 0.005 },
                            { lat: userLat + 0.005, lng: userLng + 0.005 },
                            { lat: userLat + 0.005, lng: userLng - 0.005 },
                        ],
                        editable: true,
                        draggable: true,
                        fillColor: 'yellow',
                        strokeColor: 'darkorange',
                        strokeWeight: 1,
                    });

                    this.polygon.setMap(map);
                    const area = this.calcularArea(this.polygonCoords);
                    this.areaKilometros = area / 1000000;
                    google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
                        google.maps.event.addListener(this.polygon.getPath(), 'set_at', this.updateArea);
                        google.maps.event.addListener(this.polygon.getPath(), 'insert_at', this.updateArea);
                    });
                });
            } else {
                console.log('La geolocalización no es compatible con tu navegador.');
            }
        },
        updateArea() {
            const polygon = this.polygon.getPath().getArray();
            const area = this.calcularArea(polygon);
            const areaKilometros = area / 1000000;
            this.polygonCoords = polygon;
            this.areaKilometros = areaKilometros;
            console.log(`Datos del Polígono: ${JSON.stringify(this.polygonCoords)}`);
            console.log(`Datos del Área Km: ${JSON.stringify(this.areaKilometros)}`);
        },
        async handleSubmit() {
            try {
                this.unsuscribe = subscribeToAuth(newUser => this.user = { ...newUser });
                await CreateArea(this.user.id, { poligons: JSON.stringify(this.polygonCoords), areaKilometros: this.areaKilometros, idUser: this.user.id });
                this.$router.push('/area');
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
  
<style>
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>



  