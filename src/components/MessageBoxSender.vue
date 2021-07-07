<template>
    <div class="d-md-flex" style="justify-content: center;">
        <div class="d-md-flex" style="width: 50%;  padding: 2rem;">
            <textarea name="" v-model="message" cols="30" rows="2" style="width: 80%;"></textarea>
            <div style="width: 50%;">
                <div style="width: 25%;">
                </div>
                <div style="width: 60%;">
                    <div class="d-md-flex" style="justify-content: space-around">
                        <label style="padding: 5px">As </label>
                        <b-form-select style="width: 90%" v-model="selectedName" :options="nameOptions"></b-form-select>
                    </div>
                    <b-button style="background-color: #4B4A67; width: 100%;" @click="sendMessage"><b-icon icon="play"></b-icon>Send</b-button>
                </div>
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