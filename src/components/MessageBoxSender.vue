<template>
    <div>
        <div>
             <textarea name="" v-model="message" cols="30" rows="2" style="width: 100%;"></textarea>
        </div>
        <br>
        <div class="d-md-flex">
             <label style="padding: 5px">As </label>
             <b-form-select style="width: 50%" v-model="selectedName" :options="nameOptions"></b-form-select>
             <div style="padding-left: 15px;">
                <b-button class="btn btn-danger" @click="sendMessage">Send</b-button>
             </div>
        </div>      
    </div>
</template>

<script>

export default {
    name: "MessageBoxSender",
    props: {
        roomID: Number,
        nameOptions: Array,
        socket: Object
    },
    data() {
        return {
            selectedName: null,
            message: "",
        }
    },
    created() {
        this.selectedName = this.nameOptions[0].value;
    },
    methods: {
        sendMessage() {
            this.socket.emit("MESSAGE", {sender: this.selectedName, campaign_id: this.roomID, content: this.message});
            this.message = "";
        }
    }
}
</script>