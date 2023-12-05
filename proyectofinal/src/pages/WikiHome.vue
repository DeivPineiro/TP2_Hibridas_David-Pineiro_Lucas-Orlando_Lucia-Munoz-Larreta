<template>
    <div class="h-screen">
        <BaseH1 class="text-center mb-0 text-3xl pt-2 hidden">PlatoWiki</BaseH1>
        <router-link to="/home" class="absolute top-6 left-2 scale-75">
            <button class="p-0 m-0 flex items-center justify-center">
                <img class="scale-75 p-0" src="/imgs/back.png" alt="back">
            </button>
        </router-link>
        <div class="pt-20 flex items-center justify-center ">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-24">
                <div>
                    <p class="text-center pb-1">Plantas</p>
                    <div class="bg-gray-200 p-4 flex items-center justify-center rounded-full w-32 h-23 shadow-2xl">
                        <router-link to="/wiki_home/wiki_plants">
                            <img src="/imgs/wikiplant.png" alt="Wiki sobre plantas" class="mx-auto scale-75" />
                        </router-link>
                    </div>
                </div>
                <div>
                    <p class="text-center pb-1">Plagas</p>
                    <div class="bg-gray-200 p-6 flex items-center justify-center rounded-full w-32 h-23 shadow-2xl">
                        <router-link to="/wiki_home/wiki_plagues">
                            <img src="/imgs/plagues.png" alt="Wiki sobre plagas" class="mx-auto" />
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
    name: 'wikiHome',
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
        }
    },
    mounted() {
        subscribeToAuth(user => {
            this.user = { ...user }
        });
    },
}
</script>
<style ></style>