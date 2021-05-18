<template>
  <!-- "https://media.wizards.com/2015/images/dnd/resources/Sword-Coast-Map_LowRes.jpg" -->
  <main class="d-flex flex-lg-row">
    <div id="image-container" class="flex-grow-2">
      <img
        src="https://i.redd.it/rd6bdlvbpw231.png"
        style="max-height: 100vh"
      />
    </div>
    <div id="options-container" class="flex-grow-1" style="max-height: 100vh">
      <b-tabs
        content-class="mt-3"
        active-nav-item-class="font-weight-bold text-danger"
        style="max-height: 100vh; min-width: 20vw;"
      >
        <b-tab
          title="Chat"
          :title-link-class="'inactive-nav-title'"
        >
          <div
            id="messageContainer"
            style="
              overflow-y: scroll;
              display: block;
              max-height: 70vh;
              position: relative;
              bottom: 0px;
            "
          >
            <div v-for="message in messages" :key="message.id" >
              <MessageBox :message="message" />
            </div>  
          </div>
          <div class="p-2">
            <MessageBoxSender
              :roomID="roomID"
              :nameOptions="options"
              :socket="socket"
            />
          </div>
        </b-tab>
        <b-tab
          v-if="isDM"
          title="DM Board"
          :title-link-class="'inactive-nav-title'"
        >
          <div class="accordion" role="tablist">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-1 variant="danger"
                  >Images</b-button
                >
              </b-card-header>
              <b-collapse
                id="accordion-1"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <div>
                    <b-link >Image1_Image2</b-link>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-2 variant="danger"
                  >Character Sheets</b-button
                >
              </b-card-header>
              <b-collapse
                id="accordion-2"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>xDDDD</b-card-text>
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
      socket: io("localhost:1337")
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
    this.roomID = this.$route.params.roomID !== undefined ? this.$route.params.roomID : parseInt(this.$cookies.get("ROOM_ID"));
    this.isDM = this.$route.params.isUserDM;
    this.recieveMessages();
    this.initializeSockets();
  },
  mounted() {
    // does not work
    const container = this.$el.querySelector("#messageContainer");
    container.scrollTop = container.scrollHeight; 
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
        // Does not work
        const container = this.$el.querySelector("#messageContainer");
        container.scrollTop = container.scrollHeight;
      });
    },
    recieveMessages() {
      rest.get(`/messages/room/${this.roomID}`)
      .then(r => {
        this.messages = r.data;
      })
      .catch(e => {
        console.log(e);
      });
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
