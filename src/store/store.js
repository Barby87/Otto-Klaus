import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uidUser: '',
    // Variable que va a cargar la informacion que se traiga de la db
    juguetes: [],
    idProducto: ''
  },

  getters: {
    mostrandoJuguetes(state) {
      return state.juguetes;
    },
    
    envioIdProducto(state) {
      return state.idProducto;
    }
  },
  
  mutations: {
    agregandoId(state, idRecibido) {
      // La mutación cambia el valor del estado
      state.uidUser = idRecibido;
    },

    //LEER
    traerDB(state) {
      // Traer la informacion desde la db
      db.collection("productos").onSnapshot(info => {
        let aux = [];
        console.log('Info', info);
        // Iterando cada documento de la colección
        info.forEach(element => {
          aux.push({
            // Con el .data() me traigo el valor del campo del documento
            codigo: element.data().codigo,
            nombre: element.data().nombre,
            stock: element.data().stock,
            precio: element.data().precio,
            // id de cada documento, sin el .data()
            idDoc: element.uid
          });
        });
        state.juguetes = aux;
      });
    },

    //EDITAR
    guardandoIdProducto(state, id) {
      state.idProducto = id;
    }
  },
  
  actions: {
    idUserLog(context, idUsuarioRecibido) {
      context.commit('agregandoId', idUsuarioRecibido);
    },

    // LEER
    activandoMutacionDB(context) {
      context.commit('traerDB');
    },

    //EDITAR
    pasandoIdProducto(context, id) {
      context.commit('guardandoIdProducto', id);
    }
  },
  
  modules: {
  }
});
