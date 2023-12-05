<template>
  <div id="app" class="h-screen w-screen bg-slate-400">
    <transition name="fade">
      <img v-if="showWelcomeImage" src="/imgs/iniLoad.png" alt="Imagen de bienvenida"
        class="w-screen h-screen object-cover" style="position: absolute; top: 0; left: 0;" />
    </transition>
    <div v-if="showWelcomeImage" class="h-full" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
      <img src="/imgs/load.gif" alt="Cargando..."
        style="position: absolute; top: 75%; left: 50%; transform: translate(-50%, -50%); width: 40%;" />
    </div>
    <div v-if="!showWelcomeImage" class="h-full"
      style="overflow-y: auto; background-image: url('/imgs/backMenu.png'); background-size: cover; background-position: center;">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { subscribeToAuth, logOut } from './service/auth.js';

export default {
  name: "App",
  data() {
    return {
      showWelcomeImage: true,
      showNavigation: true,
      user: {
        id: null,
        email: null,
        rol: null,
      },
    };
  },

  methods: {
    logOuting() {
      logOut();
      this.$router.push('/login');
    },
  },
  mounted() {
    subscribeToAuth(user => {
      this.user = { ...user };

      setTimeout(() => {
        this.showWelcomeImage = false;
      }, 3000);
    });
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
