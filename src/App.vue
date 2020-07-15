<template>
  <div>
    <!-- <div class="bg-primary"> -->
    <Navegacion/>
    <router-view class="colorPrincipal"/>
  </div>
</template>

<script>
import Navegacion from './components/Navegacion.vue';
import firebase from 'firebase';
export default {
  name: 'App',
  components: {
    Navegacion
  },

  mounted() {
    // Cuando se monte la app se va a comprobar si es que existe usuario
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log(user);
        // Si hay usuario se activa la action y se le envia el uid del usuario
        this.$store.dispatch('idUserLog', user.uid)
      } else {
        console.log('El usuario cerró sesión');
        // Si no hay usuario, se le envia un dato vacío a la action
        this.$store.dispatch('idUserLog', '')
      }
    });

    this.$store.dispatch('activandoMutacionDB');
  }
}
</script>

<style lang="scss">
// Modificando variable de bootstrap
// $primary: #96e6e6;
// Creando variable propia
// $colorMio: #d8bef1;

// Importar módulo de sass de bootsrap para hacer cambios, siempre va al final del style y modifica las variables de bootsrtap de manera global
// @import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
