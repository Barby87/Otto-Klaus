<template>
  <div class="container">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="ingresar">
      <!-- Alert -->
      <div class="alert alert-danger" role="alert" v-if="error">{{error}}</div>

      <div class="alert alert-success" role="alert" v-if="userOk">{{userOk}}</div>

      <div class="form-group">
        <label for="exampleInputEmail1">Correo electrónico</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Contraseña</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Ingresar</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'Login',
  data() {
    return {
      password: '',
      email: '',
      error: '',
      userOk: ''
    }
  },

  methods: {
    ingresar() {
      if(!this.email && !this.password) {
        this.error = 'Debe ingresar los datos del usuario';
      } else if(this.password.length < 6) {
        this.error = 'La contraseña debe ser mayor a 6 dígitos';
      }else {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          this.userOk = 'Usuario correcto';
          setTimeout(() => {
            this.userOk = '';
            this.$router.push('/');
          }, 2000);

          this.password = '';
          this.email = '';
          this.error = '';
        }).catch((error) => {
          this.error = '';
          console.log(error);
          if(error.code == 'auth/user-not-found') {
            this.error = 'El usuario no existe en nuestra base de datos';
          } else if(error.code == 'auth/wrong-password') {
            this.error = 'La contraseña no es válida';
          } else {
            alert(error.message);
          }
        })
      }
    }
  }
}
</script>
