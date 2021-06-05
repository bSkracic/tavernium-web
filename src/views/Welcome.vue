<template>
<div>
   <div id="nav">
              <img src="../assets/tavernium_icon.png" />
              <h1>Tavernium</h1>
    </div>
   <b-container>
    <b-row>
      <b-col lg="8" id="show-section">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="720"
          style="text-shadow: 1px 1px 2px #333; max-width:900px; max-height:600px !important;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            style="max-width:900px; max-height:600px !important;"
            caption="Play"
            text="Experience epic campaigns"
            img-src="https://media.comicbook.com/2018/03/dnd-monsters-1093421.jpeg"
          ></b-carousel-slide>
          <b-carousel-slide
            style="max-width:900px; max-height:600px !important;"
            caption="Make"
            text="Start your own campaigns as DM"
            img-src="https://static0.thegamerimages.com/wordpress/wp-content/uploads/2019/09/Dungeons-and-Dragons-DM-rules-header.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            style="max-width:900px; max-height:600px !important;"
            caption="Edit"
            text="Create your custom character sheets"
            img-src="https://i.stack.imgur.com/5ozy3.png"
          ></b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col lg="4" id="sign-section">
        <LoginForm />
      </b-col>
    </b-row>
  </b-container>
</div>
 
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
export default {
  name: 'Welcome',
  components: { LoginForm },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  created() {
    if(this.$cookies.get("USERNAME") && this.$cookies.get("USER_ID")) 
    {
      this.$userDetails.username = this.$cookies.get("USERNAME");
      this.$userDetails.userID = this.$cookies.get("USER_ID");
      this.$router.push('/homepage'); 
    }
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
b-carousel {
  min-height: 300px !important;
  max-height: 300px !important;
}
b-carousel-slide {
  max-height: 200px !important;
}
#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  font-family: fantasy;
}

#nav > img {
  max-height: 50px;
  max-width: 50px;
}
</style>
