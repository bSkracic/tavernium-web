<template>
    <b-card>
        <div>
             <textarea name="" v-model="message" cols="30" rows="2" style="width: 100%;"></textarea>
        </div>
        <br>
        <div class="d-md-flex">
             <label style="padding: 5px">As </label>
             <b-form-select style="width: 50%" v-model="selectedName" :options="nameOptions"></b-form-select>
             <div style="padding-left: 15px;">
                <b-button class="btn btn-danger">Send</b-button>
             </div>
        </div>      
    </b-card>
</template>

<script>
export default {
    name: "MessageBoxSender",
    props: {
        roomID: String,
        nameOptions: Array
    },
    data() {
        return {
            selectedName: null
        }
    },
    created() {
        this.selectedName = this.nameOptions[0].value;
    }
}
</script>

<style scoped>

</style>