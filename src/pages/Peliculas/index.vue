<template>
  <div class="p-grid">
    <div class="card p-ml-2" v-for="movie in movies" :key="movie._id">
      <p>Nombre: {{movie.name}}</p>
      <p>Director: {{movie.director}}</p>
      <p>Clasificación:</p>
      <p v-for="clasification in movie.clasification" :key="clasification._id">
          {{clasification.name}}
      </p>
      <Button label="Editar" icon="pi pi-pencil" @click="openModal(movie)" />
      <Button class="p-ml-2" label="Borrar" icon="pi pi-minus" @click="borrarPelicula(movie)" />
    </div>
    <Dialog header="Editar Pelicula" v-model:visible="displayModal" :style="{width: '50vw'}" :modal="true">
    <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12 p-md-6">
            <InputText type="text" v-model="selectedMovie.name" />
        </div>
        <div class="p-field p-col-12 p-md-6">
            <InputText type="text" v-model="selectedMovie.director" />
        </div>
        <div class="p-field p-col-12 p-md-6">
            <MultiSelect v-model="selectedMovie.clasification" :options="clasifications" optionLabel="name" placeholder="Seleccionar Clasificaciones" />
        </div>
    </div>
    <template #footer>
        <Button label="Cerrar" icon="pi pi-times" @click="displayModal = false" class="p-button-text"/>
        <Button label="Guardar" icon="pi pi-check" @click="actualizarPelicula" autofocus />
    </template>
</Dialog>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    data(){
        return{
            movies: [],
            loading: false,
            displayModal: false,
            clasifications: [],
            selectedMovie: {},
        }
    },
    mounted(){
        this.obtenerPeliculas();
        this.obtenerClasificaciones();
    },
    methods:{
        actualizarPelicula(){
            Axios.put(`http://localhost:8080/movie/${this.selectedMovie._id}`,{
                name: this.selectedMovie.name,
                director: this.selectedMovie.director,
                clasification: this.selectedMovie.clasification,
            })
            .then(resp=>{
                this.$toast.add({severity:'success', summary: 'Actualizado correctamente', detail:resp.data.message, life: 3000});
                this.displayModal = false;
                this.obtenerPeliculas();
            })
            .catch(err=>{
                console.log(err);
                this.$toast.add({severity:'error', summary: 'Actualizado correctamente', detail:err.response.data.message, life: 3000});
            })
        },
        borrarPelicula(movie){
            Axios.delete(`http://localhost:8080/movie/${movie._id}`)
            .then(resp=>{
                this.$toast.add({severity:'success', summary: 'Pelicula borrada correctamente', detail:resp.data.message, life: 3000});
                this.obtenerPeliculas();
            })
            .catch(err=>{
                console.log(err);
                this.$toast.add({severity:'error', summary: 'Ocurrio un error', detail:err.response.data.message, life: 3000});
            })
        },
        obtenerPeliculas(){
            Axios.get('http://localhost:8080/movie/')
            .then(resp=>{
                this.movies = resp.data.data
            })
            .catch(err=>{
                console.log(err);
            })
        },
        obtenerClasificaciones(){
            Axios.get('http://localhost:8080/clasification/')
            .then(resp=>{
                this.clasifications = resp.data.data
            })
            .catch(err=>{
                console.log(err);
            })
        },
        openModal(movie){
            Object.assign(this.selectedMovie, movie);
            this.displayModal = true;
        }
    }
}
</script>

<style>

</style>