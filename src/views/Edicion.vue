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
import Swal from 'sweetalert2';
export default {
    name: 'Edicion',
    data() {
        return {
            jugueteIdEditar: ''
        }
    },

    // Los watch son poripiedades asíncronas que permiten detectar el estado o si hay cambios en una variable cualquiera que esté dentro del objeto data, reemplaza al async/await
    watch: {
        jugueteIdEditar() {
            const { value: formValues } = Swal.fire({
                // Con sweet alert2 se debe modificar los inputs a sintaxis de ES6 para poder referenciar la variable que está en la data de la vista.
                title: 'Editando producto',
                html:
                    `Código: <input id="swal-input1" value="${this.jugueteIdEditar.codigo}" class="swal2-input">` +
                    `Nombre: <input id="swal-input2" value="${this.jugueteIdEditar.nombre}" class="swal2-input">` +
                    `Stock: <input id="swal-input3" value="${this.jugueteIdEditar.stock}" class="swal2-input">` +
                    `Precio: <input id="swal-input4" value="${this.jugueteIdEditar.precio}" class="swal2-input">`,

                focusConfirm: false,
                preConfirm: () => {
                    return [
                        this.jugueteIdEditar.codigo = document.getElementById('swal-input1').value,
                        this.jugueteIdEditar.nombre = document.getElementById('swal-input2').value,
                        this.jugueteIdEditar.stock = document.getElementById('swal-input3').value,
                        this.jugueteIdEditar.precio = document.getElementById('swal-input4').value
                    ]
                }
            // EDITAR producto
            }).then(() => {
                console.log("Promesa");
                db.collection("productos").doc(this.$store.getters.envioIdProducto).update({
                    // Pasando los datos editados a la base de datos
                    codigo: this.jugueteIdEditar.codigo,
                    nombre: this.jugueteIdEditar.nombre,
                    stock: this.jugueteIdEditar.stock,
                    precio: this.jugueteIdEditar.precio
                }).then(() => {
                    console.log("Actualizado");
                })
            })

            if(formValues) {  
                Swal.fire(JSON.stringify(formValues))
            }  
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