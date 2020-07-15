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
                <th>Editar</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in productJuguetes" :key="index">
                <th>{{item.codigo}}</th>
                <td>{{item.nombre}}</td>
                <td>{{item.stock}}</td>
                <td>{{item.precio}}</td>
                <td><button class="btn btn-info" @click="editarProducto(item.idDoc)">Editar</button></td>
                <td><button class="btn btn-danger" @click="eliminarProducto(item.idDoc)">Eliminar</button></td>
            </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: 'Lista',
    computed: {
        productJuguetes() {
           return this.$store.getters.mostrandoJuguetes;
        }
    },
    methods: {
        editarProducto(id) {
            console.log(id);
            this.$store.dispatch('pasandoIdProducto', id);
            // Redirigiendo a la vista de edición
            this.$router.push('/edicion');
        }
    }
}
</script>

<style>

</style>