<template>
  <div class="container">
      <h1>Listado de juguetes</h1>
      <table class="table table-hover">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>{{jugueteIdEditar.codigo}}</th>
                <td>{{jugueteIdEditar.nombre}}</td>
                <td>{{jugueteIdEditar.stock}}</td>
                <td>{{jugueteIdEditar.precio}}</td>
            </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { db } from '../main';
export default {
    name: 'Edicion',
    data() {
        return {
            jugueteIdEditar: ''
        }
    },

    created() {
        // Cargando información del producto
        db.collection("productos").doc(this.$store.getters.envioIdProducto).get().then(response => {
            console.log(response.data());
            // Poniendo en la variable local jugueteIdEditar el objeto que se obtiene como respuesta del getter 
            this.jugueteIdEditar = response.data();
        })
    }
}
</script>

<style>

</style>