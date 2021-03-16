<template>
    <div class="p-fluid p-formgrid p-grid card">
        <div class="p-field p-col-12 p-md-6">
            Nombre
            <InputText type="text" v-model="movie.name" />
        </div>
        <div class="p-field p-col-12 p-md-6">
            Director
            <InputText type="text" v-model="movie.director" />
        </div>
        <div class="p-field p-col-12 p-md-6">
            Clasificacion
            <MultiSelect v-model="movie.clasification" :options="clasifications" optionLabel="name" placeholder="Seleccionar Clasificaciones" />
        </div>
        <Button label="Guardar" icon="pi pi-check" @click="guardarPelicula" autofocus />
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    data(){
        return{
            movie:{
                name: "",
                director: "",
                clasification: [],
            },
            clasifications: [],
        }
    },
    mounted(){
        this.obtenerClasificaciones();
    },
    methods:{
        obtenerClasificaciones(){
            Axios.get('http://localhost:8080/clasification/')
            .then(resp=>{
                this.clasifications = resp.data.data
            })
            .catch(err=>{
                console.log(err);
            })
        },
        guardarPelicula(){
            Axios.post(`http://localhost:8080/movie/`,{
                name: this.movie.name,
                director: this.movie.director,
                clasification: this.movie.clasification,
            })
            .then(resp=>{
                this.$toast.add({severity:'success', summary: 'Actualizado correctamente', detail:resp.data.message, life: 3000});
                this.$router.push({name: "peliculas.index"})
            })
            .catch(err=>{
                console.log(err);
                this.$toast.add({severity:'error', summary: 'Error', detail:'Todos los campos son requeridos y la pelicula no debe existir previamente', life: 3000});
            })
        }
    }
}
</script>

<style>

</style>