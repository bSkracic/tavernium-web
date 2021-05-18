<template>
  <div>
    <b-row center>
      <b-col>
      </b-col><b-col>
      </b-col>
      <b-col>
        <AccountDetails />
      </b-col>
    </b-row>
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
              <CampaignCard :campaign="campaign" :isDM="true" />
            </div>
          <p v-if="!userCampaigns.length" style="text-align: center;">Wow, such empty.</p>
          </b-tab>
          <b-tab
            title="Other Campaigns"
            :title-link-class="'inactive-nav-title'"
          >
            <div
              v-for="campaign in joinedCampaigns"
              v-bind:key="campaign.id"
              style="float: left"
            >
              <CampaignCard :campaign="campaign" :isDM="false" :characterSheets="sheetOptions"/>
            </div>
          <p v-if="!joinedCampaigns.length" style="text-align: center;">Wow, such empty.</p>
          <b-button v-b-toggle.campaign-search-sidebar variant="outline-secondary">More campaigns</b-button>
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
    <b-sidebar id="campaign-search-sidebar" title="Find campaigns:" style="min-width: 30%; width: 40%; max-width: 50%;" shadow bg-variant="dark" text-variant="light">
      <div class="px-4 py-5">
        <b-form-input placeholder="search by name..." @input="searchCampaigns" v-model="searchTerm"></b-form-input>
      </div>
      <div style="color: black">
        <div v-for="campaign in searchedCampaigns" v-bind:key="campaign.id">
          <CampaignMini :campaign="campaign" />
        </div>
      </div>
    </b-sidebar>
    </main>
  </div>
</template> 

<script>
import CampaignMini from "../components/CampaignMini.vue"
import CampaignCard from "../components/CampaignCard.vue";
import CharacterSheetCard from "../components/CharacterSheetCard.vue";
import AccountDetails from "../components/AccountDetails.vue"
import rest from "../axios/rest";

export default {
  components: { CampaignCard, CharacterSheetCard, AccountDetails, CampaignMini},
  name: "Homepage",
  data() {
    return {
      searchTerm: "",
      searchedCampaigns: [],
      userCampaigns: [],
      joinedCampaigns: [],
      sheets: [],
      sheetOptions: [],
    };
  },
  mounted() {
    // Check if JWT is valid
    rest.restrictedRequest(this, "GET", "/check_valid", null, (res) => {
      if (res === null) {
        this.$router.push("/");
      }
    });
    this.retrieveCampaigns();
  },
  methods: {
    retrieveCampaigns() {
      rest.post('/campaign/user', {user_id: this.$cookies.get("USER_ID")}).then(res => this.userCampaigns = res.data).catch(e => console.log(e));
      rest.post('/campaign/joined', {user_id: this.$cookies.get("USER_ID")}).then(res => this.joinedCampaigns = res.data).catch(e => console.log(e));
    },
    searchCampaigns() {
      if(this.searchTerm.length > 2) {
        rest.get(`/campaign/search?term=${this.searchTerm}`).then(res => {this.searchedCampaigns = res.data; console.log(res.data);}).catch(e => console.log(e));
      }
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
