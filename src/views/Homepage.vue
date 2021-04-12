<template>
  <div>
    <h2>Welcome back, {{ username }}!</h2>
    <main>
      <div>
        <b-tabs
          content-class="mt-3"
          align="center"
          active-nav-item-class="font-weight-bold text-danger"
        >
          <b-tab
            title="My Campaigns"
            active
            :title-link-class="'inactive-nav-title'"
          >
            <div
              v-for="campaign in userCampaigns"
              v-bind:key="campaign.id"
              style="float: left"
            >
              <CampaignCard :campaign="campaign" />
            </div>
          </b-tab>
          <b-tab
            title="Other Campaigns"
            :title-link-class="'inactive-nav-title'"
          >
            <div
              v-for="campaign in otherCampaigns"
              v-bind:key="campaign.id"
              style="float: left"
            >
              <CampaignCard :campaign="campaign" />
            </div>
          </b-tab>
          <b-tab
            title="Character Sheets"
            :title-link-class="'inactive-nav-title'"
          >
            <div
              v-for="sheet in sheets"
              v-bind:key="sheet.id"
              style="float: left"
            >
              <CharacterSheetCard :sheet="sheet" style="padding: 5px" />
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </main>
  </div>
</template> 

<script>
import CampaignCard from "../components/CampaignCard.vue";
import CharacterSheetCard from "../components/CharacterSheetCard.vue";
export default {
  components: { CampaignCard, CharacterSheetCard },
  name: "Homepage",
  data() {
    return {
      username: "{username}",
      userCampaigns: [
        {
          id: "unique-string",
          owner: null,
          image: "https://cdn.wallpapersafari.com/44/99/ADobB6.jpg",
          title: "Epic campaign",
          thematics: "epicness",
          active: false,
        },
        {
          id: "unique-string",
          image: "https://cdn.wallpapersafari.com/44/99/ADobB6.jpg",
          title: "Epic campaign",
          thematics: "epicness",
          active: false,
        },
      ],
      otherCampaigns: [
        {
          id: "unique-string1",
          owner: "#Nigga42069",
          image: "https://cdn.wallpapersafari.com/44/99/ADobB6.jpg",
          title: "Epic campaign",
          thematics: "epicness",
          active: false,
        },
      ],
      sheets: [
        {
          id: "RANDOM_RANDOM_RANDOM",
          name: "Lex",
          level: 5,
          image: null,
          class: "Druid",
          race: "High-elf",
        },
        {
          id: "1RANDOM_RANDOM_RANDOM",
          name: "Halos",
          level: 15,
          image:
            "https://i.pinimg.com/736x/29/d9/d3/29d9d3d4e3bfea38d14c2dde7cba0e4f.jpg",
          class: "Monk",
          race: "Dragonborn",
        },
      ],
    };
  },
  mounted() {
    // Check if JWT token stored expired, if yes then redirect to welcome, else load this
  },
};
</script>

<style>
.inactive-nav-title {
  color: black !important;
}
</style>

<style scoped>
nav > img {
  max-height: 50px;
  max-width: 50px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
