<template>
  <main class="d-flex flex-lg-row" style="padding: 2rem 5rem 2rem 5rem">
    <div id="options-container" class="flex-grow-1" style="max-height: 100vh;">
      <b-tabs
        content-class="mt-3"
        active-nav-item-class="font-weight-bold text-danger"
        style="max-height: 80vh; min-width: 20vw;"
      >
        <b-tab
          title="Chat"
          :title-link-class="'inactive-nav-title'"
        >
          <div class="d-md-flex" style="flex-direction: column;">
            <div
            id="messageContainer"
            style="
              overflow-y: scroll;
              display: block;
              max-height: 77vh;
              background-color: #DDD1C7;
            "
          >
            <div v-for="message in messages" :key="message.id">
              <MessageBox :message="message" />
            </div>  
          </div>
          <div style="justify-self: flex-end;;">
            <MessageBoxSender
              :roomID="roomID"
              :nameOptions="options"
              :socket="socket"
            />
          </div>
          </div>
        </b-tab>
        <b-tab
          v-if="isDM === true"
          title="DM Board"
          :title-link-class="'inactive-nav-title'"
        >
          <div class="accordion" role="tablist">
          

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-2 style="background-color: #4B4A67;"
                  >Character Sheets</b-button
                >
              </b-card-header>
              <b-collapse
                id="accordion-2"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <div v-for="sheet in playerSheets" :key="sheet.id">
                    <label>{{sheet.name}}</label>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </main>
</template>

<script>
import MessageBoxSender from "../components/MessageBoxSender.vue";
import MessageBox from "../components/MessageBox";
import io from "socket.io-client";
import rest from '../axios/rest'

export default {
  components: { MessageBoxSender, MessageBox },
  name: "Room",
  data() {
    return {
      roomID: 0,
      isDM: false,
      messages: [],
      options: [],
      playerSheets: [],
      socket: io("localhost:8000")
    };
  },
  created() {
    // Remove logo header
    this.$emit("roomOpened", false);
    // Prepare username options
    this.options.push({
      value: this.$cookies.get("USERNAME"),
      text: this.$cookies.get("USERNAME"),
    });
    
    this.roomID = parseInt(this.$cookies.get("ROOM_ID"));
    this.isDM = JSON.parse(this.$cookies.get("IS_DM").toLowerCase());
    console.log(this.$cookies.get("IS_DM"))
    
    if(this.isDM) {
      this.recieveSheets();
    }

    this.recieveMessages();
    this.initializeSockets();
  },
  mounted() {
    // does not work
    const container = this.$el.querySelector("#messageContainer");
    container.scrollTop = container.scrollHeight  - 20; 
  },
  beforeDestroy() {
    this.socket.disconnect();
    this.$emit("roomOpened", true);
  },
  methods: {
    initializeSockets() {
      // invoke chathub method for established connection
      this.socket.emit("JOIN_ROOM", { room_id: this.roomID });

      this.socket.on("MESSAGE", (data) => {
        this.messages.push(data);
        this.scrollToBottom();
      });
    },
    recieveSheets() {
      rest.get(`/campaign/sheets/${this.roomID}`).then(res => {
        this.playerSheets = res.data;
      })
    },
    recieveMessages() {
      rest.get(`/messages/room/${this.roomID}`)
      .then(r => {
        this.messages = r.data;
        this.scrollToBottom();
      })
      .catch(e => {
        console.log(e);
      });
    },
    scrollToBottom() {
       const container = this.$el.querySelector("#messageContainer");
      container.scrollTop = container.scrollHeight;
    }
  },
};
</script>

<style>
.inactive-nav-title {
  color: black !important;
}
</style>

<style scoped>
main {
  height: 100vh;
  max-height: 100vh;
}
img {
  width: 100%;
  height: 100%;
}
div {
  height: 100%;
}
b-tab {
  max-height: 100vh;
}
</style>
