<template>
  <div>
    <!-- <h2>Welcome to the Room!</h2> -->
    <!-- <h2 style="text-align: center;">{{ room }}</h2>
    <div style="display: flex; justify-content: center">
      <input type="text" v-model="room" />
      <button v-on:click="joinRoom()">JOIN</button>
    </div>
    <br>
    <div style="background: lightgray; height: 500px; overflow: auto;">
      <div v-for="mess in messages" :key="mess.ID">
        <label>{{ mess.Username }} : {{ mess.Content }}</label>
        <br />
      </div>
    </div>
    <div>
      <input type="text" v-model="username" /> :
      <input type="text" v-model="message" style="width: 75%"/>
      <button v-on:click="sendMessage()" :disabled="!roomJoined" style="width: 5%">SEND</button>
    </div>
     -->
    <main class="d-lg-flex">
      <div id="image-container" style="flex: 3; ">
        <img src="https://media.wizards.com/2015/images/dnd/resources/Sword-Coast-Map_LowRes.jpg">
      </div>
      <div style="flex: 1;" hidden>Image options</div>
      <div id="message-container" style="flex: 1; background: lightgray;">
        <div>
          <div style="height: 100%">
            <MessageBox :message="messageTest" />    
          </div>
        </div>
        <MessageBoxSender :roomID="uniquestring" :nameOptions="options"/>
      </div>
      <!-- <b-container fluid="lg">
        <b-row align-v="stretch">
          <b-col lg="8" style="background: lightgray">One of three columns</b-col>
          <b-col >One of three columns</b-col>
          <b-col style="background: lightgray">One of three columns</b-col>
        </b-row>
      </b-container> -->
    </main>
  </div>
</template>

<script>
import MessageBoxSender from '../components/MessageBoxSender.vue';
import MessageBox from '../components/MessageBox'
export default {
  components: { MessageBoxSender, MessageBox},
  name: "Room",
  data() {
    return {
      id: 0,
      message: "",
      username: "User01",
      roomJoined: false,
      room: null,
      messages: [
        {
          ID: "0000-0000-0000-0000",
          SenderID: "0000-0000-0000-0000",
          GroupID: "0000-0000-0000-0000",
          Content: "Welcome to the chat!",
          Username: "Tavernium",
        },
      ],
      options: [
        { value: "User01", text: "User01" },
        { value: "a", text: "Nigga" }
      ],
      messageTest: {
        username: "Nigga",
        content: "Blaze it yeet!"
      }
    };
  },
  created() {
    this.$chathub.$on("message-sent", this.messageRecieved);
  },
  beforeDestroy() {
    this.$chathub.$off("message-sent", this.messageRecieved);
    if (this.room !== null) {
      this.$chathub.roomLeft(this.room);
    }
  },
  methods: {
    messageRecieved(chatMessage) {
      chatMessage = JSON.parse(chatMessage);
      this.messages.push(chatMessage);
      console.log(chatMessage);
    },
    sendMessage() {
      // const message = {
      //     ID: "0000-0000-0000-0000",
      //     SenderID: "0000-0000-0000-0000",
      //     GroupID: "0000-0000-0000-0000",
      //     Content: this.message,
      //     Username: 'Nigga'
      // }
      this.id++;
      const message = {
        ID: this.id.toString(),
        SenderID: "00",
        GroupID: this.room,
        Content: this.message,
        Username: this.username,
      };
      this.$chathub.messageSent(JSON.stringify(message));
    },
    joinRoom() {
      if (this.room !== null) {
        this.roomJoined = true;
        this.id++;
        this.messages.push({
          ID: this.id.toString(),
          SenderID: "tavernium-defaults",
          GroupID: this.room,
          Content: `Joined ${this.room}!`,
          Username: "Tavernium",
        });
        this.$chathub.roomJoined(this.room);
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
div {
  height: 100%;
}
</style>
