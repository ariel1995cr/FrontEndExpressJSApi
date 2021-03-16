<template>
  <div class="p-grid">
    <div class="card p-ml-2" v-for="clasification in clasifications" :key="clasification._id">
      <p>Nombre: {{clasification.name}}</p>
      <Button label="Editar" icon="pi pi-pencil" @click="openModal(clasification)" />
      <Button class="p-ml-2" label="Borrar" icon="pi pi-minus" @click="borrar(clasification)" />
    </div>
    <Dialog header="Editar Clasificacion" v-model:visible="displayModal" :style="{width: '50vw'}" :modal="true">
    <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12 p-md-6">
            <InputText type="text" v-model="selectedClasificacion.name" />
        </div>
    </div>
    <template #footer>
        <Button label="Cerrar" icon="pi pi-times" @click="displayModal = false" class="p-button-text"/>
        <Button label="Guardar" icon="pi pi-check" @click="actualizar" autofocus />
    </template>
</Dialog>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    data(){
        return{
            clasifications: [],
            loading: false,
            displayModal: false,
            selectedClasificacion: {},
        }
    },
    mounted(){
        this.obtenerClasificaciones();
    },
    methods:{
        actualizar(){
            if(this.selectedClasificacion.name == ''){
                this.$toast.add({severity:'error', summary: 'Ha ocurrido un error', detail:'Este campo no puede estar vacio.', life: 3000});
            }
            Axios.put(`http://localhost:8080/movie/${this.selectedClasificacion._id}`,{
                name: this.selectedClasificacion.name,
            })
            .then(resp=>{
                this.$toast.add({severity:'success', summary: 'Actualizado correctamente', detail:resp.data.message, life: 3000});
                this.displayModal = false;
                this.obtenerClasificaciones();
            })
            .catch(err=>{
                console.log(err);
                this.$toast.add({severity:'error', summary: 'Ha ocurrido un error', detail:err.response.data.message, life: 3000});
            })
        },
        borrar(clasificacion){
            Axios.delete(`http://localhost:8080/movie/${clasificacion._id}`)
            .then(resp=>{
                this.$toast.add({severity:'success', summary: 'Clasificacion borrada correctamente', detail:resp.data.message, life: 3000});
                this.obtenerClasificaciones();
            })
            .catch(err=>{
                console.log(err);
                this.$toast.add({severity:'error', summary: 'Ocurrio un error', detail:err.response.data.message, life: 3000});
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
        openModal(clasificacion){
            Object.assign(this.selectedClasificacion, clasificacion);
            this.displayModal = true;
        }
    }
}
</script>

<style>

</style>