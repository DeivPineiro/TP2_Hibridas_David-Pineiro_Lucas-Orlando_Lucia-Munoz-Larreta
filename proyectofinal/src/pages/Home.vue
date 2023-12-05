<template>
    <div class=" h-screen">
        <BaseH1 class="text-center text-3xl hidden">Menú</BaseH1>
        <button @click="toggleMenu" class="scale-50 block rounded-full absolute top-0 right-0 shadow-2xl bg-white p-5">
            <img src="/imgs/user.png" alt="configuración de usuario y deslogeo">
        </button>
        <div v-if="showMenu" class="absolute right-24 top-8 w-48 mt-0">
            <ul class="list-none bg-white shadow-2xl rounded-md">
                <li class="text-center px-4 mb-2 ">
                    <router-link to="/perfil" class="font-bold text-xs text-green-600 p-1">
                        {{ user.email }}
                    </router-link>
                </li>
                <li class="text-center px-4 ">
                    <form action="#" @submit.prevent="logOuting">
                        <button class="text-center font-bold text-xs text-red-600 p-1 " type="submit">Cerrar
                            sesión</button>
                    </form>
                </li>
            </ul>
        </div>
        <div class="pt-20 flex items-center justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                <div>
                    <p class="text-center pb-1">Crear área</p>
                    <div class="bg-gray-200 p-8 flex items-center justify-center rounded-full w-28 shadow-2xl">
                        <router-link to="/map">
                            <img src="/imgs/map.png" alt="menú mapa" class="mx-auto scale-110" />
                        </router-link>
                    </div>
                </div>
                <div>
                    <p class="text-center pb-1">PlantoWiki</p>
                    <div class="bg-gray-200 p-4 flex items-center justify-center rounded-full w-28 shadow-2xl">
                        <router-link to="/wiki_home">
                            <img src="/imgs/wiki.png" alt="menú wiki" class="mx-auto scale-75" />
                        </router-link>
                    </div>
                </div>
                <div>
                    <p class="text-center pb-1">Tus cultivos</p>
                    <div class="bg-gray-200 p-4 flex items-center justify-center rounded-full w-28 shadow-2xl">
                        <router-link to="/user/areas">
                            <img src="/imgs/calcs.png" alt="menú tus áreas" class="mx-auto scale-75" />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <footer class="fixed bottom-0 left-0 w-full bg-slate-200 border-t border-gray-200 shadow items-center">
            <div class="hidden sm:block ">
                <img class="bottom-0 scale-50 m-auto " src="/imgs/mock horizontal.png" alt="user icon">
                <p class="pb-2 text-xs md:text-sm text-gray-600 text-center pr-2 font-bold"> © PLANTOPIA 2023. Todos los
                    derechos reservados.
                </p>
            </div>
            <div class="sm:hidden md:hidden lg:hidden xl:hidden">
                <img class="absolute bottom-0 scale-50 mx-auto left-0 right-0" src="/imgs/logo.png" alt="user icon">
                <p class="pb-2 text-xs md:text-sm text-gray-600 text-right pr-2 font-bold"> © PLANTOPIA 2023<br> Todos los
                    derechos reservados.
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import BaseH1 from '../components/BaseH1.vue';
import { subscribeToAuth, logOut } from '../service/auth.js';
export default {
    name: 'home',
    components: { BaseH1 },

    data() {
        return {
            showMenu: false,
            user: {
                id: null,
                email: null,
                rol: null,
            }
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        logOuting() {
            logOut();
            this.$router.push('/login');
        },
    },
    mounted() {
        subscribeToAuth(user => {
            this.user = { ...user }
        });
    },
}
</script>
<style ></style>

<!-- Para dashboard tesis==> Chart.js -->