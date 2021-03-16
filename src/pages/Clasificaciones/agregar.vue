<template>
    <div class="p-fluid p-formgrid p-grid card">
        <div class="p-field p-col-12 p-md-6">
            Nombre
            <InputText type="text" v-model="movie.name" />
        </div>
        <Button label="Guardar" icon="pi pi-check" @click="guardar" autofocus />
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    data(){
        return{
            clasification:{
                name: "",
            },
        }
    },
    methods:{
        guardar(){
            Axios.post(`http://localhost:8080/clasification/`,{
                name: this.clasification.name,
            })
            .then(resp=>{
                this.$toast.add({severity:'success', summary: 'Actualizado correctamente', detail:resp.data.message, life: 3000});
                this.$router.push({name: "clasificacion.index"})
            })
            .catch(err=>{
                console.log(err);
                this.$toast.add({severity:'error', summary: 'Error', detail:'Todos los campos son requeridos y la clasificaion no debe existir previamente', life: 3000});
            })
        }
    }
}
</script>

<style>

</style>